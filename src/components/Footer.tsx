import React from "react";
import LightRays from "./Backgrounds/LightRays";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className=" h-max md:h-[50vh]   w-full relative ">
      <LightRays
        raysOrigin="top-left"
        raysColor="#AF81FF"
        raysSpeed={1}
        lightSpread={2}
        rayLength={3}
        followMouse={false}
        mouseInfluence={0.0}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />
      <div className="h-max md:h-full w-full  flex items-center overflow-hidden">
        <div className="w-full h-full backdrop-blur-sm bg-black/20 border-t border-white/10 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full py-4 md:py-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-white">
              <div className="lg:col-span-1 text-center md:text-left">
                <Link to="/" className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  KatharOS
                </Link>
                <p className="text-sm md:text-lg text-gray-300 mb-2 md:mb-4 leading-relaxed">
                  Securely wipe your disk with military-grade encryption and
                  advanced algorithms.
                </p>
                <p className="text-xs md:text-sm text-gray-400">
                  © 2025 All rights reserved.
                </p>
              </div>

              <div className="text-center md:text-left">
                <h4 className="font-semibold mb-2 md:mb-4 text-white/90 text-lg md:text-xl">
                  Quick Links
                </h4>
                <ul className="space-y-1 md:space-y-3">
                  <li>
                    <a
                      href=""
                      className="text-gray-300 hover:text-purple-300 transition-colors duration-200 text-sm md:text-base"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="text-gray-300 hover:text-purple-300 transition-colors duration-200 text-sm md:text-base"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="docs"
                      className="text-gray-300 hover:text-purple-300 transition-colors duration-200 text-sm md:text-base"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-purple-300 transition-colors duration-200 text-sm md:text-base"
                    >
                      Download
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center md:text-left">
                <h4 className="font-semibold mb-2 md:mb-4 text-white/90 text-lg md:text-xl">
                  Contact
                </h4>
                <ul className="space-y-1 md:space-y-3 text-sm md:text-base text-gray-300">
                  <li className="hover:text-white transition-colors duration-200">
                    support@katharos.com
                  </li>
                </ul>
              </div>

              <div className="text-center md:text-left">
                <h4 className="font-semibold mb-2 md:mb-4 text-white/90 text-lg md:text-xl">
                  Connect
                </h4>
                <div className="flex flex-col space-y-1 md:space-y-3">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-purple-300 transition-all duration-200 text-sm md:text-base flex items-center justify-center md:justify-start group"
                  >
                    <span className="w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full mr-3 group-hover:bg-purple-300 transition-colors"></span>
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-purple-300 transition-all duration-200 text-sm md:text-base flex items-center justify-center md:justify-start group"
                  >
                    <span className="w-2 h-2 md:w-3 md:h-3 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-300 transition-colors"></span>
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-purple-300 transition-all duration-200 text-sm md:text-base flex items-center justify-center md:justify-start group"
                  >
                    <span className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full mr-3 group-hover:bg-green-300 transition-colors"></span>
                    Discord
                  </a>
                  <a
                    href="docs"
                    className="text-gray-300 hover:text-purple-300 transition-all duration-200 text-sm md:text-base flex items-center justify-center md:justify-start group"
                  >
                    <span className="w-2 h-2 md:w-3 md:h-3 bg-red-400 rounded-full mr-3 group-hover:bg-red-300 transition-colors"></span>
                    Documentation
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-2 md:mt-4 pt-2 md:pt-4 text-center">
              <p className="text-xs md:text-sm text-gray-400">
                Built with ❤️ for secure data management, by Team Katharos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
