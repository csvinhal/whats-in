import cx from 'classnames'
import EmptyState from '../components/EmptyState/EmptyState'
import ErrorState from '../components/ErrorState/ErrorState'
import Grid from '../components/Grid/Grid'
import GridItem from '../components/GridItem/GridItem'
import Layout from '../components/Layout/Layout'
import MovieList from '../components/MovieList/MovieList'
import MoviesLoading from '../components/MoviesLoading/MoviesLoading'
import SearchBar from '../components/SearchBar/SearchBar'
import { useFetchMovies } from '../hooks/useFetchMovies'

export const Home = (): JSX.Element => {
    const {
        state: { loading, data, error },
        effectFetchMovies,
    } = useFetchMovies()

    let content
    if (loading) content = <MoviesLoading />
    else if (error)
        content = <ErrorState title={error.title} subtitle={error.subtitle} />
    else if (data) content = <MovieList movies={data.movies} />
    else
        content = (
            <Grid>
                <GridItem xs>
                    <EmptyState
                        title="Don't know what to search?"
                        subtitle="Here's an offer you can't refuse"
                    />
                </GridItem>
            </Grid>
        )

    return (
        <Layout className="container mb-3">
            <Grid>
                <GridItem xs>
                    <div
                        className={cx('container__search mb-4 ', {
                            'container__search--is-empty-state':
                                !loading && !data,
                        })}
                    >
                        <SearchBar
                            placeholder="Search movies..."
                            onChange={e => {
                                effectFetchMovies(e?.target?.value)
                            }}
                        />
                    </div>
                </GridItem>
            </Grid>
            {content}

            <style jsx>{`
                .container__search--is-empty-state {
                    margin-bottom: 25vh;
                }
            `}</style>
        </Layout>
    )
}

export default Home
