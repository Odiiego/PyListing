import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './pages/signin/SignIn';
import Home from './pages/home/Home';
import SignUp from './pages/signup/Signup';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
