
import React, { useEffect, useState } from "react";
import styles from "./AllTeamPage.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import AddTeamMemberModal from "./AddTeamMemberModal";
import EditTeamMemberModal from "../Components/EditTeamMemberModal";

const AllTeamPage = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("${process.env.REACT_APP_API_BASE_URL}/api/allUsers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await res.json();
            setUsers(data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleDelete = async () => {
        if (!selectedUser) return;
        const token = localStorage.getItem("token");
        try {
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/${selectedUser._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowDeleteConfirm(false);
            setSelectedUser(null);
            fetchAllUsers();
        } catch (err) {
            console.error("Failed to delete user", err);
            alert("Delete failed");
        }
    };

    return (
        <div className={styles.wrapper}>
            <Sidebar />
            <div className={styles.container}>
                <h2 className={styles.heading}>Team</h2>

                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th></th>
                            <th>Full Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className={styles.userInfo}>
                                    <img src="/images/avatar-2.avif" alt="avatar" className={styles.avatar} />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.phone || "-"}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.role === "Member" && (
                                        <>
                                            <FaEdit
                                                className={styles.icon}
                                                onClick={() => setEditUser(user)}
                                            />
                                            <FaTrash
                                                className={styles.icon}
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setShowDeleteConfirm(true);
                                                }}
                                            />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className={styles.addButton} onClick={openModal}>
                    + Add Team members
                </button>

                {showModal && (
                    <AddTeamMemberModal onClose={closeModal} fetchUsers={fetchAllUsers} />
                )}

                {editUser && (
                    <EditTeamMemberModal
                        user={editUser}
                        onClose={() => setEditUser(null)}
                        onUserUpdated={fetchAllUsers}
                    />
                )}

                {showDeleteConfirm && selectedUser && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <p>This teammate will be deleted. Are you sure?</p>
                            <div className={styles.modalActions}>
                                <button
                                    className={styles.cancelButton}
                                    onClick={() => {
                                        setShowDeleteConfirm(false);
                                        setSelectedUser(null);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={styles.confirmButton}
                                    onClick={handleDelete}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTeamPage;

