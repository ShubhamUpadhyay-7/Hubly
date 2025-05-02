
import React from "react";
import styles from "./Sidebar.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"; // logout icon

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const menuItems = [
        { route: "/assignedTickets", label: "Dashboard", icon: "/images/Sidebarlogo2.png", className: styles.logo1 },
        { route: "/TicketDashboard", label: "Contact Center", icon: "/images/Sidebarlogo1.png", className: styles.logo2 },
        { route: "/analytics", label: "Analytics", icon: "/images/Sidebarlogo4.png", className: styles.logo3 },
        { route: "/ChatbotConfigPage", label: "Chatbot", icon: "/images/Sidebarlogo3.png", className: styles.logo4 },
        { route: "/AllTeamPage", label: "Team", icon: "/images/Sidebarlogo5.png", className: styles.logo5 },
        { route: "/settings", label: "Settings", icon: "/images/Sidebarlogo6.png", className: styles.logo6 },
    ];

    return (
        <div className={styles.sidebar}>
            <img src="/images/logo7.png" className={styles.logo7} alt="Logo" />

            {menuItems.map((item) => (
                <div
                    key={item.label}
                    className={styles.iconWrapper}
                    onClick={() => navigate(item.route)}
                >
                    <img src={item.icon} className={item.className} alt={item.label} />
                    {location.pathname === item.route && (
                        <p className={styles.label}>{item.label}</p>
                    )}
                </div>
            ))}

            <div className={styles.logoutWrapper} onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} className={styles.logoutIcon} />
                <p className={styles.label}>Logout</p>
            </div>
        </div>
    );
};

export default Sidebar;
