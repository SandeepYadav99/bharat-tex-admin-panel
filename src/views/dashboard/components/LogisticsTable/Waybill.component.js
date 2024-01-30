import React from 'react';
import styles from './Style.module.css';

const Waybill = () => {
    return (
        <div className={'plainPaper'}>
            <div className={styles.heading}>Waybill Created For Today</div>
            <div className={styles.waybillFlex}>
                <div className={styles.innerFlex}>
                    <img src={require('../../../../assets/img/ic_count@2x.png')} className={styles.waybillImg}/>
                    <div className={styles.info}>
                        <div>Waybill Count</div>
                        <div><b>0</b></div>
                    </div>
                </div>

                <div className={styles.innerFlex}>
                    <img src={require('../../../../assets/img/ic_amount@2x.png')} className={styles.waybillImg}/>
                    <div className={styles.info}>
                        <div>Waybill Amount</div>
                        <div><b>0</b></div>
                    </div>
                </div>

                <div className={styles.innerFlex}>
                    <img src={require('../../../../assets/img/ic_weight@2x.png')} className={styles.waybillImg}/>
                    <div className={styles.info}>
                        <div>Waybill Weight</div>
                        <div><b>0</b></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Waybill
