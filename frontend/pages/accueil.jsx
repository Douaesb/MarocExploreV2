import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/header";

function Accueil() {
  const [itineraires, setItineraire] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const fetchItineraire = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/itineraires"
        );
        setItineraire(response.data.itineraires);
      } catch (error) {
        console.error("Error fetching itineraire data", error);
      }
    };
    fetchItineraire();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleFilterClick = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/itineraires/filter",
        {
          params: {
            categorie_id: selectedCategoryId,
            duree: duration,
          },
        }
      );
      setItineraire(response.data.itineraires);
    } catch (error) {
      console.error("Error filtering itineraires:", error);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const [destinations, setDestination] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
console.log(itineraires);
  const handleSearch = async () => {
    try {
      let response;
      if (searchQuery.trim() === "") {
        response = await axios.get("http://127.0.0.1:8000/api/itineraires");
      } else {
        response = await axios.get(
          "http://127.0.0.1:8000/api/itineraires/search",
          {
            params: {
              titre: searchQuery,
              destinations: destinations,
            },
          }
        );
      }
      setItineraire(response.data.itineraires);
      setDestination(response.data.itineraires.destinations);
      console.log(response.data.itineraires.destinations)
    } catch (error) {
      console.error("Error searching itineraires:", error);
    }
  };

  return (
    <>
      <div>
        <header className="py-4 px-4 sm:px-10 z-50 min-h-[70px]">
          <div className="relative flex flex-wrap items-center gap-4">
            <a href="">
              <img
                src="./src/assets/voyage.jpg"
                alt="logo"
                className=" w-16 h-16"
              />
            </a>
            <div className="flex ml-auto lg:order-1 flex gap-4">
              <a
                className="px-6 py-3 rounded-xl text-white bg-blue-500 transition-all "
                href="/login"
              >
                Login
              </a>
              <a
                className="px-6 py-3 rounded-xl text-black border border-blue-500 transition-all "
                href="/Register"
              >
                Register
              </a>
              <button id="toggle" className="lg:hidden ml-7">
                <svg
                  className="w-7 h-7"
                  fill="#000"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
                </svg>
              </button>
            </div>
            <ul
              id="collapseMenu"
              className="lg:!flex lg:ml-12 lg:space-x-6 max-lg:space-y-6 max-lg:hidden max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[250px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto max-lg:z-50"
            >
              <li className="max-lg:border-b max-lg:py-2 px-3">
                <a
                  href=""
                  className="lg:hover:text-blue-600 block font-bold transition-all"
                >
                  Itineraire
                </a>
              </li>
            </ul>
          </div>
        </header>
      </div>
      <div className="relative">
        <div className=" max-w-4xl mx-auto text-center relative z-10">
          <h1 className="md:text-2xl text-4xl font-extrabold md:!leading-[75px]">
            Créer, Modifier et Supprimer vos itinéraires
          </h1>
          <h2 className="md:text-xl text-4xl  mb-6 md:!leading-[75px]"></h2>
        </div>

        <div className="grid grid-cols-4 border-2 border-blue-200 shadow-lg p-10 w-4/5 mx-auto rounded-md gap-4 mb-4">
          <div className="col-span-4 mb-4">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="search"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Search by Titre
                  </label>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter titre to search"
                    required=""
                  />
                </div>

                <button
                  onClick={handleSearch}
                  className="mt-7 px-4 py-2 bg-blue-500 text-white h-fit rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Search
                </button>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="categorie"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Category
                  </label>
                  <select
                    id="categorie"
                    name="categorie_id"
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="duration"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Durée (xx jours)
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={duration}
                    onChange={handleDurationChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter duration in days"
                    required=""
                  />
                </div>
                <button
                  onClick={handleFilterClick}
                  className="mt-7 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
          {itineraires.map((itineraire) => (
            <div
              key={itineraire.id}
              className="card shadow border-2 p-4 border-gray-200 rounded-md"
            >
              <div className="flex justify-center">
                <img src={itineraire.image} className="w-3/5" alt="image" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <h4 className="font-bold mt-2">
                    Categorie : {itineraire.categorie.name}
                  </h4>
                </div>
                <h3>
                  {" "}
                  <span className="font-semibold underline">Titre</span> :{" "}
                  {itineraire.titre}
                </h3>
                <div className="flex justify-between">
                  <span className="font-semibold">
                  Début : 
                    <span className="font-normal"> {itineraire.debut}</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">
                  Fin : 
                    <span className="font-normal"> {itineraire.fin}</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">
                  Durée : 
                    <span className="font-normal"> {itineraire.duree}</span>
                  </span>
                </div>
                <span className="font-semibold">
                  User name :
                  <span className="text-blue-500"> {itineraire.user.name}</span>
                </span>
              </div>
              <a
                    href={`/destination/${itineraire.id}?titre=${
                      itineraire.titre
                    }&destinations=${encodeURIComponent(
                      JSON.stringify(itineraire.destinations)
                    )}`}
                    className=" bg-blue-200 mt-2 rounded-lg w-fit px-4  flex items-center"
                  >
                   Voir les destinations
                  </a>


            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Accueil;
