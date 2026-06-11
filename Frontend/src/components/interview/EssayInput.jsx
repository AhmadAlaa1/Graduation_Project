import { useTranslation } from "react-i18next";

export default function EssayInput({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <textarea
      className="quiz-int-textarea"
      placeholder={t('essay_input.placeholder')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={5}
    />
  );
}