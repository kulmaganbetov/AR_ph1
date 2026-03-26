import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="card">
      <h2>Physics AR оқу платформасы</h2>
      <p>
        Бұл қосымшада 4 зертхана, қысқа теория, тест және AR/3D көру режимі бар.
      </p>
      <Link className="btn" to="/labs">
        Зертханаларды бастау
      </Link>
    </section>
  );
}

export default Home;
