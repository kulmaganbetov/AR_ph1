import { Link } from 'react-router-dom';

function LabCard({ lab }) {
  return (
    <article className="lab-card">
      <h3>{lab.title}</h3>
      <p>{lab.formula}</p>
      <Link className="btn" to={`/labs/${lab.id}`}>
        Ашу
      </Link>
    </article>
  );
}

export default LabCard;
