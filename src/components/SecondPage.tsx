import { findValueType, motion } from "framer-motion";
import Orb from "./Backgrounds/Orb";
import { div } from "framer-motion/client";
function SecondPage() {
  return (
    <div className="w-full h-[100vh] relative">
      <Orb
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      >
        <div className="h-full w-full absolute flex justify-center [perspective:1000px] overflow-hidden">
          <motion.div
            initial={{ transform: "rotate3d(1,0,0,-20deg)" }}
            whileInView={{ transform: "rotate3d(1,0,0,0deg)" }}
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
      </Orb>
    </div>
  );
}

export default SecondPage;

{
  /*  */
}
