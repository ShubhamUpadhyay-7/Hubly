
import React, { useState } from "react";
import styles from "./AddTeamMemberModal.module.css";

const AddTeamMemberModal = ({ onClose, fetchUsers }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        role: "Member",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("${process.env.REACT_APP_API_BASE_URL}/api/addTeamMember", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Team member added successfully!");
                fetchUsers();
                onClose();
            } else {
                const data = await res.json();
                alert(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error adding team member.");
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2 className={styles.heading}>Add Team Members</h2>
                <p className={styles.subtext}>
                    Talk with colleagues in a group chat. Messages in this group are only visible to its participants.
                    New teammates may only be invited by the administrators.
                </p>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label}>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="User name"
                        className={styles.input}
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label className={styles.label}>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        className={styles.input}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <label className={styles.label}>Email ID</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email ID"
                        className={styles.input}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label className={styles.label}>Role</label>
                    <select
                        name="role"
                        className={styles.input}
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option>Member</option>
                        <option>Admin</option>
                    </select>

                    <div className={styles.buttonGroup}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.saveButton}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTeamMemberModal;