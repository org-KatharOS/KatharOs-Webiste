import LiquidEther from "./Backgrounds/LiquidEther";

function FirstPage() {
  return (
    <div className="h-[100vh] w-full  bg-[#070715]">
      <LiquidEther
        colors={["#422A83", "#9E4AF2", "#b19eef"]}
        mouseForce={20}
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
      />
    </div>
  );
}

export default FirstPage;
