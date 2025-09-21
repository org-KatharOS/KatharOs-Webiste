import React from "react";
import FirstPage from "../components/FirstPage";
import SecondPage from "../components/SecondPage";
import NavBar from "../components/NavBar";

export default function LandingPage() {
  return (
    <div className="h-full w-full flex flex-col ">
      <NavBar />
      <FirstPage />
    </div>
  );
}
