const API_TOKEN ="1b050d52aa59e243971333b98929be8f"


export function getFilmsFromApiWithSearchedText (text,page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }