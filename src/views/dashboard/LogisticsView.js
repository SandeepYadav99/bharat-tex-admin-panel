import React from 'react';
import styles from './Style.module.css';
import Waybill from "./components/LogisticsTable/Waybill.component";
import DeliveryStatus from "./components/LogisticsTable/DeliveryStatus.component";
import DeliveryAttempt from "./components/LogisticsTable/DeliveryAttempt.component";
import Courier from "./components/LogisticsTable/Courier.component";
import LogisticsPieChart from "./components/PieChart/LogisticsPieChart";
import ServiceBarContainer from "./components/BarChart/ServiceBarChart";
import WayBillsBarContainer from "./components/BarChart/WaybillsBarChart";
import DeliveryTab from "./components/LogisticsTable/DeliveryTab.component";

const LogisticsView = () => {


    return (
        <div>
            <div className={styles.logFlex}>

                <div className={styles.logLhs}>
                    <div>
                        <Waybill/>
                    </div>
                    <div>
                        <DeliveryStatus/>
                    </div>
                    <div>
                        <DeliveryAttempt/>
                    </div>
                </div>

                <div className={styles.logRhs}>
                    <div>
                        <LogisticsPieChart/>
                    </div>
                    <div>
                        <Courier/>
                    </div>
                </div>
            </div>

            <div className={styles.btmlogFlex}>
                <div className={styles.logCon}>
                    <WayBillsBarContainer/>
                </div>

                <div className={styles.logCons}>
                    <DeliveryTab/>
                </div>
            </div>

            <div>
                <ServiceBarContainer/>
            </div>
        </div>
    )
}

export default LogisticsView
