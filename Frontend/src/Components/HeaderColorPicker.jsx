import React from "react";
import styles from "./HeaderColorPicker.module.css";

const colors = ["#FFFFFF", "#000000", "#33475B"];

const HeaderColorPicker = ({ selectedColor, onChange }) => {
    return (
        <div className={styles.colorCard}>
            <p className={styles.title}>Header Color</p>
            <div className={styles.colorOptions}>
                {colors.map((color) => (
                    <div
                        key={color}
                        className={`${styles.circle} ${selectedColor === color ? styles.selected : ""
                            }`}
                        style={{ backgroundColor: color }}
                        onClick={() => onChange(color)}
                    />
                ))}
            </div>
            <div className={styles.colorCode}>
                <div
                    className={styles.colorPreview}
                    style={{ backgroundColor: selectedColor }}
                ></div>
                <input type="text" value={selectedColor} readOnly />
            </div>
        </div>
    );
};

export default HeaderColorPicker;
