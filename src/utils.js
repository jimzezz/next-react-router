/* @flow */

export function omitKeys (keys: Array<string>, source: Object): Object {
  const clone = { ...source }

  keys.forEach((key) => {
    delete clone[key]
  })

  return clone
}
