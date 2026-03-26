import { Link, useParams } from 'react-router-dom';
import { getLabById } from '../data/labs';

function LabDetail() {
  const { labId } = useParams();
  const lab = getLabById(labId);

  if (!lab) return <p className="card">Зертхана табылмады.</p>;

  return (
    <section className="card">
      <h2>{lab.title}</h2>
      <p>{lab.theory}</p>
      <div className="formula">{lab.formula}</div>
      <div className="actions">
        <Link className="btn" to={`/labs/${lab.id}/ar`}>
          Open AR
        </Link>
        <Link className="btn secondary" to={`/labs/${lab.id}/test`}>
          Start Test
        </Link>
        <Link className="btn ghost" to={`/ai?lab=${lab.id}`}>
          Ask AI
        </Link>
      </div>
    </section>
  );
}

export default LabDetail;
