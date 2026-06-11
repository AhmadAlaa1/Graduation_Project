import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from "./routes/ProtectedRoute"

/* Pages - النظام الأساسي */
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/HomePage"
import Features from "./pages/FeaturePage"
import ProfilePage from "./pages/ProfilePage"
import InterviewPage from "./pages/InterviewPage"
import AnalysisPage from "./pages/AnalysisPage"
import MyInterviewsPage from "./pages/MyInterviewsPage"
import TeamPage from "./pages/TeamPage"

/* CV Module (الجديد) */
import DashboardPage from "./pages/DashboardPage"
import CVEditorPage from "./pages/CVEditorPage"

/* Floating Controls (زر اللغة والصعود) */
import FloatingControls from "./components/FloatingControls"

function App() {
  return (
    <>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= PROTECTED ================= */}
        <Route element={<ProtectedRoute />}>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Main app pages */}
          <Route path="/feature" element={<Features />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/analysis-cv" element={<AnalysisPage />} />
          <Route path="/my-interviews" element={<MyInterviewsPage />} />
          <Route path="/our-team" element={<TeamPage />} />

          {/* ================= CV BUILDER ================= */}
          <Route path="/cv-builder" element={<DashboardPage />} />
          <Route path="/cv-builder/new" element={<CVEditorPage />} />
          <Route path="/cv-builder/:id/edit" element={<CVEditorPage />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <FloatingControls />
    </>
  )
}

export default App