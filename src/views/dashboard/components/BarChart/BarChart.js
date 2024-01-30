import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './Style.module.css'

const data = [
    {
        name: 'Pending',
        orders: 0.2,
        color: '#556BF8'
    },
    {
        name: 'Picked Up',
        orders: 0.2,
        color: '#F855A7'
    },
    {
        name: 'Packed',
        orders: 1.0,
        color: '#B2F855'
    },
    {
        name: 'Dispatched',
        orders: 0.3,
        color: '#F57D7D'
    },
    {
        name: 'Others',
        orders: 0.4,
        color: '#60BDFB'
    },
]

const BarContainer = () => {
    return (
        <div className={styles.paperContainer}>
            <div className={styles.upperFlex}>
                <div>Status Wise Orders</div>
                <div className={styles.value}>This Month</div>
            </div>

            <div className={styles.upperContainer}>
                <div className={styles.barChart}>
                    <BarChartComponent/>
                </div>
                <div className={styles.rightInfo}>
                    <div className={styles.colorFlex}>
                        <div className={styles.infoFlex}>
                            <div className={styles.colorBox}></div>
                            Pending
                        </div>
                        <div>
                            0
                        </div>
                    </div>
                    <div className={styles.colorFlex}>
                        <div className={styles.infoFlex}>
                            <div className={styles.colorBox2}></div>
                            Picked Up
                        </div>
                        <div>
                            0
                        </div>
                    </div>
                    <div className={styles.colorFlex}>
                        <div className={styles.infoFlex}>
                            <div className={styles.colorBox3}></div>
                            Packed
                        </div>
                        <div>
                            0
                        </div>
                    </div>
                    <div className={styles.colorFlex}>
                        <div className={styles.infoFlex}>
                            <div className={styles.colorBox4}></div>
                            Dispatched
                        </div>
                        <div>
                            0
                        </div>
                    </div>
                    <div className={styles.colorFlex}>
                        <div className={styles.infoFlex}>
                            <div className={styles.colorBox5}></div>
                            Others
                        </div>
                        <div>
                            0
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

class BarChartComponent extends PureComponent {
    render() {
        // const {data} = this.props;
        return (
            <div style={{height:'350px',marginTop:'20px'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        {/*<CartesianGrid strokeDasharray="3 3" />*/}
                        <XAxis dataKey="name" />
                        <YAxis />
                        {/*<Tooltip />*/}
                        {/*<Legend />*/}
                        <Bar dataKey="orders" fill="#8884d8">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default BarContainer
