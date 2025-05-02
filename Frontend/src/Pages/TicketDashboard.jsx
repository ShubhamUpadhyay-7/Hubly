
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TicketDashboard.module.css";
import Sidebar from "../Components/Sidebar";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const TicketDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);

    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [pendingAssignment, setPendingAssignment] = useState("");
    const [pendingStatus, setPendingStatus] = useState("");

    const adminEmail = localStorage.getItem("adminEmail");

    useEffect(() => {
        fetchTickets();
        fetchTeamMembers();
    }, []);

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/api/assigned/${adminEmail}`, {
                headers: getAuthHeaders(),
            });
            setTickets(res.data.tickets);
        } catch (error) {
            console.error("Error fetching tickets", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTeamMembers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/team-members", {
                headers: getAuthHeaders(),
            });
            setTeamMembers(res.data.teamMembers);
        } catch (error) {
            console.error("Error fetching team members", error);
        }
    };

    const selectTicket = async (ticketId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/ticket/${ticketId}`, {
                headers: getAuthHeaders(),
            });
            setSelectedTicket(res.data.ticket);
        } catch (error) {
            console.error("Error loading ticket details", error);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            await axios.post(
                `http://localhost:5000/api/ticket/${selectedTicket._id}/message`,
                {
                    sender: "Admin",
                    content: newMessage,
                },
                { headers: getAuthHeaders() }
            );
            setNewMessage("");
            selectTicket(selectedTicket._id);
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    const handleAssignChange = (email) => {
        setPendingAssignment(email);
        setShowAssignModal(true);
    };

    const confirmAssignment = async () => {
        await updateAssignedTo(pendingAssignment);
        setShowAssignModal(false);
    };

    const updateAssignedTo = async (newAssignedEmail) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/ticket/${selectedTicket._id}/assign`,
                {
                    assignedTo: newAssignedEmail,
                },
                { headers: getAuthHeaders() }
            );
            selectTicket(selectedTicket._id);
            fetchTickets();
        } catch (error) {
            console.error("Error updating assigned admin", error);
        }
    };

    const handleStatusChange = (newStatus) => {
        if (newStatus === "resolved") {
            setPendingStatus(newStatus);
            setShowStatusModal(true);
        } else {
            updateStatus(newStatus);
        }
    };

    const confirmStatusChange = async () => {
        await updateStatus(pendingStatus);
        setShowStatusModal(false);
    };

    const updateStatus = async (newStatus) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/ticket/${selectedTicket._id}/status`,
                {
                    status: newStatus,
                },
                { headers: getAuthHeaders() }
            );
            selectTicket(selectedTicket._id);
            fetchTickets();
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    return (
        <div className={styles.dashboard}>
            <div><Sidebar /></div>


            <div className={styles.sidebar}>
                <h2>Contact Center</h2>
                <h4>Chats</h4>
                <hr style={{ border: '1px solid #D7D8D8', marginTop: "-3vh" }} />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    tickets.map((ticket) => (
                        <div
                            key={ticket._id}
                            className={styles.chatItem}
                            onClick={() => selectTicket(ticket._id)}
                        >
                            <div className={styles.topRow}>
                                <img className={styles.avatar} src="/images/avatar.webp" alt="avatar" />
                                <span>Ticket# {ticket._id.slice(-5)}</span>
                            </div>
                            <p className={styles.msg}>
                                {ticket.messages.length > 0
                                    ? ticket.messages[ticket.messages.length - 1].content
                                    : "No messages yet"}
                            </p>
                        </div>
                    ))
                )}
            </div>


            <div className={styles.chatArea}>
                {selectedTicket ? (
                    <>
                        <div className={styles.chatHeader}>
                            Ticket# {selectedTicket._id.slice(-5)}
                        </div>

                        <div className={styles.chatMessages}>
                            {selectedTicket.messages.map((msg, index) => {
                                const currentDate = new Date(msg.timestamp);
                                const formattedDate = currentDate.toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                });
                                const formattedTime = currentDate.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                });

                                const prevMsg = selectedTicket.messages[index - 1];
                                const showDateSeparator =
                                    index === 0 ||
                                    new Date(msg.timestamp).toDateString() !==
                                    new Date(prevMsg.timestamp).toDateString();

                                return (
                                    <div key={index}>
                                        {showDateSeparator && (
                                            <div className={styles.dateSeparator}>{formattedDate}</div>
                                        )}
                                        <div
                                            className={
                                                msg.sender === "Admin"
                                                    ? styles.adminMessageWrapper
                                                    : styles.customerMessageWrapper
                                            }
                                        >
                                            <img
                                                src={msg.sender === "Admin" ? "/images/avatar-2.avif" : "/images/avatar.webp"}
                                                alt="Profile"
                                                className={styles.profileIcon}
                                            />
                                            <div className={styles.messageContent}>
                                                <div className={styles.senderName}>{msg.sender}</div>
                                                <div className={styles.messageText}>{msg.content}</div>
                                                <div className={styles.messageTime}>{formattedTime}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.chatInputArea}>
                            <input
                                type="text"
                                placeholder="Type here"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button onClick={sendMessage}>
                                <FontAwesomeIcon icon={faPaperPlane} size="lg" color="#0056D2" />
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Select a ticket to start</p>
                )}
            </div>

            <div className={styles.detailsArea}>
                {selectedTicket && selectedTicket.customer && (
                    <>
                        <div className={styles.avatarWrapper}>
                            <img className={styles.avatar1} src="/images/avatar.webp" alt="avatar" />
                            <span>Chat</span>
                        </div>
                        <div className={styles.customerInfo}>
                            <h3>Details</h3>
                            <div className={styles.username}><FaUser /><p>{selectedTicket.customer.name}</p></div>
                            <div className={styles.phone}><FaPhone /><p>{selectedTicket.customer.phone}</p></div>
                            <div className={styles.envelope}><FaEnvelope /><p>{selectedTicket.customer.email}</p></div>
                        </div>

                        <div className={styles.teammates}>
                            <h3>Teammates</h3>
                            <p>Assigned to: {selectedTicket.assignedTo?.name || "Not assigned"}</p>

                            <select
                                value={selectedTicket.assignedTo?.email || ""}
                                onChange={(e) => handleAssignChange(e.target.value)}
                            >
                                <option value="">Select Member</option>
                                {teamMembers.map((member) => (
                                    <option key={member.email} value={member.email}>
                                        {member.name}
                                    </option>
                                ))}
                            </select>

                            <h3>Status</h3>
                            <select
                                value={selectedTicket.status}
                                onChange={(e) => handleStatusChange(e.target.value)}
                            >
                                <option value="unresolved">Unresolved</option>
                                <option value="resolved">Resolved</option>
                            </select>

                            {showAssignModal && (
                                <div className={styles.modalBackdrop}>
                                    <div className={styles.modal}>
                                        <h2>Reassign Ticket</h2>
                                        <p>Are you sure you want to assign this ticket to a different team member?</p>
                                        <button onClick={confirmAssignment}>Yes, Assign</button>
                                        <button onClick={() => setShowAssignModal(false)}>Cancel</button>
                                    </div>
                                </div>
                            )}

                            {showStatusModal && (
                                <div className={styles.modalBackdrop}>
                                    <div className={styles.modal}>
                                        <h2>Close Chat</h2>
                                        <p>Changing status to resolved will close the chat. Are you sure?</p>
                                        <button onClick={confirmStatusChange}>Yes, Close Chat</button>
                                        <button onClick={() => setShowStatusModal(false)}>Cancel</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TicketDashboard;
