import { Link } from "react-router-dom";
import LiquidEther from "./Backgrounds/LiquidEther";

function FirstPage() {
  return (
    <div className="h-[100vh] w-full flex  bg-[#070715] relative">
      <LiquidEther
        colors={["#422A83", "#9E4AF2", "#b19eef"]}
        mouseForce={40}
        cursorSize={100}
        isViscous={true}
        resolution={0.5}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        style={{ display: "flex" }}
      >
        <div className="h-[50vh] md:h-[40vh] w-[90vw] md:w-[60vw] absolute text-white left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-xl p-4 md:p-8 flex flex-col items-center justify-center gap-[4vh] md:gap-[8vh]">
          <p className="text-2xl md:text-4xl lg:text-6xl font-bold text-center bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-[10vh] w-full md:w-auto">
            <Link
              to="/about"
              className="px-6 md:px-10 py-3 md:py-5 bg-white/10 backdrop-saturate-150 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-4xl transition-all duration-300 font-slim text-center text-sm md:text-base"
            >
              About Us
            </Link>
            <Link
              to="/"
              className="px-6 md:px-10 py-3 md:py-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-4xl hover:opacity-90 transition-all duration-300 font-semibold text-center text-sm md:text-base"
            >
              Download
            </Link>
          </div>
        </div>
      </LiquidEther>
    </div>
  );
}

export default FirstPage;
