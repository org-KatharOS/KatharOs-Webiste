// The rotation animation might not be visible because:
// 1. The import should be from "framer-motion" instead of "motion/react"
// 2. We need to add transition properties to control the animation
// 3. We may need viewport options to control when the animation triggers
import { motion } from "framer-motion";
import Background1 from "./components/Background1.js";
import Background2 from "./components/Background2";
import Background3 from "./components/Background3";
import Background4 from "./components/Background4";
import Background5 from "./components/Background5";
import Background6 from "./components/Background6";
import Background7 from "./components/Background7";
import Background8 from "./components/Background8";

function App() {
  return (
    <div className="bg-white flex flex-col p-4 gap-5 h-full w-full justify-center items-center">
      <div className="h-[100vh] w-full bg-black  shadow-lg"></div>
      <div className="h-full w-full  p-10  shadow-lg flex justify-center [perspective:1000px] overflow-hidden bg-[url(/moon.jpg)] bg-cover">
        <motion.div
          initial={{ transform: "rotate3d(1,0,0,-20deg)" }}
          whileInView={{ transform: "rotate3d(1,0,0,0deg)" }}
          // initial={{ backgroundColor: "red" }}
          // whileInView={{ backgroundColor: "pink" }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ amount: 0.6, once: true }}
          className="h-[100vh] w-[50vw] transparent  shadow-red-400 shadow-md border-solid border-3 border-black backdrop-blur-md"
        ></motion.div>
        <motion.div
          className="h-[60vh] w-[20vw] transparent absolute  bottom-10 right-0 backdrop-blur-md mr-8 border-2 border-blue-400"
          initial={{ opacity: 0, translateY: 400 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
      {/* <div className="h-[100vh] w-full bg-orange-100">
        <Background1
          speed={5}
          scale={1}
          noiseIntensity={0}
          rotation={0}
          color="#6a408fff"
        ></Background1>
      </div> */}
      {/* <div className="h-[100vh] w-full  bg-black">
        <Background2
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={40}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div> */}
      {/* <div className="h-[100vh] w-full  bg-black relative">
        <Background3
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          fadeDistance={3}
          rayLength={3}
          saturation={0}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div> */}
      {/* <div className="h-[100vh] bg-black w-full relative">
        <Background4 hue={220} xOffset={0} speed={1} intensity={1} size={1} />
      </div> */}
      {/* <div className="h-[100vh] bg-black w-full relative">
        <Background5
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
        />
      </div> */}
      {/* <div className="h-[100vh] bg-black w-full relative">
        <Background6
          color={[1 , 0.7, 1]}
          mouseReact={true}
          amplitude={0.1}
          speed={1.0}
        />
      </div> */}
      {/* <div className="h-[100vh] bg-black w-full relative">
        <Background7
          hoverIntensity={1.0}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div> */}
      {/* <div className="h-[100vh] bg-black w-full relative">
        <Background8
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.5}
          amplitude={0.4}
          interactive={true}
        />
      </div> */}
    </div>
  );
}

export default App;
