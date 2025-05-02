

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AssignedTickets.module.css";
import Sidebar from "../Components/Sidebar";

const AssignedTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem("token"); // Fetch token from localStorage
                const adminEmail = localStorage.getItem("adminEmail");
                if (!adminEmail) {
                    setError("No admin email found in local storage.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/assigned/${adminEmail}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`, // Add token for authorization
                    },
                });

                if (response.status === 200) {
                    const ticketsData = Array.isArray(response.data.tickets) ? response.data.tickets : [];
                    setTickets(ticketsData);
                } else {
                    setError("Failed to fetch tickets.");
                }
            } catch (err) {
                console.log("Error", err);
                setError("Something went wrong while fetching tickets.");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) return <p>Loading tickets...</p>;
    if (error) return <p>{error}</p>;


    const filteredTickets = tickets.filter((ticket) => {
        const matchesTab = activeTab === "all" || ticket.status === activeTab;
        const matchesSearch =
            (ticket.ticketNumber && ticket.ticketNumber.toString().includes(searchQuery)) ||
            (ticket.customer?.name && ticket.customer?.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (ticket.customer?.email && ticket.customer?.email.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesTab && matchesSearch;
    });

    return (
        <div className={styles.AssignedTicketsWrapper}>
            <Sidebar />
            <div className={styles.ticketspanel}>
                <div className={styles.header}>
                    <h3>Dashboard</h3>
                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            placeholder="Search for ticket"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button
                        className={activeTab === "all" ? styles.activeTab : ""}
                        onClick={() => setActiveTab("all")}
                    >
                        All Tickets
                    </button>
                    <button
                        className={activeTab === "resolved" ? styles.activeTab : ""}
                        onClick={() => setActiveTab("resolved")}
                    >
                        Resolved
                    </button>
                    <button
                        className={activeTab === "unresolved" ? styles.activeTab : ""}
                        onClick={() => setActiveTab("unresolved")}
                    >
                        Unresolved
                    </button>
                </div>
                <hr style={{ border: "1px solid #E7E7E7", width: "80vw", marginLeft: "2vw" }} />
                <div className={styles.ticketsList}>
                    {filteredTickets.length === 0 ? (
                        <p>No tickets to show.</p>
                    ) : (
                        filteredTickets.map((ticket) => (
                            <div key={ticket._id} className={styles.ticketCard}>
                                <div className={styles.ticketHeader}>
                                    <div className={styles.ticketId}>
                                        Ticket# {ticket.ticketNumber || ticket._id}
                                    </div>
                                    <div className={styles.ticketTime}>
                                        Posted at {new Date(ticket.createdAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                </div>
                                <div className={styles.ticketBody}>
                                    <p>
                                        {ticket.messages && ticket.messages.length > 0
                                            ? ticket.messages[ticket.messages.length - 1].content
                                            : "No message"}
                                    </p>
                                </div>
                                <hr style={{ border: "1px solid #E7E7E7", width: "80vw", marginLeft: "2vw" }} />
                                <div className={styles.ticketFooter}>
                                    <div className={styles.customerInfo}>
                                        <img
                                            src="/images/avatar.webp"
                                            alt="Customer Avatar"
                                        />
                                        <div>
                                            <div className={styles.customerName}>{ticket.customer?.name || "Unknown"}</div>
                                            <div className={styles.customerPhone}>
                                                {ticket.customer?.phone || ""}
                                            </div>
                                            <div className={styles.customerEmail}>
                                                {ticket.customer?.email || ""}
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        href={`/ticket/${ticket._id}`}
                                        className={styles.openTicketLink}
                                    >
                                        Open Ticket
                                    </a>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignedTickets;
