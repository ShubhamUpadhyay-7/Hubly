import React, { useState } from "react";
import styles from "./SignUp.module.css"
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "", password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const navigate = useNavigate();
    return (
        <div className={styles.signUpContainer}>
            <div>
                <div>
                    <img src="/images/logo.png" className={styles.logo} />
                </div>
                <div className={styles.header}>
                    <h2 className={styles.heading}>Create an account</h2>
                    <p className={styles.anchor} onClick={() => navigate("/login")} style={{ cursor: 'pointer' }}><u>Sign in instead</u></p>
                </div>
                <form className={styles.form}>
                    <label htmlFor="name" className={styles.name}>Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className={styles.nameInput}
                        value={formData.name}
                        onChange={handleChange}
                        required />
                    <label htmlFor="phone" className={styles.phone}>Phone</label>
                    <input
                        type="Number"
                        name="phone"
                        id="phone"
                        className={styles.phoneInput}
                        value={formData.phone}
                        onChange={handleChange}
                        required />
                    <label htmlFor="email" className={styles.email}>Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={styles.emailInput}
                        value={formData.email}
                        onChange={handleChange}
                        required />
                    <label htmlFor="password" className={styles.password}>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className={styles.passwordInput}
                        value={formData.password}
                        onChange={handleChange}
                        required />
                    <label htmlFor="confirmPassword" className={styles.confirmPassword}>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className={styles.confirmPasswordInput}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required />
                    <div className={styles.checkbox}>
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms" className={styles.terms}>By creating an account, I agree to our <u>Terms of use</u> and <u>Privacy and Policy</u></label>
                    </div>
                    <button type="submit" className={styles.submitBtn}>Create an account</button>
                    <p className={styles.footer}>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of service apply.</p>
                </form>
            </div>
            <img src="/images/Frame.png" className={styles.pic} />
        </div >
    )
}

export default SignUp