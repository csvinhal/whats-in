import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton'
import Grid from '../../components/Grid/Grid'
import GridItem from '../../components/GridItem/GridItem'
import Labels from '../../components/Labels/Labels'
import Layout from '../../components/Layout/Layout'
import SummaryCredit from '../../components/SummaryCredit/SummaryCredit'
import SummaryLabels from '../../components/SummaryLabels/SummaryLabels'
import Typography from '../../components/Typography/Typography'
import { getMovieDetail, updateMovieFavorite } from '../../config/moviesApi'
import { MovieDetails } from '../../models/movieDetails'
export const MovieDetail = ({
    movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
    const [movieDetail, setMovieDetail] = useState(movie)
    const toggleFavorite = useCallback(async () => {
        const { favorite } = movieDetail
        const { data } = await updateMovieFavorite(movieDetail.imdb, favorite)
        setMovieDetail({ ...movieDetail, favorite: data.favorite })
    }, [movieDetail, setMovieDetail])

    const favoriteLabel = useMemo(
        () => (movieDetail.favorite ? 'Added' : 'Add to favourites'),
        [movieDetail.favorite],
    )

    return (
        <Layout className="mb-3" showBackIcon>
            <Grid
                className="summary"
                flexDirection="column"
                flexDirectionMd="row-reverse"
                justifyContentMd="space-between"
            >
                <GridItem md={6}>
                    <div className="summary__image">
                        <Image
                            src={movieDetail.poster}
                            layout="responsive"
                            width={480}
                            height={640}
                        />
                    </div>
                </GridItem>

                <GridItem md={6}>
                    <div className="summary__content">
                        <SummaryLabels
                            className="mb-3"
                            runtime={movieDetail.runtime}
                            rated={movieDetail.rated}
                            year={movieDetail.year}
                        />

                        <Typography className="summary__title mb-3" size="bold">
                            {movieDetail.title}
                        </Typography>

                        <div className="summary__rates">
                            <Labels className="mb-3" logo="imdb">
                                {movieDetail.imdbRate}
                            </Labels>
                            {movieDetail.rottenRate && (
                                <Labels className="mb-3" logo="rotten">
                                    {movieDetail.rottenRate}
                                </Labels>
                            )}
                            <FavoriteButton
                                className="mb-3"
                                favorite={movieDetail.favorite}
                                onClick={toggleFavorite}
                                aria-label={favoriteLabel}
                            >
                                {favoriteLabel}
                            </FavoriteButton>
                        </div>

                        <div className="mb-3">
                            <Typography className="mb-2" color="secundary">
                                Plot
                            </Typography>
                            <Typography>{movieDetail.plot}</Typography>
                        </div>

                        <Grid
                            flexDirection="column"
                            alignItems="center"
                            flexDirectionMd="row"
                            justifyContentMd="space-around"
                        >
                            <GridItem>
                                <SummaryCredit
                                    className="summary__credit mt-1"
                                    title="Cast"
                                    list={movieDetail.actors}
                                />
                            </GridItem>
                            <GridItem>
                                <SummaryCredit
                                    className="summary__credit mt-1"
                                    title="Genre"
                                    list={movieDetail.genre}
                                />
                            </GridItem>
                            <GridItem>
                                <SummaryCredit
                                    className="summary__credit mt-1"
                                    title="Director"
                                    list={movieDetail.director}
                                />
                            </GridItem>
                        </Grid>
                    </div>
                </GridItem>
            </Grid>

            <style jsx>{`
                    .summary__rates {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                    }
    
                    .summary__rates > :global(*:not(last-children)) {
                        margin-right: 1rem;
                    }
    
                    :global(.summary__credit) {
                        text-align: center;
                    }
    
                    .summary__image {
                        position: relative;
                        overflow: hidden;
                        width: 160px;
                        height: auto;
                        border-radius: 8px;
                        margin: 0 auto 16px auto;
                    }

                    @media (max-width: 767px) {
                        .summary__content :global(.summary__title) {
                            font-size: var(--theme-font-size-medium-high);
                            font-weight: var(--theme-font-weight-medium-high);
                            line-height: var(--theme-line-height-medium-high);
                            letter-spacing: var(--theme-letter-spacing-medium-high);
                        }
                    }
    
                    @media (min-width: 768px) {

                        :global(.back__button) {
                            margin-bottom 24px;
                        }
    
                        .content__detail {
                            padding: 8px;
                        }
    
                        .summary__image {
                            width: 480px;
                            max-height: 640px;
                            border-radius: 8px;
                            margin-left: auto;
                        }
    
                        :global(.summary__credit) {
                            text-align: left;
                        }
                    }
                `}</style>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<{
    movie: MovieDetails
}> = async (context: GetServerSidePropsContext) => {
    try {
        const { params } = context
        const res = await getMovieDetail(params.slug as string)

        if (!res.data) {
            return {
                notFound: true,
            }
        }

        return {
            props: { movie: res.data },
        }
    } catch (e) {
        return {
            props: {
                movie: {
                    title: 'What Happens in Vegas',
                    imdb: 'tt1033643',
                    year: '2008',
                    poster:
                        '/MV5BYzQyYjE3YjYtNjJkNi00MWY0LWJhNDctZDRmOTY5ZGJiNDI5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
                    rated: 'PG-13',
                    runtime: '99 min',
                    plot:
                        "Set in Sin City, story revolves around two people who discover they've gotten married following a night of debauchery, with one of them winning a huge jackpot after playing the other's quarter. Unhappy pair try to undermine each other and get their hands on the money -- falling in love along the way.",
                    actors: [
                        'Cameron Diaz',
                        ' Ashton Kutcher',
                        ' Rob Corddry',
                        ' Lake Bell',
                    ],
                    genre: ['Comedy', ' Romance'],
                    director: ['Tom Vaughan'],
                    imdbRate: '6.1/10',
                    rottenRate: '26%',
                    favorite: false,
                },
            },
        }
    }
}
export default MovieDetail
