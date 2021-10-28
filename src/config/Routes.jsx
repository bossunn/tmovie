import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CatalogPage from "../pages/CatalogPage";
import DetailPage from "../pages/detail/DetailPage";

export default function Routes() {
  return (
    <Switch>
      <Route path="/:category/search/:keyword" component={CatalogPage} />
      <Route path="/:category/:id" component={DetailPage} />
      <Route path="/:category" component={CatalogPage} />
      <Route path="/" exact component={HomePage} />
    </Switch>
  );
}
