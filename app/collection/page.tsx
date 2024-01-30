"use client";
import Loader from "@/components/Loader/Loader";
import Navbar from "@/components/Navbar/Navbar";
import Weather from "@/components/Weather/Weather";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Collection = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process?.env?.NEXT_PUBLIC_APP_BASE_URL}`
      );
      setCards(response?.data?.cards);
      setLoading(false);
    } catch (error) {
      console.log(error, "Failed to fetch from DB!");
      setLoading(false);
    }
  };

  return (
    <div className="collection">
      {loading ? <Loader /> : null}
      <div className="nav">
        <Navbar />
      </div>
      <div className="main">
        {cards?.length
          ? cards?.map((item: any) => {
              return <Weather key={`${item?.city}`} city={`${item?.city}`} />;
            })
          : null}
      </div>
    </div>
  );
};

export default Collection;
