
import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "Account created!");
                localStorage.setItem("token", data.token); // Save token
                navigate("/login");
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={styles.signUpContainer}>
            <div>
                <div>
                    <img src="/images/logo.png" className={styles.logo} alt="Logo" />
                </div>
                <div className={styles.header}>
                    <h2 className={styles.heading}>Create an account</h2>
                    <p
                        className={styles.anchor}
                        onClick={() => navigate("/login")}
                        style={{ cursor: "pointer" }}
                    >
                        <u>Sign in instead</u>
                    </p>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="name" className={styles.name}>Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className={styles.nameInput}
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="phone" className={styles.phone}>Phone</label>
                    <input
                        type="number"
                        name="phone"
                        id="phone"
                        className={styles.phoneInput}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email" className={styles.email}>Email</label>
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

                    <label htmlFor="confirmPassword" className={styles.confirmPassword}>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className={styles.confirmPasswordInput}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <div className={styles.checkbox}>
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms" className={styles.terms}>
                            By creating an account, I agree to our <u>Terms of use</u> and <u>Privacy and Policy</u>
                        </label>
                    </div>

                    <button type="submit" className={styles.submitBtn}>Create an account</button>

                    <p className={styles.footer}>
                        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of service apply.
                    </p>
                </form>
            </div>
            <img src="/images/Frame.png" className={styles.pic} alt="Illustration" />
        </div>
    );
};

export default SignUp;
