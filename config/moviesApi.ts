import { MovieResponse } from '../models/movie'
import { MovieDetails } from '../models/movieDetails'
import axios from '../utils/axios'

export const getMovies = (title: string) => {
    return axios.get<MovieResponse>(`/api/movies`, {
        params: { title },
    })
}

export const getMovieDetail = (slug: string) => {
    return axios.get<MovieDetails>(`/api/movie-detail/${slug}`)
}

export const updateMovieFavorite = (slug: string, favorite: boolean) => {
    return axios.post<MovieDetails>(`/api/movie-detail/${slug}`, { favorite })
}
