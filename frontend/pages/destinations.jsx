import { useParams } from "react-router-dom";
import Navbar from "../components/header";

function DestinationPage() {
  const { itineraireId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const titre = params.get('titre');
//   console.log(titre)
  const destinations = JSON.parse(params.get("destinations"));
//   console.log(destinations);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5">Destinations de l'Itineraire "{titre}"</h1>
        <div className="grid grid-cols-3 gap-4">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="card shadow border-2 p-4 border-gray-200 rounded-md"
            >
              <h2 className="text-lg font-semibold mb-2">
                Name : {destination.nom}
              </h2>
              <p className="text-gray-600 mb-2">
                Lieu de logement: {destination.logement}
              </p>
              <p className="text-gray-600 mb-2">
                Liste de suggestions: {destination.liste}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DestinationPage;
