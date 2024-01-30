import React from "react";
import styles from "./Style.module.css";
// import image from "../../../../../assets/img/download.png";

const UpperInfoComponent = ({data}) => {
    return (
            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.mainFlex}>
                        <div className={styles.left221}>
                            <div>
                                <div className={styles.key}>
                                    <span className={styles.value}>Name:</span>
                                    {data?.name}
                                </div>
                                <div className={styles.key}>
                                    <span className={styles.value}>Phone Number:</span>
                                    {data?.contact}
                                </div>
                                <div className={styles.key}>
                                    <span className={styles.value}>Company:</span>
                                    {data?.company_name}
                                </div>
                            </div>
                        </div>
                        <div className={styles.vertical}></div>
                        <div className={styles.left}>
                            <div className={styles.key}>
                                <span className={styles.value}>Reg Id:</span>
                                {data?.reg_id}
                            </div>

                            <div className={styles.key}>
                                <span className={styles.value}>Email:</span>
                                {data?.email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
)
};

export default UpperInfoComponent
