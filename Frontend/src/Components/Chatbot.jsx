
import React, { useState, useEffect } from "react";
import styles from "./Chatbot.module.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [config, setConfig] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const [showPrompt, setShowPrompt] = useState(true);
    const [showForm, setShowForm] = useState(true);
    const [ticketData, setTicketData] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    const toggleChatbot = () => setShowChatbot((prev) => !prev);

    useEffect(() => {
        axios
            .get("${process.env.REACT_APP_API_BASE_URL}/api/config")
            .then((res) => setConfig(res.data))
            .catch((err) => console.error("Error fetching config:", err));

        const storedUser = localStorage.getItem("hublyUser");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setFormData(userData);

            axios
                .post("${process.env.REACT_APP_API_BASE_URL}/api/start", userData)
                .then((res) => {
                    const { ticketId, assignedTo, messages } = res.data;
                    setTicketData({ ticketId, assignedTo, messages });
                    setShowForm(false);
                })
                .catch((error) =>
                    console.error("Auto-submit error:", error.response?.data || error.message)
                );
        }
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("${process.env.REACT_APP_API_BASE_URL}/api/start", formData);
            const { ticketId, assignedTo, messages } = response.data;

            setTicketData({ ticketId, assignedTo, messages });
            setShowForm(false);
            localStorage.setItem("hublyUser", JSON.stringify(formData)); // Save to localStorage
        } catch (error) {
            console.error("Form submit error:", error.response?.data || error.message);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const res = await axios.post("${process.env.REACT_APP_API_BASE_URL}/api/messages/send", {
                ticketId: ticketData.ticketId,
                sender: "Customer",
                content: newMessage,
            });

            setTicketData((prev) => ({
                ...prev,
                messages: [...prev.messages, res.data.newMessage],
            }));

            setNewMessage("");
        } catch (error) {
            console.error("Message send error:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <img
                src="/images/boticon.png"
                className={styles.botIcon}
                alt="Chatbot Icon"
                onClick={toggleChatbot}
            />
            {showPrompt && config && (
                <div className={styles.prompt}>
                    <img src="/images/Ellipse 6.png" className={styles.img1} alt="" />
                    <p>{config.welcomeMessage}</p>
                    <button className={styles.closeBtn} onClick={() => setShowPrompt(false)}>×</button>
                </div>
            )}
            {showChatbot && config && (
                <div className={styles.chatbotWrapper} style={{ backgroundColor: config.backgroundColor }}>
                    <div className={styles.chatbotHeader} style={{ backgroundColor: config.headerColor }}>
                        <div>
                            <img src="/images/Avatar.png" alt="avatar" />
                            <span>Hubly</span>
                        </div>
                        <button onClick={toggleChatbot} className={styles.closeBtn2}>×</button>
                    </div>
                    <div className={styles.chatbotBody}>
                        {config.messages?.map((msg, idx) => (
                            <div key={idx} className={styles.messageRow + " " + styles.left}>
                                <img src="/images/Avatar.png" alt="Hubly" className={styles.msgAvatar} />
                                <div className={styles.messageBubble}>
                                    <strong>Hubly:</strong> {msg}
                                </div>
                            </div>
                        ))}

                        {showForm ? (
                            <form className={styles.chatForm} onSubmit={handleSubmit}>
                                <p style={{ marginLeft: "1vw" }}>Introduce Yourself</p>
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={config.formPlaceholders?.name || "Your Name"}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <label>Your Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder={config.formPlaceholders?.phone || "Phone Number"}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                                <label>Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={config.formPlaceholders?.email || "Email Address"}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="submit">Thank You!</button>
                            </form>
                        ) : (
                            <>
                                <div className={styles.messagesContainer}>
                                    {ticketData?.messages.map((msg, index) => {
                                        const isCustomer = msg.sender === "Customer";
                                        return (
                                            <div
                                                key={index}
                                                className={`${styles.messageRow} ${isCustomer ? styles.right : styles.left}`}
                                                title={new Date(msg.timestamp).toLocaleString()}
                                            >
                                                {!isCustomer && (
                                                    <img src="/images/Avatar.png" alt="Hubly" className={styles.msgAvatar} />
                                                )}
                                                <div className={styles.messageBubble}>
                                                    <strong>{isCustomer ? "You" : "Hubly"}:</strong> {msg.content}
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
                                    <button onClick={handleSendMessage}>
                                        <FontAwesomeIcon icon={faPaperPlane} size="lg" color="#B0C1D4" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
