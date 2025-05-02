import React from "react";
import Sidebar from "../Components/Sidebar";
import styles from "./ContactCenterPage.module.css"

const ContactCenterPage = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <Sidebar />
                <div className={styles.chats}>
                    <span className={styles.name}>Contact Center</span>
                </div>
                <div className={styles.reply}></div>
                <div className={styles.details}></div>
            </div>
        </>
    )
}
export default ContactCenterPage;
