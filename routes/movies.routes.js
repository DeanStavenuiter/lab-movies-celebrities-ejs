const router = require("express").Router();
const MovieModel = require("../models/Movie.model");
const CelebrityModel = require("../models/Celebrity.model");

router.get("/create", async (req, res) => {
  try {
    const movies = await MovieModel.find().populate("cast");
    const celebrities = await CelebrityModel.find();
    res.render("movies/new-movie", { movies, celebrities });
  } catch (error) {
    console.log("error");
  }
});

router.post("/create", async (req, res) => {
  try {
    const body = req.body;
    await MovieModel.create({
      ...body,
    });
    res.redirect("/movies/all-movies");
  } catch (error) {
    console.log("Something went wrong with creating a movie", error);
    res.render("movies/new-movie");
  }
});

router.get("/all-movies", async (req, res) => {
  try {
    const allMovies = await MovieModel.find();
    res.render("movies/all-movies", { allMovies });
  } catch (error) {
    console.log("There is an error with the all-movies page", error);
  }
});

router.get("/all-movies/:movieId", async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.movieId).populate(
      "cast"
    );
    res.render("movies/movie-details", { movie });
  } catch (error) {
    console.log("Something went wrong getting the id page", error);
  }
});

router.get("/all-movies/:movieId/edit", async (req, res) => {
  const movie = await MovieModel.findById(req.params.movieId);
  const celebrityArr = await CelebrityModel.find();
  res.render("movies/edit-movie", { movie, celebrityArr, update: true });
});

router.post("/all-movies/:movieId", async (req, res) => {
  await MovieModel.findByIdAndUpdate(req.params.movieId, {
    ...req.body,
  });
  res.redirect(`/movies/all-movies/${req.params.movieId}`);
});

router.post("/all-movies/:movieId/edit", async (req, res) => {
  const id = req.params.movieId
  res.redirect(`/movies/all-movies/${id}/edit`);
});

router.post("/all-movies/:movieId/delete", async (req, res) => {
  try {
    console.log("Whatever");
    await MovieModel.findByIdAndRemove(req.params.movieId);
    res.redirect("/movies/all-movies");
  } catch (error) {
    console.log("There is an error with deleting the movie", error);
  }
});

module.exports = router;
