import * as S from 'underscore.string';

function templateData(componentName) {
  return {
    componentNameLowerCase: S.underscored(componentName),
    componentNameCamelCase: S.classify(componentName)
  };
}

function translateFileName(fileName, componentName, templateName) {
  return S.replaceAll(fileName, templateName,
    S.underscored(componentName));
}


export default {
  data: templateData,
  fileName: translateFileName
};
