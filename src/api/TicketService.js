import axios from "axios";
import { API_URL } from "./config";

export default class TicketService {
    static async deleteTicket(id) {
        const response = await axios.delete(`${API_URL}/Ticket/DeleteTicket`, {
            params: {
                id: id
            }
        })
        return response;
    }
}