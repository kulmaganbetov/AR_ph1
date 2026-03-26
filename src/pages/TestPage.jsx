import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLabById } from '../data/labs';

function TestPage() {
  const { labId } = useParams();
  const lab = getLabById(labId);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  if (!lab) return <p className="card">Тест табылмады.</p>;

  const submit = () => {
    const score = lab.questions.reduce(
      (sum, question, index) => sum + (answers[index] === question.correctIndex ? 1 : 0),
      0
    );

    navigate(`/labs/${lab.id}/result`, {
      state: {
        score,
        total: lab.questions.length,
        answers,
        questions: lab.questions
      }
    });
  };

  return (
    <section className="card">
      <h2>{lab.title} — Тест</h2>
      {lab.questions.map((question, index) => (
        <div key={question.question} className="question-block">
          <p>
            {index + 1}. {question.question}
          </p>
          <div className="options">
            {question.options.map((option, optionIndex) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  checked={answers[index] === optionIndex}
                  onChange={() => setAnswers((prev) => ({ ...prev, [index]: optionIndex }))}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button className="btn" onClick={submit}>
        Нәтижені көру
      </button>
    </section>
  );
}

export default TestPage;
