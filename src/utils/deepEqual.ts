export function deepEqual<T = any, U = any>(x: T, y: U) {
  if (arguments.length < 1) {
    throw Error('Need two arguments to compare')
  }
  const leftChain: T[] = []
  const rightChain: U[] = []
  return compare2Objects(x, y)
  function compare2Objects(x: T, y: U) {
    if (Object.is(x, y)) return true
    if (!otherEqual(x, y)) return false
    if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y)) return false
    if (Object.getPrototypeOf(x) === Map.prototype) {
      return mapEqual(x as Map<T, U>, y as Map<T, U>)
    }
    if (Object.getPrototypeOf(x) === Set.prototype) {
      return setEqual(x as Set<T>, y as Set<U>)
    }
    if (leftChain.includes(x) || rightChain.includes(y)) return false
    if (!propsEqual(x, y)) return false
    return true
  }
  function propsEqual(x: T, y: U) {
    if (
      Object.getOwnPropertyNames(x).length !==
      Object.getOwnPropertyNames(y).length
    ) {
      return false
    }
    for (const p in x) {
      if (
        Object.prototype.hasOwnProperty.call(y, p) !==
        Object.prototype.hasOwnProperty.call(x, p)
      ) {
        return false
      }
    }
    for (const p in x) {
      switch (typeof x[p]) {
        case 'object':
        case 'function':
          leftChain.push(x)
          rightChain.push(y)
          if (!deepEqual(x[p], y[p as unknown as keyof U])) {
            return false
          }
          leftChain.pop()
          rightChain.pop()
          break
        default:
          if ((x[p] as any) !== y[p as unknown as keyof U]) return false
          break
      }
    }
    return true
  }
}
function mapEqual<T = any, U = any>(x: Map<T, U>, y: Map<T, U>) {
  let same = true
  if (x.size !== y.size) return false
  x.forEach((value: U, key: T) => {
    if (!y.has(key)) same = false
    if (!deepEqual(x.get(key), y.get(key))) same = false
  })
  return same
}
function setEqual<T = any, U = any>(x: Set<T>, y: Set<U>) {
  let count = 0
  if (x.size !== y.size) return false
  x.forEach((value1: T) => {
    y.forEach((value2: U) => {
      if (deepEqual(value1, value2)) count++
    })
  })
  return count === x.size
}
type HaveToStringType<T> = T extends { toString: () => string } ? T : never

function otherEqual<T = any, U = any>(x: T, y: U) {
  if (typeof x === 'function' && typeof y === 'function') {
    return x.toString() === y.toString()
  }
  if (
    x instanceof Date ||
    x instanceof RegExp ||
    x instanceof String ||
    x instanceof Number
  ) {
    const typeX = Object.prototype.toString.call(x)
    const typeY = Object.prototype.toString.call(y)
    return (
      typeX === typeY && x.toString() === (y as HaveToStringType<U>).toString()
    )
  }
  if (!(x instanceof Object && y instanceof Object)) return false
  return true
}
