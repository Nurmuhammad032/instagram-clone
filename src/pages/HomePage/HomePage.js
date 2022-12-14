import React, { useEffect } from "react";
import Timeline from "../../components/Timeline";
import Sidebar from "./../../components/Aside/index";

const HomePage = () => {
  useEffect(() => {
    document.title = "My Instagram";
  }, []);

  return (
    <div className="bg-gray-background mt-20 ">
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg ">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default HomePage;
