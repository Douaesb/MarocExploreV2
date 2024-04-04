import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/header";

function ListeAVisiter() {
  const [itineraires, setItineraires] = useState([]);

  useEffect(() => {
    const fetchListeAVisiter = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/liste-a-visualiser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItineraires(response.data.itineraires);
      } catch (error) {
        console.error("Error fetching itineraries to visit:", error);
      }
    };
    fetchListeAVisiter();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5">Itineraries to Visit</h1>
        <div className="grid grid-cols-3 gap-4">
          {itineraires.map((itineraire) => (
            <div
              key={itineraire.id}
              className="card shadow border-2 p-4 border-gray-200 rounded-md"
            >
              <h2 className="text-lg font-semibold mb-2">
                {itineraire.titre}
              </h2>
              <p className="text-gray-600 mb-2">
                Category: {itineraire.categorie.name}
              </p>
              <p className="text-gray-600 mb-2">Duration: {itineraire.duree}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListeAVisiter;
