import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import TicketCard from "../components/TicketCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
    const navigate = useNavigate()
  useEffect(() => {
    api.get("/ticket").then(res => setTickets(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
        
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
            My Tickets
            </h1>

            <button
            onClick={() => navigate("/create")}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
            + Create Ticket
            </button>
        </div>

        {tickets.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500 text-lg">
                No tickets yet 🎫
            </p>
            <p className="text-sm text-gray-400 mt-2">
                Click “Create Ticket” to get started
            </p>
            </div>
        ) : (
            <div className="grid gap-4">
            {tickets.map(ticket => (
                <TicketCard key={ticket._id} ticket={ticket} />
            ))}
            </div>
        )}
        </div>
    </div>
    );

};

export default Dashboard;
