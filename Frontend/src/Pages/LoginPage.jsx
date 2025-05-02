
import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("adminEmail", data.user.email);

                alert("Login successful!");
                navigate("/assignedTickets");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div>
                <div>
                    <img src="/images/logo.png" className={styles.logo} alt="Logo" />
                </div>
                <h2 className={styles.heading}>Sign in to your Plexify</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="email" className={styles.username}>Username</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={styles.emailInput}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="password" className={styles.password}>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className={styles.passwordInput}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className={styles.submitBtn}>Log in</button>
                    <span className={styles.forgot}><u>Forgot Password?</u></span>
                    <p className={styles.signup}>
                        Don't have an account?{" "}
                        <u onClick={() => navigate("/signup")} style={{ cursor: 'pointer' }}>Sign up</u>
                    </p>
                    <p className={styles.footer}>
                        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of service apply.
                    </p>
                </form>
            </div>
            <img src="/images/Frame.png" className={styles.pic} alt="Decoration" />
        </div>
    );
};

export default LoginPage;
