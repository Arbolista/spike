import { server_configuration } from 'universal-webpack'
import settings from '../../../universal-webpack-settings.production'
import config from '../../../client/config/production/webpack';

//config.output.publicPath = "http://localhost:3000/"

config.output.path = __dirname + '/../../../build/server';

export default server_configuration(config, settings)