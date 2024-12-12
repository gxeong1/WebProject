import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilsaPage from './components/FilsaPage';
import SaveImagePage from './components/SaveImagePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FilsaPage />} />
        <Route path="/save-image" element={<SaveImagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
