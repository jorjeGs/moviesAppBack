const { Router } = require('express');
const router = Router();

const {getMovies, createMovie, deleteMovie, getMovie, updateMovie, getRating} = require('../controllers/movies.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Movies:
 *       type: object
 *       required:
 *         - title 
 *         - imdbid
 *         - synopsis
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the movie
 *         title:
 *           type: string
 *           description: The title of the movie
 *         category:
 *           type: string
 *           description: The movie category
 *         released:
 *           type: string
 *           description: When was the movie released
 *         imgurl:
 *           type: string
 *           description: image url
 *         imdbid:
 *           type: string
 *           description: imdb id
 *         synopsis:
 *           type: string
 *           description: the movie synopsis
 *         ratings:
 *           type: array of string
 *           description: has elements star Number user String
 *         globalrating:
 *           type: string
 *           description: finalrating of all reviews
 *         votes:
 *           type: number
 *           description: total number of reviews
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the movie was added
 *     
 */
/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: The movie API
 * /api/movies:
 *   get:
 *     summary: Lists all the movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movies'
 *   post:
 *     summary: Create a new movie from the imdbid
 *     tags: [Movies]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movies' 
 *          example:
 *            imdbid: tt0245429
 *     responses:
 *       200:
 *         description: message Movie Saved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *             example:
 *               message: Movie Saved
 *       500:
 *         description: Some server error
 * /api/movies/{id}:
 *   get:
 *     summary: Get the movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: The movie response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *       404:
 *         description: The movie was not found
 *   put:
 *    summary: Update the votes by the id
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The movie id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movies'
 *          example:
 *             star: 10
 *             user: Jorge
 *    responses:
 *      200:
 *        description: The Movie was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *      404:
 *        description: The movie was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *
 *     responses:
 *       200:
 *         description: The movie was deleted
 *       404:
 *         description: The movie was not found
 * 
 * /api/movies/rating/{id}:
 *   get:
 *     summary: Get the rating of the movie by imdbid
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: imdbid
 *         schema:
 *           type: string
 *         required: true
 *         description: The imdb movie id
 *     responses:
 *       200:
 *         description: title, votes and globalrating of the movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *             example:
 *               title: Spirited Away
 *               votes: 2
 *               globalrating: 8
 *       404:
 *         description: The movie was not found
 */
router.route('/') //agregar u obtener
    .get(getMovies)
    .post(createMovie)

router.route('/:id') //instrucciones en donde son necesarias un id
    .delete(deleteMovie)
    .put(updateMovie)
    .get(getMovie)

router.route('/rating/:id')
    .get(getRating)
module.exports = router;
