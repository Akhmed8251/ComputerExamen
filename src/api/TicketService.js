import axios from "axios";
import { API_URL } from "./config";

export default class TicketService {
    static async getTicketsByExamenId(id) {
        const response = await axios.get(`${API_URL}/Ticket/GetTicketsByExamenId`, {
            params: {
                examenId: id
            },
            withCredentials: true
        })
        return response;
    }

    static async deleteTicket(id) {
        const response = await axios.delete(`${API_URL}/Ticket/DeleteTicket`, {
            params: {
                id: id
            },
            withCredentials: true
        })
        return response;
    }
}