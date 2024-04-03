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
      <Navbar />
      <div className="relative">
        <div className="px-4 sm:px-10">
          <div className="mt-16 max-w-4xl mx-auto text-center relative z-10">
            <h1 className="md:text-6xl text-4xl font-extrabold mb-6 md:!leading-[75px]">
              Build Landing Pages with Typeform Integration
            </h1>
            <p className="text-base">
              Embark on a gastronomic journey with our curated dishes, delivered
              promptly to your doorstep. Elevate your dining experience today.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="mt-10">
              <a href="/itineraire" className="px-6 py-3 rounded-xl text-white bg-cyan-900 transition-all hover:bg-cyan-800">
                Get started today
              </a>
            </div>
            <div>
              <h1>Welcome, {user ? user.name : "Guest"}!</h1>
            </div>
          </div>
          <hr className="my-12 border-gray-300" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <img
              src="https://readymadeui.com/google-logo.svg"
              className="w-28 mx-auto"
              alt="google-logo"
            />
            <img
              src="https://readymadeui.com/facebook-logo.svg"
              className="w-28 mx-auto"
              alt="facebook-logo"
            />
            <img
              src="https://readymadeui.com/linkedin-logo.svg"
              className="w-28 mx-auto"
              alt="linkedin-logo"
            />
            <img
              src="https://readymadeui.com/pinterest-logo.svg"
              className="w-28 mx-auto"
              alt="pinterest-logo"
            />
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
