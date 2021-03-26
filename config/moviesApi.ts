import { MovieResponse } from '../models/movie'
import { MovieDetails } from '../models/movieDetails'
import { axiosInstance, backendAxiosInstance } from '../utils/axios'

export const getMovies = (title: string) => {
    return axiosInstance.get<MovieResponse>(`/api/movies`, {
        params: { title },
    })
}

export const getMovieDetail = (slug: string) => {
    return backendAxiosInstance.get<MovieDetails>(`/api/movie-detail/${slug}`)
}

export const updateMovieFavorite = (slug: string, favorite: boolean) => {
    return backendAxiosInstance.post<MovieDetails>(
        `/api/movie-detail/${slug}`,
        { favorite },
    )
}
