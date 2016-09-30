import {fnGenerate} from './commons.generator.js'
import gulp from 'gulp';
import generateHelper from '../generate_helper';
import yargs from 'yargs';

export default (done) => {
    var name = yargs.argv.name;
	var withoutCss = yargs.argv.withoutCss;
	if (!name){
    	throw `Must provide --name {String} [--withoutCss] [--where {String}]`;
  	}
  	var destinationFolderName = generateHelper.data(name).componentNameLowerCase;
    var destination = yargs.argv.where || destinationFolderName;
    if(withoutCss) {
   		fnGenerate(name, ['./build-tools/templates/component/*.tpl','!./build-tools/templates/component/*.scss.tpl'], `./shared/components/layouts/${destination}`, 'COMPONENT_NAME');
   	}else {
 		fnGenerate(name, './build-tools/templates/component/*.tpl', `./shared/components/layouts/${destination}`, 'COMPONENT_NAME');
	}
    done();
};
