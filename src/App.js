import { Route, Routes } from 'react-router-dom';
import { Home, NotFound } from './pages';
function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
