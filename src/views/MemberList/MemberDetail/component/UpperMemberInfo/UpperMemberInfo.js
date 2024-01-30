import React from "react";
import styles from "./Style.module.css";
// import image from "../../../../../assets/img/download.png";

function UpperMemberInfo({ data }) {
  console.log("data", data);
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.heading}>Company Profile</div>
        <div className={styles.mainFlex}>
          <div className={styles.left221}>
            <div>
              <img
                className={styles.claimimg}
                src={data?.image && data?.image}
                alt="Image"
              />
            </div>
            <div>
              <div className={styles.key}>
                <span className={styles.value}>Company Name:</span>
                {data?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Membership ID:</span>
                {data?.code}
              </div>
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Website:</span>
              <a
                href={data?.url}
                target="_blank"
                className={styles.hyperlinkText}
              >
                {data?.url}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperMemberInfo;
