import ARScene from '../ar/ARScene';

function ARPage() {
  return (
    <section className="card ar-page">
      <h2>AR зертхана</h2>
      <p className="overlay">Ohm’s Law Demo</p>
      <ARScene />
      <p className="hint">Hiro маркерін камераға көрсетіңіз.</p>
    </section>
  );
}

export default ARPage;
