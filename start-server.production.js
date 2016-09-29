import { server } from 'universal-webpack'
import settings from './universal-webpack-settings.production'
// `configuration.context` and `configuration.output.path` are used
import configuration from './server/config/production/webpack.js'

server(configuration, settings)