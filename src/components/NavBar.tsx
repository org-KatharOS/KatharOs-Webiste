import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="h-[8vh] z-10 rounded-4xl border border-white/20 w-[70vw] bg-white/10 backdrop-blur-md shadow-lg backdrop-saturate-150 backdrop-filter-lg fixed self-center mt-[4vh]">
      <div className="h-full w-full flex justify-between items-center px-8">
        <Link to="/" className="text-2xl font-bold text-white">
          KatharOs
        </Link>
        <div className="flex justify-between items-center">
          <div className="text-white mx-4">Home</div>
          <div className="text-white mx-4">Docs</div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
