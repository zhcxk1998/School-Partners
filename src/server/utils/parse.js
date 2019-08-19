module.exports = function (array) {
  array.map(object => {
    for (let item in object) {
      try {
        object[item] = JSON.parse(object[item])
      } catch{
        object[item] = JSON.parse(JSON.stringify(object[item]))
      }
    }
  })
  return array
}