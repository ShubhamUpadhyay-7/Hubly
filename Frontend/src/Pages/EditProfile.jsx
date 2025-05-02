
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import styles from "./EditProfile.module.css";
import Sidebar from "../Components/Sidebar";

const EditProfile = () => {
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData({
                    name: res.data.name || "",
                    phone: res.data.phone || "",
                    email: res.data.email || "",
                });
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // const handleProfileUpdate = async (e) => {
    //     e.preventDefault();
    //     const token = localStorage.getItem("token");

    //     if (password && password !== confirmPassword) {
    //         alert("Passwords do not match");
    //         return;
    //     }

    //     try {
    //         setLoading(true);

    //         // Update profile (name, phone, email)
    //         const profilePayload = {
    //             name: userData.name,
    //             phone: userData.phone,
    //             email: userData.email,
    //         };

    //         await axios.put("http://localhost:5000/api/user/update", profilePayload, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });

    //         // Update common password (if provided)
    //         if (password) {
    //             await axios.put("http://localhost:5000/api/user/common-password", {
    //                 newPassword: password,
    //             }, {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             });
    //         }

    //         alert("Profile and password updated successfully!");
    //     } catch (err) {
    //         console.error("Update failed", err);
    //         alert("Update failed");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (password && password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const profilePayload = {
                name: userData.name,
                phone: userData.phone,
                email: userData.email,
            };

            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/update`, profilePayload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (password) {
                await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/common-password`, {
                    newPassword: password,
                }, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                alert("Password changed. You will be logged out.");
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                alert("Profile updated successfully!");
            }
        } catch (err) {
            console.error("Update failed", err);
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.settingsHeading}>
                <Sidebar />
                <h3>Settings</h3>
            </div>
            <div className={styles.main}>
                <h3>Edit Profile</h3>
                <hr style={{ width: "90%", color: "gray", height: "1px", backgroundColor: "gray", marginTop: "-3vh" }} />
                <form className={styles.form} onSubmit={handleProfileUpdate}>
                    <label className={styles.label}>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className={styles.Input}
                        required
                    />

                    <label className={styles.label}>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className={styles.Input}
                        required
                    />

                    <label className={styles.label}>
                        Email
                        <span data-tooltip-id="emailTip"> ⓘ </span>
                        <Tooltip id="emailTip" place="right" content="Used for login & communication" />
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className={styles.Input}
                        required
                    />

                    <label className={styles.label}>
                        Password
                        <span data-tooltip-id="passTip"> ⓘ </span>
                        <Tooltip id="passTip" place="right" content="User will be logged out immediately" />
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        className={styles.Input}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label className={styles.label}>
                        Confirm Password
                        <span data-tooltip-id="confirmPassTip"> ⓘ </span>
                        <Tooltip id="confirmPassTip" place="right" content="User will be logged out immediately" />
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        className={styles.Input}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button type="submit" disabled={loading} className={styles.saveButton}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;

