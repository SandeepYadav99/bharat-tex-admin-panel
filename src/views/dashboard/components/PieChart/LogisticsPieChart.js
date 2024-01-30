import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer,Legend,Tooltip,Label,Text,LabelList } from 'recharts';
import styles from "./Style.module.css";

const data = [
    { name: 'Group A', value: 400,label:'Graphics' },
    { name: 'Group B', value: 300,label: 'Business' },
    { name: 'Group C', value: 300,label:'Lifestyle' },
];
const COLORS = ['#7DF585','#7D98F5','#F57D7D'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index,label }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const percRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const percX = cx + percRadius * Math.cos(-midAngle * RADIAN);
    const percY = cy + percRadius * Math.sin(-midAngle * RADIAN);

    return (
        <>
            <text x={percX} y={percY} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}`}
            </text>
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {label}
                {/*{`${(percent * 100).toFixed(0)}%`}*/}
            </text>
        </>

    );
};


const CustomTooltip = ({ active, payload, label }) => {
    console.log(active,payload,label)
    // if (active && payload && payload.length) {
    return (
        <div className="custom-tooltip">
            {/*<p className="label">{`${label} : ${payload[0].value}`}</p>*/}
            {/*<p className="intro">{getIntroOfPage(label)}</p>*/}
            <p className="desc">20%.</p>
        </div>
    );
    // }
}
const CustomizedMostPopularLabel =(props) =>{
    const { x, y, value } = props;
    return (
        <div>Hello</div>
    )
}
const LogisticsPieContainer = () => {
    return (
        <div className={styles.paperContainer}>
            <div className={styles.upperLogisticsFlex}>
                <div>Waybill Created For Today</div>
            </div>

            <div className={styles.colorFlex} style={{textAlign:'center'}}>
                <div>
                    <div className={styles.infoFlex}>
                        <div className={styles.logColorBox}></div>
                        Available
                    </div>
                    <b className={styles.logValue}>
                        0
                    </b>
                </div>

                <div>
                    <div className={styles.infoFlex} style={{textAlign:'center'}}>
                        <div className={styles.logColorBox2}></div>
                        Assigned
                    </div>
                    <b className={styles.logValue}>
                        0
                    </b>
                </div>

                <div>
                    <div className={styles.infoFlex} style={{textAlign:'center'}}>
                        <div className={styles.logColorBox3}></div>
                        Picked
                    </div>
                    <b className={styles.logValue}>
                        0
                    </b>
                </div>
            </div>
            <div>
                <LogisticsPieChart/>
            </div>
        </div>
    )
}

 class LogisticsPieChart extends PureComponent {
    render() {
        // const {heading, data}  = this.props
        return (
            <div style={{height:'200px'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400} isAnimationActive={false}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            // label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        {/*<Tooltip content={<CustomTooltip />} />*/}
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default LogisticsPieContainer
