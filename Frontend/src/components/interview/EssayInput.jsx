export default function EssayInput({ value, onChange }) {
  return (
    <textarea
      className="quiz-int-textarea"
      placeholder="Type your answer here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={5}
    />
  );
}