import { Route, Routes } from "react-router-dom"
import LandingPage from "../pages/LandingPage"

export const Routers = () => {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
        </Routes>
    )
}