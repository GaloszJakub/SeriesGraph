import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import TvShowPage from "./components/TvShowPage/TvShowPage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/show/:id" element={<TvShowPage />} />
            </Routes>
        </Router>
    );
}

export default App;
