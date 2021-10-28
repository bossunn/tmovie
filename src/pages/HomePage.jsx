import React from "react";
import { Link } from "react-router-dom";
import { category, movieType, tvType } from "../api/tmdbApi";
import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/heroSlide/HeroSlide";
import MovieList from "../components/movieList/MovieList";

export default function HomePage() {
  return (
    <div>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movie</h2>
            <Link to="/movie">
              <OutlineButton>View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>
      </div>

      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Trending Movie</h2>
          <Link to="/movie">
            <OutlineButton>Top Rated Movie</OutlineButton>
          </Link>
        </div>
        <MovieList category={category.movie} type={movieType.top_rated} />
      </div>

      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Trending TV</h2>
          <Link to="/movie">
            <OutlineButton>View more</OutlineButton>
          </Link>
        </div>
        <MovieList category={category.tv} type={tvType.popular} />
      </div>

      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Trending TV</h2>
          <Link to="/movie">
            <OutlineButton>View more</OutlineButton>
          </Link>
        </div>
        <MovieList category={category.tv} type={tvType.top_rated} />
      </div>
    </div>
  );
}
