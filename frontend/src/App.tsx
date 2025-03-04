import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Signin from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import List from './pages/list/List';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/list/:id" element={<ProtectedRoute component={List} />} />
      </Routes>
    </BrowserRouter>
  );
}
