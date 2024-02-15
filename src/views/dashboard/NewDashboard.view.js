import React, { useEffect, useMemo } from "react";
import styles from "./Style.module.css";

import { useState } from "react";
import PendingEventUserRequest from "./components/WhereHouseTable/PendingEventUserRequest_view";
import PendingMemberRequest from "./components/WhereHouseTable/PendingMemberRequest_view";
import { serviceGetDashboard } from "../../services/Dashboard.service";

const NewDashboard = () => {
  const [data, setData] = useState([]);

  let params = {
    "index": 1,
    "order": null,
    "query": null,
    "query_data": null,
    "row": null
}

  useEffect(() => {
    let dataValues = serviceGetDashboard(params);
    dataValues
      .then((data) => {
        setData(data?.data);
      })
      .catch((err) => console.log(err));
  }, []);
 
  return (
    <div>
         <div className={styles.tableFlex212}>
        <div className={styles.dashboardFlex} style={{ width: "100%",display:'flex', flexWrap:"wrap" }}>
        <div className={styles.plainPaper}>
            <div className={styles.whiteFlex}>
              <div className={styles.imgBox}>
                <img
                  src={require("../../assets/img/ic_city@2x.png")}
                  height={50}
                />
              </div>
              <div>
                <div className={styles.number}>{data?.exhibitorCount}</div>
                <div className={styles.prcStatus} style={{ color: "#818181" }}>
                Exhibitors
                </div>
              </div>
            </div>
          </div>
          <div className={styles.plainPaper}>
            <div className={styles.whiteFlex}>
              <div className={styles.imgBox}>
                <img
                  src={require("../../assets/img/ic_state@2x.png")}
                  height={50}
                />
              </div>
              <div>
                <div className={styles.number}>{data?.appUserCount}</div>
                <div className={styles.prcStatus} style={{ color: "#818181" }}>
                App Users 
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles.plainPaper}>
            <div className={styles.whiteFlex}>
              <div className={styles.imgBox}>
                <img
                  src={require("../../assets/img/ic_organizing_committee@2x.png")}
                  height={50}
                />
              </div>
              <div>
                <div className={styles.number}>{data?.user}</div>
                <div className={styles.prcStatus} style={{ color: "#818181" }}>
                  Members
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className={styles.tableFlex21}>
        <div className={styles.lhsPending}>
          <PendingMemberRequest data={data}/>
        </div>
        <div className={styles.rhsInterview}>
          <PendingEventUserRequest data={data}/>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default NewDashboard;
