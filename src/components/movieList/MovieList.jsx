import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./movielist.scss";

import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import tmdpApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { MovieCard } from "../movieCard/MovieCard";

const MovieList = (props) => {
  const [items, setItem] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdpApi.getMovieList(props.type, { params });
            break;
          default:
            response = await tmdpApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdpApi.similar(props.category, props.id);
      }
      setItem(response.results);
    };
    getList();
  }, [props.category, props.id, props.type]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
