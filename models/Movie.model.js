const { Schema, model } = require('mongoose')

const movieSchema = new Schema(
  {
    title: {
        type: String,
    },
    genre: {
        type: String,
    },
    plot: {
        type: String,
    },
    cast: {
        type: [Schema.Types.ObjectId],
        ref: 'CelebrityModel',
    },
  },
  {
    timestamps: true,
  }
)

const MovieModel = model('MovieModel', movieSchema)

module.exports = MovieModel