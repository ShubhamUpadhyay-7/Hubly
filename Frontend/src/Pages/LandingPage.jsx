import React, { useState } from "react";
import styles from "./LandingPage.module.css"
import { useNavigate } from "react-router-dom";
import Chatbot from "../Components/Chatbot";
// import Chatbot from "../Components/Chatbot";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className={styles.nav}>
                <img className={styles.logo} src="/images/logo.png" alt="logo" />
                <div className={styles.navlinks}>
                    <button className={styles.login} onClick={() => navigate("/login")}>Login</button>
                    <button className={styles.signup} onClick={() => navigate("/signup")}>Sign up</button>
                </div>
            </nav >
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Grow Your Business Faster <br /> with Hubly CRM </h1>
                    <p className={styles.heroSubtitle}>Manage leads, automate workflows, and close deals effortlessly-all in one powerful <br />  platform.</p>
                    <div className={styles.heroButtons}>
                        <button className={styles.getStartedBtn}>Get started →</button>
                        <div className={styles.watchVideo}>
                            <img src="/images/playButton.png" className={styles.playIcon} />
                            <p className={styles.watchVideoText}>Watch Video</p>
                        </div>
                    </div>
                </div>
                <img src="/images/Rectangle 2074.png" className={styles.heroImage} />
            </div>
            <Chatbot />
            <div className={styles.logos}>
                <img src="/images/logo1.png" />
                <img src="/images/logo2.png" />
                <img src="/images/logo3.png" />
                <img src="/images/logo4.png" />
                <img src="/images/logo5.png" />
                <img src="/images/logo6.png" />
            </div>
            <div className={styles.page2}>
                <div>
                    <h2 className={styles.heading2}>At its core, Hubly is a robust CRM <br /><span style={{ display: 'block', textAlign: 'center' }}>solution.</span></h2>
                    <p className={styles.para2}>Hubly helps businesses streamline customer interactions track leads, and automate tasks-<br /> saving you time and maximizing revenue.Whether you're a startupor an enterprise,Hubly <br /> adapts to your needs, giving you the tools to scale efficiently.</p>
                </div>
                <div className={styles.box}>
                    <div className={styles.points}>
                        <h3>MUlTIPLE PLATFORMS TOGETHER!</h3>
                        <p>Email communication is a breeze with our fully intergated, drag and drop <br /> email builder.</p>
                        <h3>CLOSE</h3>
                        <p>Capture leads using our landing pages, surveys, forms, calenders, inbound phone <br />system & more!</p>
                        <h3>NURTURE</h3>
                        <p>Capture leads using our landing pages, surveys, forms, calenders, inbound <br />phone system & more!</p>
                    </div>
                    <div className={styles.images}>
                        <img src="/images/Messaging Apps.png" className={styles.image1} />
                        <img src="/images/hierarchy.png" className={styles.image2} />
                    </div>
                </div>
            </div>
            <div className={styles.page3}>
                <h2 className={styles.heading3}>We have plans for everyone!</h2>
                <p className={styles.para3}>We started with the strong foundation, then simply built all of the sales and <br /> marketing tools ALL businesses need under one platform.</p>
            </div>
            <div className={styles.boxes}>
                <div className={styles.box1}>
                    <h2 className={styles.box1heading}>STARTER</h2>
                    <p className={styles.box1para1}>Best for local businesses needing to improve their online <br /> reputation.</p>
                    <p><span className={styles.cost1}>$199</span>/monthly</p>
                    <p className={styles.box1para2}>What's included</p>
                    <ul className={styles.ticklist}>
                        <li>Unlimited Users</li>
                        <li>GMB Messaging</li>
                        <li>Reputation Management</li>
                        <li>GMB Messaging</li>
                        <li>GMB Call Tracking</li>
                        <li>24/7 Award Winning Support</li>
                    </ul>
                    <button className={styles.btn1}>SIGN UP FOR STARTER</button>
                </div>
                <div className={styles.box2}>
                    <h2 className={styles.box1heading}>GROW</h2>
                    <p className={styles.box1para1}>Best for all businesses that want to take full control of their marketing automation and track their leads, click to close.</p>
                    <p><span className={styles.cost1}>$399</span>/monthly</p>
                    <p className={styles.box1para2}>What's included</p>
                    <ul className={styles.ticklist}>
                        <li>Pipeline Management</li>
                        <li>Marketing Automation Campaigns</li>
                        <li>Live Call Transfer</li>
                        <li>GMB Messaging</li>
                        <li>Embed-able Form Builder</li>
                        <li>Reputation Management</li>
                        <li>24/7 Award Winning Support</li>
                    </ul>
                    <button className={styles.btn2}>SIGN UP FOR GROW</button>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.footerlogo}>
                    <img src="/images/logo.png" className={styles.footerlogo1} />
                </div>
                <div className={styles.options}>
                    <div className={styles.footertop}>
                        <div className={styles.footer1}>
                            <ul style={{ listStyleType: "none", fontFamily: "Inter, sans-serif" }}>
                                <li style={{ marginBottom: "2vh", fontWeight: "500" }}>Product</li>
                                <li>Universal Checkout</li>
                                <li>Payment Workflows</li>
                                <li>Observability</li>
                                <li>Uplift AI</li>
                                <li>Apps & Integrations</li>
                            </ul>
                        </div>
                        <div className={styles.footer2}>
                            <ul style={{ listStyleType: "none", fontFamily: "Inter, sans-serif" }}>
                                <li style={{ marginBottom: "2vh", fontWeight: "500" }}>Why Primer</li>
                                <li>Expands to new markets</li>
                                <li>Boost payment success</li>
                                <li>Improve conversion rates</li>
                                <li>Reduce payments fraud</li>
                                <li>Recover revenue</li>
                            </ul>
                        </div>
                        <div className={styles.footer3}>
                            <ul style={{ listStyleType: "none", fontFamily: "Inter, sans-serif" }}>
                                <li style={{ marginBottom: "2vh", fontWeight: "500" }}>Developers</li>
                                <li>Primer Docs</li>
                                <li>API reference</li>
                                <li>Payment methods guide</li>
                                <li>Service status</li>
                                <li>Community</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        <div className={styles.footer4}>
                            <ul style={{ listStyleType: "none", fontFamily: "Inter, sans-serif" }}>
                                <li style={{ marginBottom: "2vh", fontWeight: "500" }}>Resources</li>
                                <li>Blog</li>
                                <li>Success stories</li>
                                <li>News room</li>
                                <li>Terms</li>
                                <li>Privacy</li>
                            </ul>
                        </div>
                        <div className={styles.footer5}>
                            <ul style={{ listStyleType: "none", fontFamily: "Inter, sans-serif" }}>
                                <li style={{ marginBottom: "2vh", fontWeight: "500" }}>Company</li>
                                <li>Careers</li>
                            </ul>
                        </div>
                        <div className={styles.footer6}>
                            <img src="/images/div.flex.png" style={{ marginTop: "18vh" }} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default LandingPage;
