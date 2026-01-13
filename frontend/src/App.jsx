import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage';
import Auth from './pages/Auth/Auth';
import Dearme from './pages/Feed/DearMe'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota principal (Home) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rota de Autenticação - Recomendado usar minúsculas */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/Feed" element={<Dearme />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;