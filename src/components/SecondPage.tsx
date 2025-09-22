import { motion } from "framer-motion";
import Orb from "./Backgrounds/Orb";
function SecondPage() {
  return (
    <div className="w-full h-[100vh]  relative flex justify-center items-center">
      <Orb
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      >
        <div className="h-full w-full absolute flex flex-col md:flex-row justify-center items-center [perspective:1000px] overflow-hidden p-4 md:p-0">
          <motion.div
            initial={{ transform: "rotate3d(1,0,0,-20deg)" }}
            whileInView={{ transform: "rotate3d(1,0,0,0deg)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ amount: 0.3 }}
            className="h-[40vh] md:h-[75vh] w-[90vw] md:w-[70vw] shadow-[#AF81FF] shadow-md border-solid border-3 border-black backdrop-blur-md mb-4 md:mb-0"
          >
            <img src="/Image1.jpeg" alt="" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            className="h-[40vh] md:h-[50vh] w-[90vw] md:w-[20vw] transparent relative md:absolute flex flex-col md:bottom-1/15 md:right-1/10 backdrop-blur-md md:mr-8 border-1 border-blue-400/50 p-4 md:p-2"
            initial={{ opacity: 0, translateY: 400 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{amount:0}}
          >
            <div className="h-[30%] md:h-[20%] flex justify-center items-center">
              <p className="text-white text-xl md:text-2xl lg:text-3xl text-center font-thin">
                WHAT MAKES US DIFFERENT
              </p>
            </div>
            <div className="h-[70%] md:h-[80%] flex justify-center items-center">
              <p className="text-white text-center text-sm md:text-base lg:text-lg">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates modi fuga, inventore saepe in sit voluptas. Sunt eos,
                adipisci delectus, sit blanditiis, soluta ipsum facere modi
                laboriosam labore neque corrupti. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quaerat, eveniet. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Id, ratione!
              </p>
            </div>
          </motion.div>
        </div>
      </Orb>
    </div>
  );
}

export default SecondPage;

{
  /*  */
}
