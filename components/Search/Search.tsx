"use client";
import "./Search.css";
import { fetchCityData } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import Weather from "../Weather/Weather";
import Loader from "../Loader/Loader";

const Search = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ location: {}, current: {} });

  useEffect(() => {
    if (text === "") {
      setData({ location: {}, current: {} });
    }
  }, [text]);

  const handleSearch = async () => {
    setLoading(true);
    const { response, err } = await fetchCityData(text);
    if (!err) {
      setData(response?.data);
    } else {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="search">
      {loading ? <Loader /> : null}
      <input
        className="search-input"
        type="text"
        value={text}
        placeholder="Search city..."
        onChange={(e) => setText(e?.target?.value)}
      />
      <button className="search-button" type="button" onClick={handleSearch}>
        Search
      </button>
      {error ? <p className="err-msg">{error}</p> : ""}
      {Object?.keys(data?.location)?.length ? (
        <div className="search-card">
          <Weather city={data?.location?.name} />
        </div>
      ) : null}
    </div>
  );
};

export default Search;
