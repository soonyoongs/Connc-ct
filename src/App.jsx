import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import NavBar from './components/NavBar.jsx';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Activities from './pages/Activities.jsx';
import FindPeers from './pages/FindPeers.jsx';
import IndicateInterest from './pages/IndicateInterest.jsx';

function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/auth/LogIn" element={<LogIn />} />
        <Route path="/auth/SignUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pref" element={<IndicateInterest />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/find-peers" element={<FindPeers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;