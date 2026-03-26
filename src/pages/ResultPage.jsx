import { Link, useLocation, useParams } from 'react-router-dom';
import { getLabById } from '../data/labs';

function ResultPage() {
  const { labId } = useParams();
  const lab = getLabById(labId);
  const { state } = useLocation();

  if (!lab || !state) {
    return (
      <section className="card">
        <p>Нәтиже жоқ. Алдымен тестті өтіңіз.</p>
        <Link className="btn" to={`/labs/${labId}/test`}>
          Тестке өту
        </Link>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Нәтиже: {lab.title}</h2>
      <p>
        Ұпай: <strong>{state.score}</strong> / {state.total}
      </p>
      <h3>Дұрыс жауаптар</h3>
      <ul>
        {state.questions.map((question, index) => (
          <li key={question.question}>
            {index + 1}. {question.options[question.correctIndex]}
          </li>
        ))}
      </ul>
      <Link className="btn" to={`/labs/${lab.id}`}>
        Зертханаға қайту
      </Link>
    </section>
  );
}

export default ResultPage;
