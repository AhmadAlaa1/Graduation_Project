
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import featuresData from "../data/featuresData";

export default function FeaturePage() {
  const featureKey = localStorage.getItem("currentFeature");

  useEffect(() => {
    // if (!localStorage.getItem("currentUser")) {
    //   window.location.href = "login.html";
    // }
  }, []);

  const feature = featuresData[featureKey];

  return (
    <>
      {/* <div className="features-container"> */}

        <Navbar />
        <main className="features-main">
          <div className="feature-content container special-bg">
            {feature ? (
              <>
                <div className="text-center">
                  <h1 className="feature-title display-4">{feature.title}</h1>
                  <p className="feature-desc fs-5">{feature.description}</p>
                </div>
                <div className="row justify-content-center align-items-center g-4 mt-3">
                  {feature.content}
                </div>
              </>
            ) : (
              <div className="text-center">
                <h1 className="feature-title display-4">Feature Not Found</h1>
                <p className="feature-desc fs-5 mt-3">
                  Please go back and select a valid feature.
                </p>
              </div>
            )}
          </div>
        </main>
      {/* </div> */}
    </>
  );
}
