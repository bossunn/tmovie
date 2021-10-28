const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'ef00cf5a1cc0ab1356dff9793ace7634',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig;