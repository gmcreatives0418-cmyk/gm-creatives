import { Routes, Route, useLocation } from 'react-router-dom';
import { ContactModalProvider } from './contexts/ContactModalContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ServicesPage from './pages/ServicesPage';
import ServicesDetailPage from './pages/ServicesDetailPage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isWork = location.pathname === '/work';
  const isServices = location.pathname === '/services';

  return (
    <ContactModalProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ServicesPage />} />
          <Route path="/services" element={<ServicesDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/case-study/:slug" element={<CaseStudyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      {(isHome || isWork || isServices) && <ContactModal />}
    </ContactModalProvider>
  );
}
