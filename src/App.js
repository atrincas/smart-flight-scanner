import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAirports } from "./actions/fetchAirports";
import SearchForm from "./components/SearchForm";

import { Loader, FadeIn } from "./styled/Lib";

export default function App() {
  const dispatch = useDispatch();
  const getAirports = useCallback(() => dispatch(fetchAirports()), [dispatch]);
  const airports = useSelector(state => state.airports);

  useEffect(() => {
    getAirports();
  }, [getAirports]);

  return airports.isFetching ? (
    <Loader />
  ) : (
    <FadeIn duration="0.8s" delay="0.2s">
      <SearchForm />
    </FadeIn>
  );
}
