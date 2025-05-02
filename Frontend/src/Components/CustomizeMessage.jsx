import React, { useState } from "react";
import styles from "./CustomizeMessage.module.css";
import { FiEdit2 } from "react-icons/fi";

const CustomizeMessage = ({ messages, setMessages }) => {
    const handleEdit = (index) => {
        const newMessage = prompt("Edit your message:", messages[index]);
        if (newMessage !== null) {
            const updated = [...messages];
            updated[index] = newMessage;
            setMessages(updated);
        }
    };

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>Customize Message</h4>
            {messages.map((msg, index) => (
                <div key={index} className={styles.messageBox}>
                    <span>{msg}</span>
                    <FiEdit2
                        className={styles.editIcon}
                        onClick={() => handleEdit(index)}
                    />
                </div>
            ))}
        </div>
    );
};

export default CustomizeMessage;
