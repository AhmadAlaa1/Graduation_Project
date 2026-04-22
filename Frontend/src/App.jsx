import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/HomePage";
import Features from "./pages/FeaturePage";
import ProfilePage from "./pages/ProfilePage";
import InterviewPage from "./pages/InterviewPage";
import AnalysisPage from "./pages/AnalysisPage";
import MyInterviewsPage from "./pages/MyInterviewsPage";
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
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/analysis-cv" element={<AnalysisPage />} />
        <Route path="/my-interviews" element={<MyInterviewsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
