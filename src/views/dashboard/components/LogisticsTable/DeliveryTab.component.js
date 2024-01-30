import React from 'react';
import styles from './Style.module.css';
import {ButtonBase, MenuItem} from "@material-ui/core";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import TopDeliveriesTable from "./TopDeliveriesTable.component";

const UpperButtons = () => {
    const [type, setType] = React.useState('DELIVERY');

    const handleChangeType = (type) => {
        setType(type)
    }

    const _renderTabData = () => {
        if (type == 'DELIVERY') {
            return <TopDeliveriesTable/>
        } else {
            return
        }
    }

    return (
        <div>
            <div className={styles.whiteBg}>
                <div className={styles.upperFlex}>
                    <div className={styles.innerFlex}>
                        <ButtonBase
                            className={type == 'DELIVERY' ? styles.selected : styles.notSelected}
                            onClick={() => handleChangeType('DELIVERY')}><span className={styles.title}>Top Delivery Destinations</span>
                        </ButtonBase>
                    </div>

                    <div className={styles.innerFlex} style={{marginLeft: '50px'}}>
                        <ButtonBase
                            className={type == 'CUSTOMERS' ? styles.selected : styles.notSelected}
                            onClick={() => handleChangeType('CUSTOMERS')}><span className={styles.title}>Top Customers</span>
                        </ButtonBase>

                    </div>
                </div>

                {type == 'DELIVERY' && <div className={styles.warehouse}>
                    <CustomSelectField
                        label={'Time Period'}
                        // value={form?.warehouse}
                        handleChange={value => {
                            //    handleChangeWareHouse(value);
                        }}
                    >
                        <MenuItem value={'THIS_MONTH'}>This Month</MenuItem>
                    </CustomSelectField>
                </div>}
            </div>

            {_renderTabData()}
        </div>
    )
}

export default UpperButtons
