// data/featuresData.js
import AIInterviewContent from "../components/features/AIInterviewContent";
import CVAnalysisContent from "../components/features/CVAnalysisContent";
import SkillMatchingContent from "../components/features/SkillMatchingContent";
import ProgressTrackingContent from "../components/features/ProgressTrackingContent";
import VoicePracticeContent from "../components/features/VoicePracticeContent";
import PersonalityInsightsContent from "../components/features/PersonalityInsightsContent";
import LearningResourcesContent from "../components/features/LearningResourcesContent";
import QuickRecommendationsContent from "../components/features/QuickRecommendationsContent";

const featuresData = {
  aiInterview: {
    title: "AI Interview Prep",
    description:
      "Practice interviews with real-time AI feedback. Get your answers analyzed instantly.",
    bgClass: "bg-ai",
    content: <AIInterviewContent />,
  },
  cvAnalysis: {
    title: "Smart CV Analysis",
    description:
      "Upload your CV and get instant AI insights to make it perfect.",
    bgClass: "bg-cv",
    content: <CVAnalysisContent />,
  },
  skillMatching: {
    title: "Skill Matching",
    description:
      "Get AI insights on how well your skills match the job requirements.",
    content: <SkillMatchingContent />,
  },
  progressTracking: {
    title: "Progress Tracking",
    description:
      "Track your interview preparation progress over time. Every time you take a mock interview or study, see your progress improve with smooth animation.",
    content: <ProgressTrackingContent />,
  },
  voicePractice: {
    title: "Voice Practice",
    description:
      "Practice speaking and get AI feedback on your tone and pronunciation.",
    bgClass: "bg-voice",
    content: <VoicePracticeContent />,
  },
  personalityInsights: {
    title: "Personality Insights",
    description:
      "AI evaluates your tone, presence, and personality for interview improvement.",
    content: <PersonalityInsightsContent />,
  },
  learningResources: {
    title: "Learning Resources",
    description: "Access guides and tips tailored to your job field.",
    content: <LearningResourcesContent />,
  },
  quickRecommendations: {
    title: "Quick Recommendations",
    description: "Instant tips to help you improve before interviews.",
    content: <QuickRecommendationsContent />,
  },
};

export default featuresData;
