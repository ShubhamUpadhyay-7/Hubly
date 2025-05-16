
// import React from "react";
// import styles from "./CustomizeFormPlaceholders.module.css";

// const CustomizeFormPlaceholders = ({ placeholders, setPlaceholders }) => {
//     const handleChange = (e) => {
//         setPlaceholders({
//             ...placeholders,
//             [e.target.name]: e.target.value,
//         });
//     };

//     return (
//         <div className={styles.container}>
//             <h3 className={styles.title}>Introduction Form</h3>
//             <label className={styles.label}>Your Name</label>
//             <input
//                 type="text"
//                 name="name"
//                 value={placeholders.name}
//                 onChange={handleChange}
//                 className={styles.input}
//             />

//             <label className={styles.label}>Your Phone</label>
//             <input
//                 type="text"
//                 name="phone"
//                 value={placeholders.phone}
//                 onChange={handleChange}
//                 className={styles.input}
//             />

//             <label className={styles.label}>Your Email</label>
//             <input
//                 type="text"
//                 name="email"
//                 value={placeholders.email}
//                 onChange={handleChange}
//                 className={styles.input}
//             />
//             <button className={styles.button}>Thank You!</button>
//         </div>
//     );
// };

// export default CustomizeFormPlaceholders;
import React, { useState, useEffect } from "react";
import styles from "./CustomizeFormPlaceholders.module.css";

const CustomizeFormPlaceholders = ({ placeholders, setPlaceholders }) => {
    const [tempPlaceholders, setTempPlaceholders] = useState({ ...placeholders });

    useEffect(() => {
        setTempPlaceholders({ ...placeholders });
    }, [placeholders]);

    const handleChange = (e) => {
        setTempPlaceholders({
            ...tempPlaceholders,
            [e.target.name]: e.target.value,
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const { name } = e.target;
            setPlaceholders({
                ...placeholders,
                [name]: tempPlaceholders[name],
            });
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Introduction Form</h3>
            <label className={styles.label}>Your Name</label>
            <input
                type="text"
                name="name"
                value={tempPlaceholders.name || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={styles.input}
            />

            <label className={styles.label}>Your Phone</label>
            <input
                type="text"
                name="phone"
                value={tempPlaceholders.phone || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={styles.input}
            />

            <label className={styles.label}>Your Email</label>
            <input
                type="text"
                name="email"
                value={tempPlaceholders.email || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={styles.input}
            />
            <button className={styles.button}>Thank You!</button>
        </div>
    );
};

export default CustomizeFormPlaceholders;
