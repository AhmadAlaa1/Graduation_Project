// data/featuresData.js
import i18n from "i18next";
import AIInterviewContent from "../components/features/AIInterviewContent";
import CVAnalysisContent from "../components/features/CVAnalysisContent";
import SkillMatchingContent from "../components/features/SkillMatchingContent";
import ProgressTrackingContent from "../components/features/ProgressTrackingContent";
import VoicePracticeContent from "../components/features/VoicePracticeContent";
import PersonalityInsightsContent from "../components/features/PersonalityInsightsContent";
import QuickRecommendationsContent from "../components/features/QuickRecommendationsContent";

// دالة مساعدة لضمان جلب النص المترجم المحدث دائماً في وقت التشغيل
const getFeatureTranslation = (key, type) => {
  return i18n.t(`features_data.${key}.${type}`);
};

const featuresData = {
  aiInterview: {
    get title() { return getFeatureTranslation('aiInterview', 'title'); },
    get description() { return getFeatureTranslation('aiInterview', 'description'); },
    bgClass: "bg-ai",
    content: <AIInterviewContent />,
  },
  cvAnalysis: {
    get title() { return getFeatureTranslation('cvAnalysis', 'title'); },
    get description() { return getFeatureTranslation('cvAnalysis', 'description'); },
    bgClass: "bg-cv",
    content: <CVAnalysisContent />,
  },
  cvBuilder: {
    get title() { return getFeatureTranslation('cvBuilder', 'title'); },
    get description() { return getFeatureTranslation('cvBuilder', 'description'); },
  },
  skillMatching: {
    get title() { return getFeatureTranslation('skillMatching', 'title'); },
    get description() { return getFeatureTranslation('skillMatching', 'description'); },
    content: <SkillMatchingContent />,
  },
  progressTracking: {
    get title() { return getFeatureTranslation('progressTracking', 'title'); },
    get description() { return getFeatureTranslation('progressTracking', 'description'); },
    content: <ProgressTrackingContent />,
  },
  voicePractice: {
    get title() { return getFeatureTranslation('voicePractice', 'title'); },
    get description() { return getFeatureTranslation('voicePractice', 'description'); },
    bgClass: "bg-voice",
    content: <VoicePracticeContent />,
  },
  personalityInsights: {
    get title() { return getFeatureTranslation('personalityInsights', 'title'); },
    get description() { return getFeatureTranslation('personalityInsights', 'description'); },
    content: <PersonalityInsightsContent />,
  },
  quickRecommendations: {
    get title() { return getFeatureTranslation('quickRecommendations', 'title'); },
    get description() { return getFeatureTranslation('quickRecommendations', 'description'); },
    content: <QuickRecommendationsContent />,
  },
};

export default featuresData;