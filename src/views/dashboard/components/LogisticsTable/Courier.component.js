import React from 'react';
import styles from './Style.module.css';

const Courier = () => {
    return (
        <div className={'plainPaper'}>
            <div className={styles.heading}>Courier</div>
            <div className={styles.waybillFlex}>
                <div className={styles.innerFlex}>
                    <img src={require('../../../../assets/img/ic_courier@2x.png')} className={styles.waybillImg}/>
                </div>

                <div className={styles.innerFlex}>
                    <div className={styles.info}>
                        <div>On Duty</div>
                        <div><b>0</b></div>
                    </div>
                </div>

                <div className={styles.innerFlex}>
                    <div className={styles.info}>
                        <div>Off Duty</div>
                        <div><b>0</b></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Courier
