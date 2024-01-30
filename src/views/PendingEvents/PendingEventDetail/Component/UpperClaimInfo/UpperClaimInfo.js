import React from "react";
import styles from "./Style.module.css";
import StatusPill from "../../../../../components/Status/StatusPill.component";
// import image from "../../../../../assets/img/download.png";

function UpperClaimInfo({ data }) {
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.mainFlex}>
          <div className={styles.left221}>
            <div className={styles.imgCont}>
              <div className={styles.upper}>
                <div className={styles.title}>Banner</div>
                <img
                  className={styles.bngImg}
                  src={data?.banner && data?.banner}
                  alt="Banner"
                />
              </div>
              <div className={styles.lower}>
                <div>
                  <div className={styles.title}>Thumbnail</div>
                  <img
                    className={styles.logoImg}
                    src={data?.thumbnail && data?.thumbnail}
                    alt="Thumbnail"
                  />
                </div>
                <div>
                  <div className={styles.title}>Logo</div>
                  <img
                    className={styles.logoImg}
                    src={data?.logo && data?.logo}
                    alt="Logo"
                  />
                </div>
              </div>
            </div>
            <div className={styles.HeaderWrap}>
              <div className={styles.event}>Event Details</div>
              <div className={styles.key}>
                <span className={styles.value}>Title:</span>
                {data?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Dates:</span>
                {data?.startDateText}-{data?.endDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Admin:</span>
                {data?.admin?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Registration Status:</span>
                {data?.registration_status ? "Open" : "Close"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Digital Event:</span>
                {data?.is_digital ? "Yes" : "No"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Related Events:</span>
                {data?.relatedEvents?.map((item) => (
                  <span className={styles.relatedwra}>{item?.name}</span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.left}>
            <div className={styles.key21}>
              <span className={styles.value}>Organized By:</span>
              {data?.organisedBy?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Location:</span>
              {data?.location}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Event URL:</span>
              <a
                href={data?.url}
                target="_blank"
                className={styles.hyperlinkText}
              >
                {data?.url}
              </a>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Event Registration URL:</span>
              <a
                href={data?.registration_url}
                target="_blank"
                className={styles.hyperlinkText}
              >
                {data?.registration_url}
              </a>
            </div>
            <div className={styles.key} style={{ marginTop: "15px" }}>
              <span className={styles.value}>Status:</span>
              {<StatusPill status={data?.status} />}
            </div>
          </div>
        </div>
        <div className={styles.vertLine}></div>
        <div>
          <div className={styles.keylower}>
            <div className={styles.value}>About Event:</div>
            <div>{data?.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperClaimInfo;
