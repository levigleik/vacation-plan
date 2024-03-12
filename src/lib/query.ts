import * as qs from 'qs'

export const normalizeQuery = (object: any = {}) => {
  const normalize = (theObject: any): any => {
    let result = null
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i++) {
        result = normalize(theObject[i])
        if (result) {
          break
        }
      }
    } else {
      for (const prop in theObject) {
        if (
          theObject[prop] instanceof Object ||
          theObject[prop] instanceof Array
        ) {
          normalize(theObject[prop])
        }
        try {
          theObject[prop] = JSON.parse(theObject[prop])
        } catch (error) {}
      }
    }
    return result
  }
  normalize(object)
  return object
}

export const getQuery = (request: Request) => {
  const query = request.url.split('?')[1]
  return normalizeQuery(qs.parse(query, { allowDots: true, depth: Infinity }))
}
