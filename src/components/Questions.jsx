import LabelSelect from "./LabelSelect";
import { useState, useEffect } from "react";

export default function Questions({ onSuccess, showToast }) {

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Melvin95/goofy_chica_things/refs/heads/main/questions.json")
      .then(res => res.json())
      .then(data => setQuestions(data.questions))
      .catch(err => console.error("Error loading questions:", err));
  }, []);

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {

    const allCorrect = questions.every(q => answers[q.id] === q.answer);

    if (allCorrect) {
      showToast("💖 You are my Sivheyyyyyyyyyy!");
      onSuccess();
    } else {
      showToast("😈 You're not my Sivheyyyyyyyyyy!");
    }
  };

  return (
    <div id="questionSection" className="question-section">
      <h2>💌 Prove to me that you're Siveshneee 💌</h2>
      {questions.map((q) => (
        <LabelSelect
          key={q.id}
          label={q.text}
          value={answers[q.id] || ""}
          onChange={(val) => handleChange(q.id, val)}
          options={q.options}
          hintText={q.hint}
        />
      ))}
      <button className="btn" onClick={handleSubmit}>
        Unlock 💝
      </button>
    </div>
  );
}
