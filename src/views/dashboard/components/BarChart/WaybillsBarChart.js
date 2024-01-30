import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './Style.module.css'
import {MenuItem} from "@material-ui/core";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";

const data = [
    {
        name: 'At Origin',
        orders: 0.2,
        color: '#556BF8'
    },
    {
        name: 'At Warehouse',
        orders: 1.0,
        color: '#F57D98'
    },
    {
        name: 'RTO',
        orders: 0.3,
        color: '#53CA64'
    },
    {
        name: 'Undelivered',
        orders: 0.4,
        color: '#60BDFB'
    },
]

const WayBillsBarContainer = () => {
    return (
        <div className={styles.paperContainer}>
            <div className={styles.upperFlex} style={{alignItems:'center'}}>
                <div>Waybills at Warehouse Stock</div>
                <div className={styles.waybillBox}>
                    <CustomSelectField
                        label={'Warehouse'}
                        // value={form?.warehouse}
                        handleChange={value => {
                            //    handleChangeWareHouse(value);
                        }}
                    >
                        <MenuItem value={'MOMBASA'}>MOMBASA</MenuItem>
                    </CustomSelectField>
                </div>
            </div>

            <div className={styles.upperContainer}>
                <div className={styles.barChart}>
                    <WaybillsBarChartComponent/>
                </div>
                <div className={styles.rightInfo} style={{flex:0.5}}>
                    <div className={styles.serviceColorFlex}>
                        <div className={styles.infoFlex}>
                            <div className={styles.wayColorBox}></div>
                            At Origin
                        </div>
                        <div>
                            0
                        </div>
                    </div>
                    <div  className={styles.serviceColorFlex}>
                        <div className={styles.infoFlex}>
                            <div className={styles.wayColorBox2}></div>
                            At Warehouse
                        </div>
                        <div>
                            0
                        </div>
                    </div>
                    <div  className={styles.serviceColorFlex}>
                        <div className={styles.infoFlex}>
                            <div className={styles.wayColorBox3}></div>
                           RTO
                        </div>
                        <div>
                            0
                        </div>
                    </div>
                    <div  className={styles.serviceColorFlex}>
                        <div className={styles.infoFlex}>
                            <div className={styles.wayColorBox4}></div>
                            Undelivered
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

class WaybillsBarChartComponent extends PureComponent {
    render() {
        // const {data} = this.props;
        return (
            <div style={{height:'200px',marginTop:'20px'}}>
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

export default WayBillsBarContainer
