import { server_configuration } from 'universal-webpack'
import settings from '../../../universal-webpack-settings'
import config from '../../../client/config/development/webpack';

config.output.publicPath = "http://localhost:5000/"


export default server_configuration(config, settings)