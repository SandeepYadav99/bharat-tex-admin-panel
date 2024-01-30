import React from "react";
import styles from "./Style.module.css";
// import image from "../../../../../assets/img/download.png";

function UpperInfo({ data }) {
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.mainFlex}>
          <div className={styles.left221}>
            <div>
              <img
                className={styles.claimimg}
                src={data?.image && data?.image}
              />
            </div>
            <div>
              <div className={styles.key}>
                <span className={styles.value}>State Chapter Name::</span>
                {data?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Code:</span>
                {data?.code}
              </div>
              
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>City Chapter Count:</span>
              {data?.cityChapterCount}
            </div>
            
            <div className={styles.key}>
              <span className={styles.value}>Admin Name:</span>
              {data?.admin?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperInfo;
