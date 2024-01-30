import React from 'react';
import styles from './Style.module.css';

const DeliveryStatus = () => {
    return (
        <div className={'plainPaper'}>
            <div className={styles.heading}>Delivery Status For Today</div>
            <div className={styles.waybillFlex} style={{textAlign:'center'}}>
                <div className={styles.innerFlex}>
                    <div className={styles.info}>
                        <div>Delivered</div>
                        <div><b>0</b></div>
                    </div>
                </div>

                <div className={styles.innerFlex}>
                    <div className={styles.info}>
                        <div>Out For Delivery</div>
                        <div><b>0</b></div>
                    </div>
                </div>

                <div className={styles.innerFlex}>
                    <div className={styles.info}>
                        <div>Rescheduled</div>
                        <div><b>0</b></div>
                    </div>
                </div>

                <div className={styles.innerFlex}>
                    <div className={styles.info}>
                        <div>Call Verify</div>
                        <div><b>0</b></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryStatus
