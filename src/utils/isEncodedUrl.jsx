function isEncodedUrl(str) {
  try {
    const decodedStr = decodeURIComponent(str)
    return decodedStr !== str
  } catch (e) {
    return false;
  }
}

export default isEncodedUrl
