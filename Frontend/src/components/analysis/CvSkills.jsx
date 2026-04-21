import { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";

export default function CvSkills({ skills, ats }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  const matched = ats?.matched_skills || [];
  const missing = ats?.missing_skills || [];
  
  // كل السكيلز من الـ API
  const allSkills = Object.entries(skills || {})
  .filter(([, vals]) => vals?.length > 0);
  
  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();
    
    // const Chart = window.Chart;
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
    if (!Chart) return;
    
    chartInstance.current = new Chart(chartRef.current.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Matched", "Missing"],
        datasets: [{
          data: [matched.length, missing.length],
          backgroundColor: ["#3dbf8a", "#e05c5c"],
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        cutout: "70%",
        plugins: {
          legend: { position: "bottom" },
        },
        animation: { animateRotate: true, duration: 1500 },
      },
    });

    return () => chartInstance.current?.destroy();
  }, [matched, missing]);

  return (
    <div className="row g-4 mb-4">

      {/* Skills List */}
      <div className="col-md-6">
        <div className="an-card h-100">
          <h5 className="an-card-title">Skills Overview</h5>

          {/* Matched */}
          <div className="an-skills-row mb-3">
            <span className="an-skills-label an-green">
              <i className="fas fa-check-circle me-1"></i> Matched
            </span>
            <div className="an-badges">
              {matched.map((s, i) => (
                <span key={i} className="an-badge an-badge-matched">{s}</span>
              ))}
            </div>
          </div>

          {/* Missing */}
          <div className="an-skills-row mb-3">
            <span className="an-skills-label an-red">
              <i className="fas fa-times-circle me-1"></i> Missing
            </span>
            <div className="an-badges">
              {missing.map((s, i) => (
                <span key={i} className="an-badge an-badge-missing">{s}</span>
              ))}
            </div>
          </div>

          {/* All Skills by category */}
          {allSkills.map(([category, vals]) => (
            <div key={category} className="an-skills-row mb-2">
              <span className="an-skills-label an-muted">
                {category.replace("_", " ")}
              </span>
              <div className="an-badges">
                {vals.map((s, i) => (
                  <span key={i} className="an-badge an-badge-default">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="col-md-6">
        <div className="an-card h-100 d-flex flex-column align-items-center justify-content-center">
          <h5 className="an-card-title">Skill Match Chart</h5>
          <canvas ref={chartRef} style={{ maxWidth: 250, maxHeight: 250 }} />
        </div>
      </div>

    </div>
  );
}
