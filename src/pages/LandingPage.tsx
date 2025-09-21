import React from "react";
import FirstPage from "../components/FirstPage";
import SecondPage from "../components/SecondPage";
import NavBar from "../components/NavBar";
import ThirdPage from "../components/ThirdPage";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="h-full w-full flex flex-col gap-4 md:gap-[8vh]">
      <NavBar />
      <FirstPage />
      <SecondPage />
      <ThirdPage />
      <Footer />
    </div>
  );
}
