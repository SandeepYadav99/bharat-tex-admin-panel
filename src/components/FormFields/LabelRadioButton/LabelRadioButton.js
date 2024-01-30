import styles from "./Style.module.css";
import React from "react";
import csx from 'classnames';

const LabelRadioButton = ({isError, label, checked, description, value, handleChange, id, name}) => {
    return (
        <div className={csx(styles.labeledButton, (isError ? styles.error : ''))}>
            <input checked={checked} type="radio" id={`FG_LABELD_${id}`} name={name} value={value} onClick={(e) => { handleChange(value) }}/>
            <label htmlFor={`FG_LABELD_${id}`}>{label}</label>
            <div className={styles.down}>
                {description}
            </div>
        </div>
    )
};

export default LabelRadioButton;
