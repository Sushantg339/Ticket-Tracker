import { useNavigate } from "react-router-dom";

const TicketCard = ({ ticket }) => {
    const navigate = useNavigate()
  return (
    <div className="border rounded-lg p-4 bg-white shadow" onClick={()=>{navigate(`/ticket/${ticket._id}`)}}>
      <h3 className="font-semibold">{ticket.title}</h3>
      <p className="text-sm text-gray-600">{ticket.description}</p>

      <div className="flex justify-between mt-2 text-sm">
        <span>Status: {ticket.status}</span>
        <span>Priority: {ticket.priority}</span>
      </div>
    </div>
  );
};

export default TicketCard;
