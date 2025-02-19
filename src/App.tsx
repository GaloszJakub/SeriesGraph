import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import TvShowPage from "./components/TvShowPage/TvShowPage";
import ScrollToTop from "./components/ScrollToTop";


function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/show/:id" element={<TvShowPage />} />
            </Routes>
        </Router>
    );
}

export default App;
