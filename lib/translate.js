const upperFirst = require("lodash/upperFirst");
const startCase = require("lodash/startCase");

function adaptCasing(source, target) {
  if (source.toUpperCase() == source) {
    return target.toUpperCase();
  } else if (startCase(source) == source) {
    return startCase(target);
  } else {
    return target;
  }
}

const VARIABLE_REGEX = /\{\{([^}]+)\}\}/g;

function getVariableCasing(key) {
  const result = {};
  let m;

  do {
    m = VARIABLE_REGEX.exec(key);

    if (m) {
      result[m[1].toLowerCase()] = m[1];
    }
  } while (m);

  return result;
}

function translate(key, variables, config) {
  let string = config.translations[key.toLowerCase()];

  if (!string) {
    throw new Error(`Translation key not found: ${key}`);
  }

  if (variables) {
    const variableCasing = getVariableCasing(key);

    string = string.replace(VARIABLE_REGEX, (match, varName) =>
      adaptCasing(variableCasing[varName] || varName, variables[varName])
    );
  }

  return adaptCasing(key, string);
}

module.exports = translate;
