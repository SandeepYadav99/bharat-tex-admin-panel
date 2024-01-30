import React from "react";
import styles from "./Style.module.css";
function CityMemUpper({ data }) {
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
                <span className={styles.value}>City Chapter Name:</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityMemUpper;
