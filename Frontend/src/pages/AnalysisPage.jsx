import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getCvAnalysis } from "../store/slices/cvSlice";
import CvSummary from "../components/analysis/CvSummary";
import CvContact from "../components/analysis/CvContact";
import CvAtsScore from "../components/analysis/CvAtsScore";
import CvSkills from "../components/analysis/CvSkills";
import CvExperience from "../components/analysis/CvExperience";
import CvEducation from "../components/analysis/CvEducation";
import CvProjects from "../components/analysis/CvProjects";
import CvQuestions from "../components/analysis/CvQuestions";

export default function AnalysisPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.cv);

  useEffect(() => {
    dispatch(getCvAnalysis());
  }, []);

  if (loading) return (
    <>
      <Navbar />
      <div className="an-loading">
        <div className="spinner-border" style={{ color: "var(--g1)" }} />
        <p>Analyzing your CV...</p>
      </div>
    </>
  );

  if (error) return (
    <>
      <Navbar />
      <div className="an-error">
        <p>{error}</p>
        <button className="btn" onClick={() => dispatch(getCvAnalysis())}>Try Again</button>
      </div>
    </>
  );

  if (!data) return null;

  return (
    <>
      <Navbar />
      <div className="an-page container">

        {/* Row 1: Summary + Contact */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <CvSummary data={data} />
          </div>
          <div className="col-md-6">
            <CvContact contact={data.contact} />
          </div>
        </div>

        {/* ATS Score */}
        <CvAtsScore ats={data.ats_score} />

        {/* Skills + Chart */}
        <CvSkills skills={data.skills} ats={data.ats_score} />

        {/* Experience */}
        <CvExperience experience={data.experience} />

        {/* Education */}
        <CvEducation education={data.education} />

        {/* Projects */}
        <CvProjects projects={data.projects} />

        {/* Interview Questions */}
        <CvQuestions questions={data.suggested_interview_questions} />

        {/* CTA */}
        <div className="an-cta">
          <button className="an-btn-primary" onClick={() => navigate("/interview")}>
            <i className="fa-solid fa-clipboard-question"></i> Start Interview
          </button>
          <button className="an-btn-secondary" onClick={() => window.print()}>
            <i className="fas fa-file-download"></i> Download Report
          </button>
        </div>

      </div>
    </>
  );
}
