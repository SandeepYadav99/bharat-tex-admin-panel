import React from "react";
import styles from "./Style.module.css";

function InformationCard({
  heading,
  imageUrl,
  productLink,
  data,
  imageachorTag,
  customClass,
  isClaimPage,
}) {
  return (
    <div>
      <div className={styles.employeeInducationWrapper}>
        <div>
          <div>
            <span className={styles.title}>{heading}</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <p className={styles.contentFormat}>{data?.firstRow}</p>
              <p className={styles.contentFormat}>{data?.secondRow}</p>
              <p className={styles.contentFormat}>{data?.thirdRow}</p>
              <p className={styles.contentFormat}>{data?.forthRow}</p>
              <p className={styles.contentFormat}>{data?.fifthRow}</p>
              {isClaimPage && (
                <p className={styles.contentFormat}>
                  For any inputs/ideas/suggestions/feedback please write to 
                   <span className={styles.hyperlinkText}>  hr.ho@indswiftlabs.com</span>
                </p>
              )}
            </div>

            {!isClaimPage && (
              <div className={styles.imageWrapper}>
                <img
                  className={customClass ? customClass : styles.image}
                  src={imageUrl ? imageUrl : ""}
                />

                {imageachorTag ? (
                  <a
                    className={styles.achorTag}
                    target="_blank"
                    href={imageachorTag}
                  >
                    {productLink}
                  </a>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationCard;
