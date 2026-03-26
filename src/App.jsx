import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LabsList from './pages/LabsList';
import LabDetail from './pages/LabDetail';
import ARView from './pages/ARView';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import ChatAI from './pages/ChatAI';

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>Physics AR</h1>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/labs" element={<LabsList />} />
          <Route path="/labs/:labId" element={<LabDetail />} />
          <Route path="/labs/:labId/ar" element={<ARView />} />
          <Route path="/labs/:labId/test" element={<TestPage />} />
          <Route path="/labs/:labId/result" element={<ResultPage />} />
          <Route path="/ai" element={<ChatAI />} />
        </Routes>
      </main>

      <nav className="bottom-nav">
        <NavLink to="/labs">Labs</NavLink>
        <NavLink to="/ai">AI</NavLink>
      </nav>
    </div>
  );
}

export default App;
