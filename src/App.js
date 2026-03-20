import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";          
import Survey from "./pages/Survey.jsx";
import SectorJobs from "./pages/SectorJobs.jsx";
import CareerDetails from "./pages/CareerDetails.jsx";
import Signup from "./pages/Signup.jsx";
import SurveyResult from "./pages/SurveyResult.jsx";
import "./index.css";
import "./App.css";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/survey-result" element={<SurveyResult />} />

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/sector/:sector" element={<SectorJobs />} />
        <Route path="/career/:id" element={<CareerDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
