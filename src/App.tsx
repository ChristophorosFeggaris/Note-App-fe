import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/Dashboard';
import Layout from './components/Layout';
import { Notes } from './pages/Notes';

function App() {

  return (
    <div className="App">
      <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
      </Layout> 
    </div>
  );
}

export default App;
