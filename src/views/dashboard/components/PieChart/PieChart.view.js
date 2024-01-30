import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import styles from "./Style.module.css";

const data = [
    { name: 'Group A', value: 0 },
    { name: 'Group B', value: 20 },
    { name: 'Group C', value: 40 },
    { name: 'Group D', value: 60 },
    { name: 'Group E', value: 80 },
    { name: 'Group F', value: 100 },
];
const COLORS = ['#c68af5', '#66c0b8', '#2bb2dc', '#8764b3','#378dda'];

const PieContainer = () => {
    return (
        <div className={styles.paperContainer}>
            <div className={styles.upperFlex}>
                <div>Inventory Status</div>
            </div>

            <div className={styles.allFlex}>
                <div>All Items</div>
                <div><b>0</b></div>
            </div>
            <div className={styles.colorFlex}>
                <div className={styles.infoFlex}>
                    <div className={styles.colorBox}></div>
                    Low Stock Items
                </div>
                <b>
                    0
                </b>
            </div>
            <div>
                <PieChartView/>
            </div>
        </div>
    )
}

class PieChartView extends PureComponent {
    render() {
        return (
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
            <PieChart
                width={100} height={100}>
                <Pie
                    data={data}
                    // cx={50}
                    // cy={50}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={'#F57D7D'} />
                    ))}
                </Pie>
            </PieChart>
                 </ResponsiveContainer>
             </div>
        );
    }
}

export default PieContainer
