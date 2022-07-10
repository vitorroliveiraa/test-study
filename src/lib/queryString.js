const convertKeyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check your params');
  }

  return `${key}=${value}`
}

module.exports.queryString = (obj) =>
  Object.entries(obj)
    .map(convertKeyValueToString)
    .join('&');

module.exports.parse = string =>
  Object.fromEntries(string.split('&').map(item => {
    // const parts = item.split('=');
    let [key, value] = item.split('=');

    // if (parts[1].indexOf(',') > -1) {
    //   parts[1] = parts[1].split(',');
    // }
    if (value.indexOf(',') > -1) {
      value = value.split(',');
    }

    return [key, value];
  }));

/**
 * ? Object.entries()
 * Transforma um objeto, exemplo:
 * * { name: 'vitor', profession: 'developer' }
 * em algo mais parecido com:
 * * [ [ 'name', 'vitor' ], [ 'profession', 'developer' ] ]
 * array dentro de array
 * ============================================================
 * ? string.split
 * retorna um array, exemplo:
 * # before
 * * 'name=vitor&skills=JS,TDD'
 * # after
 * * [ 'name=vitor', 'skills=JS,TDD' ]
 */