import React from 'react';
import axios from 'axios';

import Movie from '../components/Movie.js';
import './Home.css';

class Home extends React.Component {

    state = {
        isLoading: true,
        movies: []
    };

    getMovies = async () => {
        const {
            data: {
                data: {
                    movies
                }
            }
        } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');

        this.setState({ movies, isLoading: false });
    }

    // 컴포넌트 로딩 끝났을 때
    componentDidMount() {
        this.getMovies();
    }

    render() {
        const { isLoading, movies } = this.state;
        return (
            <section className="container">
                {isLoading ?
                    <div className="loader">
                        <span className="loader__text">
                            Loading...
            </span>
                    </div>
                    :
                    <div className="movie">
                        {movies.map((item) => {
                            return <Movie
                                key={item.id}
                                year={item.year}
                                title={item.title}
                                summary={item.summary}
                                poster={item.medium_cover_image}
                                genres={item.genres}
                            />;
                        })}
                    </div>
                }
            </section>
        )
    }
}


export default Home;