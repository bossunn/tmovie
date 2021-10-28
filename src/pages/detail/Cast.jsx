import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react/cjs/react.development";
import apiConfig from "../../api/apiConfig";
import tmdpApi from "../../api/tmdbApi";

export const Cast = (props) => {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const response = await tmdpApi.credits(category, props.id);
      setCasts(response.cast.slice(0, 5));
    };
    getCredits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {casts.map((cast, i) => (
        <div className="casts__item" key={i}>
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})`,
            }}
          ></div>
          <p className="casts__item__name">{cast.name}</p>
        </div>
      ))}
    </div>
  );
};
