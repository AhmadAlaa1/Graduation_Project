import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/HomePage";
import Features from "./pages/FeaturePage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top"
        reverseOrder={false}
      />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feature" element={<Features />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/analysis-cv" element={<AnalysisCv />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
