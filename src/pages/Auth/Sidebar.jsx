import React from "react";
const Sidebar = () => {
  return (
    <aside
      className="w-full h-full relative"
      style={{
        background:
          "linear-gradient(to bottom, rgba(108,114,214, .9), rgba(162, 52,149, 0.8), rgba(209, 107,35, 1))",
      }}
    >
      <img
        src="/images/instagram1.jpg"
        className="w-full h-full object-cover absolute left-0 top-0 -z-10"
        alt="sign bg"
      />
      <img src="/images/instalogo2.png" alt="second bg" className="w-[13rem] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
    </aside>
  );
};

export default Sidebar;
