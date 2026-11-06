import { Routes, Route } from 'react-router-dom';
import { ContactModalProvider } from './contexts/ContactModalContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingIcon from './components/FloatingIcon';
import ContactModal from './components/ContactModal';
import ServicesPage from './pages/ServicesPage';
import ServicesDetailPage from './pages/ServicesDetailPage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ContactPage from './pages/ContactPage';

export default function App() {
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
      <FloatingIcon />
      <ContactModal />
    </ContactModalProvider>
  );
}
