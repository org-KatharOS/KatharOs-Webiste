import React from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function ThirdPage() {
  const cardData = [
    {
      imgSrc: "/moon.jpg",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      imgSrc: "/moon.jpg",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
  ];
  return (
    <div className="w-full min-h-screen p-4 md:p-8 mt-[10vh] relative flex flex-col justify-start items-center ">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ amount: 0 }}
        className="w-full max-w-7xl px-4 md:px-8 lg:px-[10vh] flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 mb-12 md:mb-16"
      >
        {/* text part */}
        <div className="w-full md:w-[60%] text-center md:text-left">
          <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            <span className="font-bold text-2xl md:text-4xl">
              Erase With Confidence.{" "}
            </span>
            See how Katharos makes your data truly disappear.
          </h1>
          <p className="text-sm md:text-xl mt-4 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            dolore enim suscipit nulla voluptas dolorum in, molestiae quo et
            voluptate nemo? Ullam maiores autem voluptates omnis quibusdam
            explicabo distinctio. Enim, magnam aliquid deserunt molestiae natus
            eveniet iusto! Voluptate, voluptas laborum.
          </p>
        </div>
        {/* button part */}
        <Link
          to="/docs"
          className="bg-gradient-to-r from-blue-400 to-purple-400 px-6 py-3 rounded-lg text-white text-lg md:text-xl font-bold whitespace-nowrap"
        >
          Documentation
        </Link>
      </motion.div>

      <div className="w-full max-w-7xl  flex flex-col md:flex-row justify-center gap-8 md:gap-[5vw] items-center mb-8 md:mb-12">
        {cardData.map((card, index) => (
          <motion.div
            key={`first-${index}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            viewport={{ amount: 0 }}
          >
            <Cards
              imageSrc={card.imgSrc}
              altText="Tilted card image"
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              content={card.content}
            />
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-7xl  flex flex-col md:flex-row justify-center gap-8 md:gap-[5vw] items-center mb-8 md:mb-12">
        {cardData.map((card, index) => (
          <motion.div
            key={`first-${index}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            viewport={{ amount: 0 }}
          >
            <Cards
              imageSrc={card.imgSrc}
              altText="Tilted card image"
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              content={card.content}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ThirdPage;
