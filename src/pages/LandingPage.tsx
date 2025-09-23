import React from "react";
import FirstPage from "../components/FirstPage";
import NavBar from "../components/NavBar";

export default function LandingPage() {
  return (
    <div className="h-full w-full flex flex-col gap-4 md:gap-[8vh]">
      <NavBar />
      <FirstPage />
    </div>
  );
}
