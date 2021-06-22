import Movie from '../models/movies.model'

export const listAll = async(req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({movies})
  } catch (error) {
    console.error(error);
  }
}

export const create = async(req, res) => {
  const { name, sinopsis, producedBy, imageURL} = req.body;
  const addMovie = new Movie({
    name,
    sinopsis, 
    producedBy, 
    imageURL
  })
  
  const saveMovie = await addMovie.save();
  console.log(saveMovie);
  res.status(200).json({saveMovie})
}