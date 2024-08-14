// import RegistrationForm from "./components/registerUser"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/registerUser';
import AdminDashboard from './components/adminDashboard';
import EditUsers from './components/editUser'; // Create this component
import DrawWinners from './components/drawResult'; // Create this component
import AdminLogin from './components/adminLogin';

export default function App() {
  return (
    // <RegistrationForm/>
    <Router>
            <Routes>
                <Route path="/" element={<RegistrationForm />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/edit-users" element={<EditUsers />} />
                <Route path="/draw-winners" element={<DrawWinners />} />
                <Route path="/admin-login" element={<AdminLogin />} />
            </Routes>
        </Router>
  )
}