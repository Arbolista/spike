import { client_configuration } from 'universal-webpack'
import settings from '../../../universal-webpack-settings'
import configuration from './webpack.js'

export default client_configuration(configuration, settings)