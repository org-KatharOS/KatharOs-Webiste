import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom' 
import './index.css'
import App from './App.tsx'
import Navbar from "./components/Navbar.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <App />
  </BrowserRouter>
  </React.StrictMode>
)

