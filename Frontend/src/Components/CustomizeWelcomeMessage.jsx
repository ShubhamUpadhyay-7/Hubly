import React, { useState } from "react";
import styles from "./CustomizeWelcomeMessage.module.css";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";

const CustomizeWelcomeMessage = ({ welcomeMessage, setWelcomeMessage }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempMessage, setTempMessage] = useState(welcomeMessage);

    const handleSave = async () => {
        try {
            await axios.post("http://localhost:5000/api/config", {
                welcomeMessage: tempMessage,
            });
            setWelcomeMessage(tempMessage);
            setIsEditing(false);
        } catch (err) {
            console.error("Failed to update welcome message:", err);
        }
    };

    return (
        <div className={styles.card}>
            <h4 className={styles.title}>Welcome Message</h4>
            <div className={styles.box}>
                {isEditing ? (
                    <textarea
                        className={styles.input}
                        value={tempMessage}
                        onChange={(e) => setTempMessage(e.target.value)}
                        onBlur={handleSave}
                        maxLength={50}
                        autoFocus
                    />
                ) : (
                    <div className={styles.preview}>
                        <span>👋 {welcomeMessage}</span>
                        <FiEdit2 className={styles.icon} onClick={() => setIsEditing(true)} />
                    </div>
                )}
                <span className={styles.counter}>
                    {tempMessage.length}/50
                </span>
            </div>
        </div>
    );
};

export default CustomizeWelcomeMessage;
