import { useParams } from 'react-router-dom';
import ARViewWithFallback from '../ar/ARViewWithFallback';
import { getLabById } from '../data/labs';

function ARView() {
  const { labId } = useParams();
  const lab = getLabById(labId);

  if (!lab) return <p className="card">AR зертхана табылмады.</p>;

  return (
    <section className="card">
      <h2>{lab.title} — AR / 3D</h2>
      <p className="overlay">Ohm’s Law Demo</p>
      <ARViewWithFallback modelType={lab.modelType} />
      <ul className="ar-checklist">
        <li>HTTPS қосулы болуы керек</li>
        <li>Камера рұқсатын беріңіз</li>
        <li>Hiro маркерді жарық жерде ұстаңыз</li>
      </ul>
    </section>
  );
}

export default ARView;
