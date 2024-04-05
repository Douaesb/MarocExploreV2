import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/header";
import { useParams } from "react-router-dom";

function ModifyItineraire() {
  const [user, setUser] = useState(null);
  const { itineraireId } = useParams();
  const token = localStorage.getItem("token");
  const [destinationCount, setDestinationCount] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        const categoriesData = response.data.categories.map((category) => ({
          id: category.id,
          name: category.name,
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
    setItineraireInfo({ ...itineraireInfo, categorie_id: e.target.value });
  };
  const addDestination = (e) => {
    e.preventDefault();
    setDestinationCount(destinationCount + 1);
    setDestinations([...destinations, { nom: "", logement: "", liste: "" }]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const [fieldName, fieldIndex] = name.split("-");
    const newDestinations = [...destinations];
    newDestinations[index][fieldName] = value;
    setDestinations(newDestinations);
  };

  const handleItineraireInfoChange = (e) => {
    const { name, value } = e.target;
    setItineraireInfo({ ...itineraireInfo, [name]: value });
  };

  const [itineraireInfo, setItineraireInfo] = useState({
    titre: "",
    categorie_id: "",
    image: null,
    debut: "",
    fin: "",
    duree: "",
  });
  const [destinations, setDestinations] = useState([
    { nom: "", logement: "", liste: "" },
  ]);

  useEffect(() => {
    const fetchItineraireDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/itineraires/edit/${itineraireId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const { itineraire } = response.data;
        const { destinations } = itineraire;
        setItineraireInfo(itineraire);
        setDestinations(destinations);
      } catch (error) {
        console.error("Error fetching itinerary details:", error);
      }
    };

    fetchItineraireDetails();
  }, [itineraireId]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const { image, ...formData } = itineraireInfo;
      formData.titre = itineraireInfo.titre;
console.log(formData.titre)
      const response = await axios.put(
        `http://127.0.0.1:8000/api/itineraires/update/${itineraireId}`,
        { ...formData, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
        
      );
      console.log(response);  
  

      console.log("Itinéraire modifié avec succès:", response.data);
      window.location.href = "/itineraire";
    } catch (error) {
      console.error("Erreur lors de la modification de l'itinéraire:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setItineraireInfo({ ...itineraireInfo, image: file });
  };
  return (
    <>
      <Navbar />
      <div className=" max-w-4xl mx-auto text-center relative z-10">
        <h1 className="md:text-2xl text-4xl font-extrabold md:!leading-[75px]">
          Modifier vos itinéraires
        </h1>
        <h2 className="md:text-xl text-4xl  mb-6 md:!leading-[75px]">
          Welcome, {user ? user.name : "Guest"}!
        </h2>
      </div>
      <div className=" overflow-y-auto overflow-x-hidden z-50 w-full max-h-full">
        <div className=" flex justify-center p-4 max-h-full">
          <div className="w-4/5 bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Créer nouveau itinéraire
              </h3>
            </div>
            <form
              className="p-4 md:p-5"
              onSubmit={handleSubmitForm}
              encType="multipart/form-data"
            >
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="flex flex-col  w-full col-span-2 ">
                  <label className=" flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                      {itineraireInfo.image ? (
                        <img
                          src={itineraireInfo.image}
                          alt="Selected Image"
                          className="w-full max-h-48 object-cover mt-4"
                        />
                      ) : (
                        <img
                          // src={URL.createObjectURL(itineraireInfo.image)}
                          alt=" Image"
                          className="w-full max-h-48 object-cover mt-4"
                        />
                      )}
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                  </label>
                </div>
                <div className="col-span-2 ">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Categorie
                  </label>
                  <select
                    id="categorie"
                    name="categorie_id"
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select categorie</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 ">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Titre
                  </label>
                  <input
                    type="text"
                    name="titre"
                    id="titre"
                    value={itineraireInfo.titre}
                    onChange={handleItineraireInfoChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="entrer le titre de l'itinéraire"
                    required=""
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Début
                  </label>
                  <input
                    type="text"
                    name="debut"
                    id="debut"
                    value={itineraireInfo.debut}
                    onChange={handleItineraireInfoChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="ville 1"
                    required=""
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Fin
                  </label>
                  <input
                    type="text"
                    name="fin"
                    id="fin"
                    value={itineraireInfo.fin}
                    onChange={handleItineraireInfoChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="ville 2"
                    required=""
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Durée
                  </label>
                  <input
                    type="text"
                    name="duree"
                    id="duree"
                    value={itineraireInfo.duree}
                    onChange={handleItineraireInfoChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="xx jours"
                    required=""
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Ajouter au moins 2 destinations
                </h3>
              </div>
              <div>
                {destinations &&
                  destinations.map((destination, index) => (
                    <div key={index}>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-4">
                        Destination {index + 1}
                      </h4>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor={`nom-${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Nom
                        </label>
                        <input
                          type="text"
                          name={`nom-${index}`}
                          id={`nom-${index}`}
                          value={destination.nom}
                          onChange={(e) => handleInputChange(index, e)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="ville 1"
                          required=""
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor={`logement-${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Lieu de logement
                        </label>
                        <input
                          type="text"
                          name={`logement-${index}`}
                          id={`logement-${index}`}
                          value={destination.logement}
                          onChange={(e) => handleInputChange(index, e)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="ville 2"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor={`liste-${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Liste de suggestions
                        </label>
                        <textarea
                          id={`liste-${index}`}
                          name={`liste-${index}`}
                          rows="4"
                          value={destination.liste}
                          onChange={(e) => handleInputChange(index, e)}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder=" Endroits à visiter, activités ou plats à essayer .."
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mt-2 text-white inline-flex items-center bg-blue-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Modifier itineraire
                </button>
                <button
                  type="submit"
                  onClick={addDestination}
                  className="mt-2 text-white inline-flex items-center bg-blue-300 font-medium rounded-full text-sm p-1.5 text-center border border-black"
                >
                  <svg
                    className="me-1 -ms-1 w-6 h-6 ml-1 "
                    fill="#000000"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModifyItineraire;
