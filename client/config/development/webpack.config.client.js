import { client_configuration } from 'universal-webpack'
import settings from 'shared/config/universal-webpack-settings'
import configuration from './webpack.js'

export default client_configuration(configuration, settings)