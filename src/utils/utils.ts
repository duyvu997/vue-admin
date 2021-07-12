const reverseDay = (date: string) => {
  return date
    .split('-')
    .reverse()
    .join('-')
}
type obj = { [x: string]: any }

const deference = (oldObj: obj, newObj: obj, dateProperties: string[] = []) => {
  const deferenceObject: obj = {}

  const newProperties = Object.keys(newObj)

  newProperties.forEach((key) => {
    if (dateProperties.includes(key)) {
      oldObj[key] = reverseDay(oldObj[key])
    }
    if (oldObj[key] !== newObj[key]) {
      deferenceObject[key] = newObj[key]
    }
  })

  return deferenceObject
}

export { reverseDay, deference }
