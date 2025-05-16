import React, { useState, useEffect } from "react";
import styles from "./CustomizeWelcomeMessage.module.css";
import { FiEdit2 } from "react-icons/fi";

const CustomizeWelcomeMessage = ({ welcomeMessage, setWelcomeMessage }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempMessage, setTempMessage] = useState(welcomeMessage);

    useEffect(() => {
        setTempMessage(welcomeMessage);
    }, [welcomeMessage]);

    const handleSave = () => {
        setWelcomeMessage(tempMessage);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // prevent newline
            handleSave();
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
                        onKeyDown={handleKeyDown}
                        maxLength={150}
                        autoFocus
                    />
                ) : (
                    <div className={styles.preview}>
                        <span>{welcomeMessage}</span>
                        <FiEdit2 className={styles.icon} onClick={() => setIsEditing(true)} />
                    </div>
                )}
                <span className={styles.counter}>{tempMessage.length}/150</span>
            </div>
        </div>
    );
};

export default CustomizeWelcomeMessage;
