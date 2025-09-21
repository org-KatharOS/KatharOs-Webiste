import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
      <div
        className='relative h-screen w-full flex flex-col items-center justify-center text-white'
        style={{
          backgroundImage: "url('PICTURE.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0 bg-black backdrop-blur-sm"
          style={{
            opacity:0.8
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-start gap-2 px-4 max-w-4xl">
          <h1 className="text-7xl md:text-8xl font-bold tracking-wide font-playfair">
            KATHAROS
          </h1>

          <p className="text-xl md:text-2xl font-light font-playfair mb-36 max-w-fit ">
            Securely <span className="text-[#E4702F] font-semibold">Wipe</span> Your
            Disk With Ease
          </p>
          <Link
            to="/about"
            className="rainbow-border px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-xl text-white shadow-2xl transition hover:bg-white/30 hover:shadow-3xl flex flex-col items-start text-left font-playfair border-2 border-transparent"
          >
            <span className="font-semibold">About Katharos</span>
            <span className="text-sm opacity-80">Read more about our vision →</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
