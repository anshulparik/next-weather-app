"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";
import { fetchCityData } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import Loader from "../Loader/Loader";

const Weather = ({ city }: { city: string }) => {
  const pathName = usePathname();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ location: {}, current: {} });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setLoading(true);
    const { response, err } = await fetchCityData(city);
    if (!err) {
      setData(response?.data);
    }
    setLoading(false);
  };

  const addCardToCollection = async () => {
    try {
      setLoading(true);
      await axios?.post(`${process?.env?.NEXT_PUBLIC_APP_BASE_URL}`, {
        city: data?.location?.name,
        tempC: data?.current?.temp_c,
        tempF: data?.current?.temp_f,
        conditionImg: data?.current?.condition?.icon,
        conditionText: data?.current?.condition?.text,
        humidity: data?.current?.humidity,
        feelsLike: data?.current?.feelslike_c,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error, "Failed to add an entry in DB!");
    }
  };

  const removeCardFromCollection = async () => {
    try {
      setLoading(true);
      await axios?.delete(`${process?.env?.NEXT_PUBLIC_APP_BASE_URL}/${city}`);
      window.location.href = "/collection";
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error, "Failed to delete in DB!");
    }
  };

  return (
    <div className="card">
      {loading ? <Loader /> : null}
      <div className="upper-part">
        <h1 className="city">{data?.location?.name}</h1>
        <h1 className="temp">{`${data?.current?.temp_c}`}&deg;C</h1>
      </div>
      <div className="lower-part">
        <div className="condition">
          <img
            className="condition-img"
            src={data?.current?.condition?.icon}
            alt="Cloud"
          />
          <h2>
            <span className="condition-text">
              {data?.current?.condition?.text}
            </span>
          </h2>
        </div>
        <div className="details">
          <h2>
            <span className="label">Temp in F:</span>
            {`${data?.current?.temp_f}`}&deg;F
          </h2>
          <h2>
            <span className="label">Humidity:</span>
            {data?.current?.humidity}
          </h2>
          <h2>
            <span className="label">Feels like:</span>
            {`${data?.current?.feelslike_c} C`}
          </h2>
        </div>
      </div>
      {pathName && pathName === "/" ? (
        <button
          onClick={addCardToCollection}
          type="button"
          className="api-add-button"
        >
          Add
        </button>
      ) : (
        <button
          onClick={removeCardFromCollection}
          type="button"
          className="api-remove-button"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default Weather;
