'use strict'

import * as child_process from 'node:child_process'
import * as process from 'node:process'
import * as path from 'node:path'
import * as fs from 'node:fs'

import * as dotenv from 'dotenv'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Resolve paths

const dir = {
    current: process.cwd(),
    root: process.cwd()
}

for (let limit = 0; limit < 6; limit++) {
    const checkPath = path.resolve(dir.root, '..')
    const gitPath = path.resolve(checkPath, '.git')
    const gitFound = fs.existsSync(gitPath)

    dir.root = checkPath
    if (gitFound) break
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Load .env files

let collectedEnv = {...process.env}

for (const dotenvDir of [dir.root, dir.current]) {
    const dotenvFile = path.resolve(dotenvDir, '.env')
    const dotenvResult = dotenv.config({path: dotenvFile})
    collectedEnv = {...collectedEnv, ...dotenvResult.parsed}
}

collectedEnv['TIMESTAMP'] = new Date().toString()

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Parse package.json

const pkgFile = path.resolve(dir.current, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgFile).toString())

for (const key of ['name', 'version', 'description', 'homepage', 'bugs', 'license', 'repository'])
    if (pkg[key])
        collectedEnv[`PKG_${key.toUpperCase()}`] = pkg[key]

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Parse arguments for Operation tools

const args = process.argv.slice(2)
const exec = {
    env: collectedEnv,
    command: args[0] ?? '',
    action: args[1] ?? '',
    args: args.slice(1),
}

if (exec.command === 'terraform' && exec.action === 'init')
    mapExtraArgs(/^TF_BACKEND_/i, '-backend-config={attribute}={value}')

if (exec.command === 'ansible-playbook')
    mapExtraArgs(/^ANSIBLE_HOSTS/i, '-i {value},')

if (exec.command === 'docker') {
    const lastArg = exec.args.pop() ?? ''
    if (exec.action === 'build') {
        mapExtraArgs(/^DOCKER_/i, '--build-arg {attr}={value}')
        mapExtraArgs(/^PKG_/i, '--build-arg {variable}={value}')
    }
    exec.args.push(lastArg)
}

interface ExtraArgMap {
    [index: string]: string
}

/**
 * @param {RegExp} varMatch filter for environment variable that is used to also map, example: /^MY_VAR_/i
 * @param {string} argument template for the argument; available variables: {attribute} {attr} {value}
 */
function mapExtraArgs(varMatch: RegExp, argument: string): void {
    Object.keys(exec.env)
        .filter($var => $var.match(varMatch))
        .forEach(variable => {
            const map: ExtraArgMap = {
                'variable': variable,
                'attribute': variable.replace(varMatch, '').toLowerCase(),
                'attr': variable.replace(varMatch, ''),
                'value': `'${exec.env[variable]}'`,
            }

            for (let arg of argument.split(' ')) {
                for (const property of Object.keys(map))
                    arg = arg.replace(`{${property}}`, map[property])

                exec.args.push(arg)
            }
        })
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Parse variables in the command or arguments
// TODO: Create or Find a Yarn plugin that parses the package json into environment variables to be used

for (let [index, argument] of Object.entries(exec.args)) {
    for (const key of Object.keys(exec.env))
        argument = argument.replace(`^${key}^`, exec.env[key] ?? '')
    exec.args[Number(index)] = argument
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Execute command in the foreground

console.log(`> ${exec.command} ${exec.args.join(' ')}`)

child_process
    .spawn(exec.command, exec.args, {
        stdio: 'inherit',
        env: exec.env
    })
    .on('close', (code) => process.exit(code ?? 1))
