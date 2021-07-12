const reverseDay = (date: string | undefined) => {
  return date
    ? date
      .split('-')
      .reverse()
      .join('-')
    : undefined
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
