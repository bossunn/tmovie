import React from "react";
import { useParams } from "react-router";
import { PageHeader } from "../components/pageHeader/PageHeader";
import { category as cate } from "../api/tmdbApi";
import { MovieGrid } from "../components/moviegrid/MovieGrid";

export default function CatalogPage() {
  const { category } = useParams();
  console.log(category);

  return (
    <div>
      <PageHeader>{category === cate.movie ? "Movie" : "TV"}</PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </div>
  );
}
