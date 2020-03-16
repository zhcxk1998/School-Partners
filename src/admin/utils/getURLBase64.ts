export const getURLBase64 = (url: string) => {
  return new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (this.status === 200) {
        const blob = this.response
        const fileReader = new FileReader()
        fileReader.onloadend = function (e) {
          const { target } = e
          const result = target?.result
          resolve(result)
        }
        fileReader.readAsDataURL(blob)
      }
    }
    xhr.onerror = function () {
      reject()
    }
    xhr.send()
  })
}
