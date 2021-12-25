'use strict';

const process = require('process')

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Resolve paths

const path = require('path')
const fs = require('fs')

const dir = {current: process.cwd(), root: process.cwd()} // use for passing as reference
for (let limit = 0; limit < 6; limit++) {
    const checkPath = path.resolve(dir.root, '..')
    const gitPath = path.resolve(checkPath, '.git')
    const gitFound = fs.existsSync(gitPath)

    dir.root = checkPath
    if (gitFound) break
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Load .env files

const dotenv = require('dotenv')
let collectedEnv = {
    PATH: process.env.PATH,
}

for (const dotenvDir of [dir.root, dir.current]) {
    const dotenvFile = path.resolve(dotenvDir, '.env')
    const dotenvResult = dotenv.config({path: dotenvFile})
    collectedEnv = {...collectedEnv, ...dotenvResult.parsed}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Parse package.json

const pkgFile = path.resolve(dir.current, 'package.json')
const pkg = fs.readFileSync(pkgFile)

const useKeys = [
    "name", "version", "description", "homepage", "bugs", "license", "repository"
]
for (const key of Object.keys(pkg).filter(k => (k in useKeys))) {

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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

/**
 * @param {RegExp} varMatch filter for environment variable that is used to also map, example: /^MY_VAR_/i
 * @param {string} argument template for the argument; available variables: {attribute} {attr} {value}
 */
function mapExtraArgs(varMatch, argument) {
    Object.keys(exec.env)
        .filter($var => $var.match(varMatch))
        .forEach(variable => {
            let arg = argument
            const map = {
                'attribute': variable.replace(varMatch, '').toLowerCase(),
                'attr': variable.replace(varMatch, ''),
                'value': exec.env[variable],
            }

            for (const property of Object.keys(map))
                arg = arg.replace(`{${property}}`, map[property])

            exec.args.push(arg)
        })
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Execute command in the foreground

const child_process = require('child_process')

child_process
    .spawn(exec.command, exec.args, {stdio: 'inherit', env: exec.env})
    .on('close', (code) => process.exit(code))
