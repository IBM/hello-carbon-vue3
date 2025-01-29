// Substitute for lodash object _get
// Here is a nice one-liner from the article "Safely Accessing Deeply Nested Values In JavaScript"
export const useObject = () => {
  return {
    _get: (object, path, defval = null) => {
      if (typeof path === 'string') path = path.split('.')
      return path.reduce((xs, x) => (xs && xs[x] ? xs[x] : defval), object)
    },
  }
}
