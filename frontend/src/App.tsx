import { Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Pages/SignUp";
import DashBoard from "./Pages/DashBoard";

function App() {
  
  return (
    <>
      <Routes>
        <Route path = "/" element={< LoginPage />} />
        <Route path = "/signup" element={< SignUp />} />
        <Route path = "/dashboard" element={< DashBoard />} />
      </Routes>
    </>
  )
}

export default App