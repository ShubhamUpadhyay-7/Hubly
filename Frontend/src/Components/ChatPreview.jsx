
import React from "react";
import styles from "./ChatPreview.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatPreview = ({ headerColor, bgColor, messages, placeholders }) => {
    return (
        <div className={styles.chatContainer}>
            <div className={styles.header} style={{ backgroundColor: headerColor }}>
                <img src="/images/Avatar.png" alt="Bot" className={styles.avatar} />
                <span className={styles.title}>Hubly</span>
            </div>

            <div className={styles.body} style={{ backgroundColor: bgColor }}>
                {messages.map((msg, index) => (
                    // <div key={index} className={styles.botMsg}>{msg}</div>
                    <div key={index} className={styles.botMsgWrapper}>
                        <img src="/images/Avatar.png" alt="Avatar" className={styles.msgAvatar} />
                        <div className={styles.botMsg}>{msg}</div>
                    </div>
                ))}

                <div className={styles.formCard}>
                    <p className={styles.formTitle}>Introduce Yourself</p>
                    <label>Your name</label>
                    <input type="text" placeholder={placeholders.name} />
                    <label>Your Phone</label>
                    <input type="text" placeholder={placeholders.phone} />
                    <label>Your Email</label>
                    <input type="email" placeholder={placeholders.email} />
                    <button>Thank You!</button>
                </div>
            </div>

            <div className={styles.footer}>
                <input type="text" placeholder="Write a message" />
                <button className={styles.sendBtn}>
                    <FontAwesomeIcon icon={faPaperPlane} size="lg" color="#B0C1D4" />
                </button>
            </div>
        </div>
    );
};

export default ChatPreview;
