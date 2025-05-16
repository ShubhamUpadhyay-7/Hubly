import './App.css'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignUp';
import MainPage from './Pages/MainPage';
import ContactCenterPage from './Pages/ContactCenterPage';
import AssignedTickets from './Pages/AssignedTickets';
import TicketDashboard from './Pages/TicketDashboard';
import AllTeamPage from './Pages/AllTeamPage';
import ChatbotConfigPage from './Pages/ChatbotConfigPage';
import AnalyticsPage from './Pages/AnalyticsPage';
import EditProfile from './Pages/EditProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/contactcenter" element={<ContactCenterPage />} />
        <Route path="/assignedTickets" element={<AssignedTickets />} />
        <Route path="/ticket/:ticketId" element={<TicketDashboard />} />
        <Route path="/TicketDashboard" element={<TicketDashboard />} />
        <Route path="/AllTeamPage" element={<AllTeamPage />} />
        <Route path="/ChatbotConfigPage" element={<ChatbotConfigPage />} />
        <Route path="/Analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<EditProfile />} />
      </Routes>
    </Router>
  )
}

export default App
