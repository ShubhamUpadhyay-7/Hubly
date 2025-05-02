
import React, { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Sidebar from '../Components/Sidebar';
import styles from './AnalyticsPage.module.css';

const AnalyticsDashboard = () => {
    const [data, setData] = useState({
        totalChats: 0,
        resolvedTickets: 0,
        missedChats: 0,
        averageReplyTime: '0 sec',
    });

    const [missedChatsData, setMissedChatsData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch('http://localhost:5000/api/analytics', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Unauthorized or other error");
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                const weekly = Array.from({ length: 10 }, (_, i) => ({
                    week: `Week ${i + 1}`,
                    chats: Math.floor(Math.random() * 10 + 5),
                }));
                setMissedChatsData(weekly);
            })
            .catch(err => {
                console.error("Analytics fetch error:", err);
                alert("Please login again or check if you're authorized.");
            });
    }, []);

    const resolvedPercent = Math.round((data.resolvedTickets / data.totalChats) * 100 || 0);

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}><Sidebar /></div>
            <div style={{ marginLeft: "12vw", paddingRight: "4vw" }}>
                <h3 style={{ marginTop: "2vh", color: "#6A6B70" }}>Analytics</h3>

                <div>
                    <h2 className={styles.sectionTitle}>Missed Chats</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={missedChatsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="chats" stroke="green" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.averageReplyTimeDiv}>
                        <h3 className={styles.subTitle}>Average Reply time</h3>
                        <p>
                            For highest customer satisfaction rates you should aim to reply to an incoming
                            customer's message in 15 seconds or less. Quick responses will get you more
                            conversations, help you earn customers' trust and make more sales.
                        </p>
                    </div>
                    <div>
                        <h2 className={styles.subTitle}>{data.averageReplyTime}</h2>
                    </div>
                </div>

                <div className={styles.flexRow}>
                    <div className={styles.paratext}>
                        <h3 className={styles.subTitle}>Resolved Tickets</h3>
                        <p>
                            A callback system on a website, as well as proactive invitations, help to attract even
                            more customers. A separate round button for ordering a call with small animation helps to motivate more customers to make calls.
                        </p>
                    </div>
                    <div className={styles.circularContainer}>
                        <CircularProgressbar
                            value={resolvedPercent}
                            text={`${resolvedPercent}%`}
                            styles={buildStyles({
                                textColor: 'green',
                                pathColor: 'green',
                                trailColor: '#d6d6d6',
                            })}
                        />
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <div>
                        <h3>Total Chats</h3>
                        <p>
                            This metric shows the total number of chats for all channels for the selected period.
                        </p>
                    </div>
                    <div className={styles.totalChatsCount}>
                        <h2 className={styles.subTitle}>{data.totalChats} Chats</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
