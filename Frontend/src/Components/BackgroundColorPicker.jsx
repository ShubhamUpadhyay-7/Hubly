import React from "react";
import styles from "./BackgroundColorPicker.module.css";

const BackgroundColorPicker = ({ bgColor, setBgColor }) => {
    const presetColors = ["#FFFFFF", "#000000", "#F5F5F5"];

    return (
        <div className={styles.container}>
            <p className={styles.label}>Custom Background Color</p>
            <div className={styles.colorOptions}>
                {presetColors.map((color) => (
                    <button
                        key={color}
                        className={`${styles.circle} ${bgColor === color ? styles.selected : ""
                            }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setBgColor(color)}
                    />
                ))}
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.previewBox} style={{ backgroundColor: bgColor }} />
                <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className={styles.input}
                />
            </div>
        </div>
    );
};

export default BackgroundColorPicker;
