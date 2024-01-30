import React from 'react';
import styles from './Style.module.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundImage: 'linear-gradient(265deg , #AB183D,#E56056 )'
    },
}))(LinearProgress)

const LocationCard = ({data}) => {
    return (
        <div className={styles.locationCont}>
            <div className={styles.plainPaper}>
                <div className={styles.name}>{data?.name}</div>

                <div className={styles.mainFlex}>
                    <div>
                        <div className={styles.empImg}><img src={require("../../../../assets/img/ic_employees@2x.png")} height={20}/> </div>
                        <div>
                            <div className={styles.title}>No. Of Employees</div>
                            <div className={styles.value}>{data?.employees}</div>
                        </div>
                    </div>

                    <div style={{marginLeft:'40px'}}>
                        <div className={styles.empImg}><img src={require("../../../../assets/img/ic_vacancy@2x.png")} height={20}/> </div>
                        <div>
                            <div className={styles.title}>No. Of Vacancy</div>
                            <div className={styles.value}>{data?.vacancies}</div>
                        </div>
                    </div>
                </div>

                {/* <div>
                    <div className={styles.txt}>Vacancy Rate</div>
                    <div className={styles.barFlex}>
                        <div className={styles.bar}>
                            <BorderLinearProgress variant="determinate" value={50} />
                        </div>
                        <div className={styles.per}>50 %</div>
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default LocationCard
