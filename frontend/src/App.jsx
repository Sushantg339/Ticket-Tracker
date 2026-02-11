import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import Signup from "./pages/Signup";
import UpdateTicket from "./pages/UpdateTicket";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ticket/:id" element={<ProtectedRoutes><UpdateTicket /></ProtectedRoutes>} />
        <Route path="/" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />

        <Route path="/create" element={<ProtectedRoutes><CreateTicket /></ProtectedRoutes>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
