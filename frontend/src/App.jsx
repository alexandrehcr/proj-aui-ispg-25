import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import Auth from "./pages/Auth/Auth";
import DearMe from "./pages/Feed/DearMe";
import ProfileForm from "./pages/components/ProfileForm";
import SettingsPage from "./pages/components/SettingsPage";
import Conta from "./pages/components/Conta";
import ProfileDropdown from "./pages/components/ProfileDropdown"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/feed" element={<DearMe />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/conta" element={<Conta />} />
      </Routes>
    </Router>
  );
}
export default App;
