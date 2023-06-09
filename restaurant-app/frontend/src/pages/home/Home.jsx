import React, { useState, useEffect } from "react";
import QueryFilter from "../../components/filter/QueryFilter";
import Pagination from "../../components/pagination/Pagination";
import Cards from "../../components/cards/Cards";
import axios from "axios";
import "./home.css";
import Header from "../../components/header/Header";

export default function Home() {
  // state variables
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = restaurants.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(restaurants.length / recordsPerPage);

  // Get Restaurants on initial load
  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    const res = await axios.get("http://localhost:5000/api/restaurants");
    setRestaurants(res.data);
    setLoading(false);
  };

  // function called to search for restaurant
  const searchRestaurant = async (restaurantId, rfId) => {
    let url;
    if (restaurantId && rfId) {
      url = `http://localhost:5000/api/restaurants?restaurantId=${restaurantId}&rfId=${rfId}`;
    } else if (restaurantId) {
      url = `http://localhost:5000/api/restaurants?restaurantId=${restaurantId}`;
    } else if (rfId) {
      url = `http://localhost:5000/api/restaurants?rfId=${rfId}`;
    }
    const res = await axios.get(url);
    setRestaurants(res.data);
  };

  // the jsx code that contains our components
  return (
    <section className="main">
      {loading && <div>Loading page....</div>}
      <Header />
      <QueryFilter searchRestaurant={searchRestaurant} getRestaurants={getRestaurants} />
      <Cards restaurants={currentRecords} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
