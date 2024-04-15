import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/header";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
    
      <div className="relative m-auto mt-40">
        <div className="px-4 sm:px-10 m-auto">
          <div className="mt-16 max-w-4xl mx-auto text-center relative z-10">
            <h1 className="md:text-6xl text-4xl font-extrabold mb-6 md:!leading-[75px]">
              Consulter et Gérer vos itinéraires{" "}
            </h1>
            <p className="text-base">
              La plateforme "MarocExplore" vise à promouvoir le tourisme au
              Maroc en offrant une expérience utilisateur immersive pour
              découvrir et planifier des itinéraires de voyage à travers le
              pays.
            </p>
            <div className="mt-10">
              <a
                href="/itineraire"
                className="px-6 py-3 rounded-xl text-white bg-blue-500 transition-all hover:bg-cyan-800"
              >
                Get started today
              </a>
            </div>
            <div>{/* <h1>Welcome, {user ? user.name : "Guest"}!</h1> */}</div>
          </div>
          
        </div>
        <img
          src="https://readymadeui.com/bg-effect.svg"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </>
  );
}

export default Home;
