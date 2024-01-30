import React from 'react';
import styles from './Style.module.css';

const DeliveryAttempt = () => {
    return (
        <div className={'plainPaper'}>
            <div className={styles.heading}>Delivery Attempt Success Count</div>
            <div className={styles.waybillFlex}>

                <div className={styles.innerFlex}>
                    <div className={styles.innerFlex}>
                        <img src={require('../../../../assets/img/ic_delivery@2x.png')} className={styles.waybillImg}/>
                    </div>
                    <div className={styles.info} style={{marginLeft:'50px'}}>
                        <div>1st</div>
                        <div><b>0</b></div>
                    </div>
                </div>

                <div className={styles.innerFlex}>
                    <div className={styles.info}>
                        <div>2nd</div>
                        <div><b>0</b></div>
                    </div>
                </div>

                <div className={styles.innerFlex}>
                    <div className={styles.info}>
                        <div>3rd</div>
                        <div><b>0</b></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryAttempt
