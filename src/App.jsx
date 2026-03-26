import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LabsList from './pages/LabsList';
import LabDetail from './pages/LabDetail';
import ARView from './pages/ARView';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import ChatAI from './pages/ChatAI';
import HomePage from './pages/HomePage';
import LabPage from './pages/LabPage';
import ARPage from './pages/ARPage';
import AIChatPage from './pages/AIChatPage';

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
