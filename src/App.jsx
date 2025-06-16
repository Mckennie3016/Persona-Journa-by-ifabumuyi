import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Form from './pages/Form'; 

import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Travel from "./pages/Travel";
import Work from "./pages/Work";
import Memories from "./pages/Memories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AIJournal from "./pages/APJ";


export default function App() {
 
  return (
    <Router>
  
      
      <Routes>
      <Route path="/forms" element={<Form/>}/>
     
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/work" element={<Work />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/apj" element={<AIJournal />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element= {<Contact/>}/>
      </Routes>
      

    </Router>
  );
}
