import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage';
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota principal (Home) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rota de Autenticação - Recomendado usar minúsculas */}
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;