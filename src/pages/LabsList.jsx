import LabCard from '../components/LabCard';
import { labs } from '../data/labs';

function LabsList() {
  return (
    <section>
      <h2 className="section-title">Зертханалар</h2>
      <div className="labs-grid">
        {labs.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>
    </section>
  );
}

export default LabsList;
