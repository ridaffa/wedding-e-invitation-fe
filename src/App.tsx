import './App.css';
import { Route, Routes } from 'react-router-dom';
import MobileConsumer from './contexts/MobileContext';
import InvitationPage from './pages/InvitationPage/InvitationPage';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage/LoginPage';
import LandingPage from './pages/LandingPage/LandingPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

function App() {
  const MobileContext = MobileConsumer();
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      if (!MobileContext.mobile) {
        MobileContext.setMobile?.(true);
      }
    } else {
      if (MobileContext.mobile) {
        MobileContext.setMobile?.(false);
      }
    }
  });
  return (
    <Routes>
      <Route>
        <Route path='/landing-page/:uuid' element={<LandingPage />} />
        <Route path='/invitation' element={<InvitationPage />} />{' '}
        <Route path='/admin' element={<LoginPage />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Route>
      <Route path='*' element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
