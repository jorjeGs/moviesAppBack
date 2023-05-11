const axios = require('axios');

////requirements para obtener datos de las peliculas
const moviesCtrl = {};

const Movie = require('../models/Movie');

moviesCtrl.getMovies = async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
}
/*
moviesCtrl.createMovie = async (req, res) => {
    const {title, category, released, synopsis, imdbid} = req.body;
    const newMovie = new Movie({
        title: title,
        category: category,
        released: released,
        synopsis: synopsis,
        imdbid: imdbid
    })
    await newMovie.save();
    res.json({message: 'Pelicula guardada'})
}
*/
//obtiene datos de la api proveida por el profe, y crea notas apartir del codigo de imdb enviado desde el cliente
moviesCtrl.createMovie = async (req, res) => {
    const {imdbid} = req.body;
    const options = {
        method: 'GET',
        url: 'https://ott-details.p.rapidapi.com/gettitleDetails',
        params: {
          imdbid: imdbid
        },
        headers: {
          'X-RapidAPI-Key': '99a67bbd1cmsh02fb55dc79a4625p186d8cjsncbad1445fcd3',
          'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
        }
      };
    try {
        const moviedetails = await axios.request(options);
        console.log(moviedetails.data.title);
        
        const newMovie = new Movie({
            title: moviedetails.data.title,
            category: moviedetails.data.genre[0],
            released: moviedetails.data.released,
            synopsis: moviedetails.data.synopsis,
            imgurl: moviedetails.data.imageurl[0],
            imdbid: imdbid
        })
        await newMovie.save();
        
        res.json({message: 'Pelicula guardada'})

    } catch (error) {
        console.error(error);
    }
    
    
}

moviesCtrl.getMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.json(movie)

}
//mandas al put la calificacion y el nombre del usuario, en la ruta con el id de la pelicula
moviesCtrl.updateMovie = async (req, res) => {
    const { star, user } = req.body;
    await Movie.findOneAndUpdate({_id: req.params.id}, {
        $push:{
            ratings:{
                star: star,
                user: user,
            }
        }
    }); //se actualiza añadiendose una reseña por usuario, podria ser un pop-up

    const getallratings = await Movie.findById(req.params.id); //se obtiene la pelicula
    let totalRating = getallratings.ratings.length; //se obtiene la cantidad de calificaciones que ha obtenido
    let ratingsum = getallratings.ratings
        .map((item) => item.star)//recorre el arreglo de ratings, especificamente el item star
        .reduce((prev, curr) => prev + curr, 0); //reduce realiza la sumatoria de los valores de star
    let actualRating = Math.round(ratingsum / totalRating); //promedio real de calificaciones
    await Movie.findOneAndUpdate({_id: req.params.id},{ //finalmente actualizamos
        globalrating: actualRating,
        votes: totalRating,
    });
    console.log(req.params.id, req.body);
    res.json({message: 'Movie Updated and voted'});
}

moviesCtrl.deleteMovie = async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({message: 'Movie Deleted'})
}
//agregas a la ruta api/movies/rating/{imdbid}
moviesCtrl.getRating = async (req, res) => {
    const result = await Movie.findOne({imdbid: req.params.id});
    res.json({
        title: result.title,
        rates: result.votes,
        finalRating: result.globalrating 
    })
}

module.exports = moviesCtrl;