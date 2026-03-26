import { useNavigate } from 'react-router-dom';

function LabPage() {
  const navigate = useNavigate();

  return (
    <section className="card">
      <h2>Ом заңы зертханасы</h2>
      <p>
        Ом заңы электр тізбегіндегі кернеу, ток және кедергі арасындағы байланысты сипаттайды.
      </p>
      <p>Егер кедергі тұрақты болса, ток өскен сайын кернеу де өседі.</p>
      <div className="formula">V = I * R</div>
      <div className="row">
        <button onClick={() => navigate('/ar')}>Open AR</button>
        <button className="secondary" onClick={() => navigate('/ai')}>
          Ask AI
        </button>
      </div>
    </section>
  );
}

export default LabPage;
