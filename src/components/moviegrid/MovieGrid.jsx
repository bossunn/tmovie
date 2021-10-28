import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import tmdpApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import { MovieCard } from "../movieCard/MovieCard";
import "./moviegrid.scss";

export const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdpApi.getMovieList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdpApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdpApi.search(props.category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdpApi.getMovieList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdpApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdpApi.search(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard key={i} item={item} category={props.category} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton onClick={loadMore}>Load more</OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
  const history = useHistory();

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, history, props.category]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};
