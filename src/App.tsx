import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/LandingPage';
import CompilerPage from './pages/ImageCompiler';
import ImagePage from './pages/ImageTracking';
import FacePage from './pages/FaceTracking';
import MainLayout from './components/MainLayout';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/react-ar/face-tracking" element={<FacePage />} />
          <Route path="/react-ar/image-tracking" element={<ImagePage />} />
          <Route path="/react-ar/image-compiler" element={<CompilerPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
