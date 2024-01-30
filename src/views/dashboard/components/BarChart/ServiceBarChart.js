import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './Style.module.css'
import {MenuItem} from "@material-ui/core";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";

const data = [
    {
        name: 'COD',
        orders: 0.2,
        color: '#556BF8'
    },
    {
        name: 'PICK & DELIVER',
        orders: 0.2,
        color: '#F855A7'
    },
    {
        name: 'EXPRESS',
        orders: 1.0,
        color: '#B2F855'
    },
]

const ServiceBarContainer = () => {
    return (
        <div className={styles.paperContainer}>
            <div className={styles.upperFlex} style={{alignItems:'center'}}>
                <div>Service Wise Shipments</div>
                <div className={styles.serviceBox}>
                    <CustomSelectField
                        label={'Time Period'}
                        // value={form?.warehouse}
                        handleChange={value => {
                            //    handleChangeWareHouse(value);
                        }}
                    >
                        <MenuItem value={'THIS_MONTH'}>This Month</MenuItem>
                    </CustomSelectField>
                </div>
            </div>

            <div className={styles.upperContainer}>
                <div className={styles.barChart}>
                    <ServiceBarChartComponent/>
                </div>
                <div className={styles.rightInfo} style={{flex:0.5}}>
                    <div className={styles.serviceColorFlex}>
                        <div className={styles.infoFlex}>
                            <div className={styles.colorBox}></div>
                            COD
                        </div>
                        <div>
                            0
                        </div>
                    </div>
                    <div  className={styles.serviceColorFlex}>
                        <div className={styles.infoFlex}>
                            <div className={styles.colorBox2}></div>
                            PICK & DELIVER
                        </div>
                        <div>
                            0
                        </div>
                    </div>
                    <div  className={styles.serviceColorFlex}>
                        <div className={styles.infoFlex}>
                            <div className={styles.colorBox3}></div>
                             EXPRESS
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

class ServiceBarChartComponent extends PureComponent {
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

export default ServiceBarContainer
