import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './Components/Navbar';
import Homepage from './Components/Homepage';
import Contact from './Components/Contact';
import Resume from './Components/Resume';
import TextEditor from './Components/TextEditor';
import Alert from './Components/Alert';
import FileImporter from './Components/FileImporter';


function App() {
  const [editorContent, setEditorContent] = useState('');
  const [mode, setMode] = useState('light'); // Global dark mode state
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, msg: message });
    setTimeout(() => setAlert(null), 2000);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      showAlert('success', 'Dark Mode has been Enabled');
      document.title = "Bliz - Darkmode";
      setInterval(() => { document.title = "Bliz - Amazing" }, 2000);
    } else {
      setMode('light');
      showAlert('success', 'Light Mode has been Enabled');
      document.title = "Bliz - Lightmode";
      setInterval(() => { document.title = "Bliz - wonderful" }, 1500);
    }
  };

  useEffect(() => {
    document.body.className = mode === 'dark' ? 'dark-mode' : 'light-mode';
  }, [mode]);

  return (
    <Router>
      <Navbar title="Fury" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      {/* <FileImporter onImport={(text) => setEditorContent(text)} /> */}
      {/* <FileImporter onImport={(text) => console.log("Imported text:", text)} /> */}
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/Resume" element={<Resume />} />
        <Route exact path="/TextEditor" element={<TextEditor showAlert={showAlert} heading="TextBx" />} />
        <Route exact path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;