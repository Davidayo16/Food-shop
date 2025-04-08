import React from "react";
import LocationSelector from "../components/LocationSelector";

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <LocationSelector />
    </div>
  );
};

export default Home;
