import { CallbackFct, connect, ConnectOpts } from '@dagger.io/dagger'
import process from 'node:process'

const PIPELINE_CONFIG: ConnectOpts = { LogOutput: process.stderr }

export const runPipeline = async (fn: CallbackFct) => await connect(fn, PIPELINE_CONFIG)
