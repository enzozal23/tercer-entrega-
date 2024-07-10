export default class TicketRepository {
    constructor(ticketDao) {
        this.ticketDao = ticketDao
    }
    createTicket = async (ticket) => await this.ticketDao.createTicket(ticket)
}