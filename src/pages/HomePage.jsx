import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <section className="card">
      <h2>Physics AR</h2>
      <p>Физиканы AR арқылы үйренуге арналған қарапайым мобильді MVP қосымша.</p>
      <button onClick={() => navigate('/lab')}>Start Lab</button>
    </section>
  );
}

export default HomePage;
