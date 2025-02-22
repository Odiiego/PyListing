import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './pages/signin/Signin';
import Home from './pages/home/home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}
