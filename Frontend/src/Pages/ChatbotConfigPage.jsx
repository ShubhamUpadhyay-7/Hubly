
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import styles from "./ChatbotConfigPage.module.css";
import ChatPreview from "../Components/ChatPreview";
import HeaderColorPicker from "../Components/HeaderColorPicker";
import BackgroundColorPicker from "../Components/BackgroundColorPicker";
import CustomizeMessage from "../Components/CustomizeMessage";
import CustomizeFormPlaceholders from "../Components/CustomizeFormPlaceholders";
import BotWelcomeMessage from "../Components/BotWelcomeMessage";
import CustomizeWelcomeMessage from "../Components/CustomizeWelcomeMessage";

const ChatbotConfigPage = () => {
    const [headerColor, setHeaderColor] = useState("#33475B");
    const [bgColor, setBgColor] = useState("#EEEEEE");
    const [messages, setMessages] = useState([]);
    const [placeholders, setPlaceholders] = useState({});
    const [initialLoad, setInitialLoad] = useState(true);
    const [welcomeMessage, setWelcomeMessage] = useState("");

    const isInitialMount = useRef(true);

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/config", {
                    headers: getAuthHeaders(),
                });
                setHeaderColor(res.data.headerColor);
                setBgColor(res.data.backgroundColor);
                setMessages(res.data.messages || []);
                setPlaceholders(res.data.formPlaceholders || {});
                setWelcomeMessage(res.data.welcomeMessage || "");
            } catch (err) {
                console.error("Failed to fetch chatbot config:", err);
            } finally {
                setInitialLoad(false);
                isInitialMount.current = false;
            }
        };

        fetchConfig();
    }, []);

    // Auto-save function
    const autoSave = async () => {
        try {
            await axios.post(
                "http://localhost:5000/api/config",
                {
                    headerColor,
                    backgroundColor: bgColor,
                    messages,
                    formPlaceholders: placeholders,
                    welcomeMessage,
                },
                {
                    headers: getAuthHeaders(),
                }
            );
            console.log("Configuration auto-saved.");
        } catch (err) {
            console.error("Failed to auto-save config:", err);
        }
    };

    useEffect(() => {
        if (!isInitialMount.current) {
            autoSave();
        }
    }, [headerColor, bgColor, messages, placeholders, welcomeMessage]);

    return (
        <div className={styles.wrapper}>
            <div style={{ position: "fixed" }}>
                <Sidebar />
            </div>
            <div className={styles.chatPreview}>
                <h2 className={styles.heading}>Chat Bot</h2>
                <ChatPreview
                    headerColor={headerColor}
                    bgColor={bgColor}
                    messages={messages}
                    placeholders={placeholders}
                />
                <BotWelcomeMessage
                    welcomeMessage={welcomeMessage}
                    onClose={() => console.log("Close prompt")}
                />
            </div>
            <div>
                <HeaderColorPicker selectedColor={headerColor} onChange={setHeaderColor} />
                <BackgroundColorPicker bgColor={bgColor} setBgColor={setBgColor} />
                <CustomizeMessage messages={messages} setMessages={setMessages} />
                <CustomizeFormPlaceholders
                    placeholders={placeholders}
                    setPlaceholders={setPlaceholders}
                />
                <CustomizeWelcomeMessage
                    welcomeMessage={welcomeMessage}
                    setWelcomeMessage={setWelcomeMessage}
                />
            </div>
        </div>
    );
};

export default ChatbotConfigPage;
