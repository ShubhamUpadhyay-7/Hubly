import React from "react";
import styles from "./BotWelcomeMessage.module.css";

const BotWelcomeMessage = ({ welcomeMessage, onClose }) => {
    return (
        <div className={styles.botSize}>
            <img className={styles.img} src="/images/Ellipse 6.png" alt="bot" />
            <p className={styles.message}>{welcomeMessage}</p>
            <button className={styles.cross} onClick={onClose}>×</button>
        </div>
    );
};

export default BotWelcomeMessage;
