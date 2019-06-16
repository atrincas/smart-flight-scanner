import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAirports } from "./actions";
import SearchForm from "./components/SearchForm";

import { Loader } from "./styled/Lib";

export default function App() {
  const dispatch = useDispatch();
  const getAirports = useCallback(() => dispatch(fetchAirports()), [dispatch]);
  const airports = useSelector(state => state.airports);

  useEffect(() => {
    getAirports();
  }, [getAirports]);

  return airports.isFetching ? <Loader /> : <SearchForm />;
}
