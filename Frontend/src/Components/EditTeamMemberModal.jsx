import React, { useState, useEffect } from "react";
import styles from "./EditTeamMemberModal.module.css";

const EditTeamMemberModal = ({ user, onClose, onUserUpdated }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        role: "Member",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                phone: user.phone || "",
                email: user.email || "",
                role: user.role || "Member",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Update failed");

            onUserUpdated();
            onClose();
        } catch (err) {
            console.error("Edit failed:", err);
            alert("Failed to update user");
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h3>Edit Team Member</h3>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>
                        Name:
                        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className={styles.widthInput} required />
                    </label>
                    <label>
                        Phone:
                        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className={styles.widthInput} />
                    </label>
                    <label>
                        Email:
                        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={styles.widthInput} required />
                    </label>
                    <label>
                        Role:
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="Member">Member</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </label>
                    <div className={styles.modalActions}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
                        <button type="submit" className={styles.confirmButton}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTeamMemberModal;

