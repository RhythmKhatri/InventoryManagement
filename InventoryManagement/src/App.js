import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VariantButtonGroup from './libs/buttonGroup';
import Home from './components/Home';
import Dashboard from './components/DashBoard';
import PEInput from './components/PEInput';
import FieldInput from './components/FieldsInput';
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/peInput" element={<PEInput />} />
          <Route path="/fieldInput" element={<FieldInput />} />
        </Routes>
    </Router>
  );
}

export default App;
