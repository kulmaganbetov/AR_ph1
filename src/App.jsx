import { NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LabPage from './pages/LabPage';
import ARPage from './pages/ARPage';
import AIChatPage from './pages/AIChatPage';

function App() {
  return (
    <div className="app-shell">
      <header>
        <h1>Physics AR</h1>
        <nav>
          <NavLink to="/">Басты бет</NavLink>
          <NavLink to="/lab">Зертхана</NavLink>
          <NavLink to="/ar">AR</NavLink>
          <NavLink to="/ai">AI</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/ar" element={<ARPage />} />
          <Route path="/ai" element={<AIChatPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
