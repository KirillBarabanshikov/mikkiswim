export const convertToUrlParams = (data) => {
  const urlParams = []

  Object.keys(data).forEach((key) => {
    const value = data[key]

    // Если значение является массивом
    if (Array.isArray(value)) {
      value.forEach((item) => {
        // Кодируем двоеточие как %3A
        const encodedItem = encodeURIComponent(item)
        urlParams.push(`${key}=${encodedItem}`)
      })
    } else {
      urlParams.push(`${key}=${encodeURIComponent(value)}`)
    }
  })

  return urlParams.join('&')
}
