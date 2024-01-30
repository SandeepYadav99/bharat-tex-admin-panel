import React from 'react';
import styles from './Style.module.css';
import HomeIcon from "@material-ui/icons/Home";
import {ButtonBase, MenuItem} from "@material-ui/core";
import {Refresh, Replay} from "@material-ui/icons";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import WarehouseView from "../../WarehouseView";
import LogisticsView from "../../LogisticsView";

const UpperButtons = () => {
    const [type, setType] = React.useState('WAREHOUSE');

    const handleChangeType = (type) => {
        setType(type)
    }

    const _renderTabData = () => {
        if (type == 'WAREHOUSE') {
            return <WarehouseView/>
        } else {
            return <LogisticsView/>
        }
    }

    return (
        <div>
            <div className={styles.whiteBg}>
                <div className={styles.upperFlex}>
                    <div className={styles.innerFlex}>
                        <ButtonBase
                            className={type == 'WAREHOUSE' ? styles.selected : styles.notSelected}
                            onClick={() => handleChangeType('WAREHOUSE')}><HomeIcon fontSize={'small'}/> <span className={styles.title}>WAREHOUSE</span>
                        </ButtonBase>
                        <ButtonBase><Refresh fontSize={'small'} className={styles.refresh}/></ButtonBase>
                    </div>

                    <div className={styles.innerFlex} style={{marginLeft: '50px'}}>
                        <ButtonBase
                            className={type == 'LOGISTICS' ? styles.selected : styles.notSelected}
                            onClick={() => handleChangeType('LOGISTICS')}><LocalShippingIcon fontSize={'small'}/> <span className={styles.title}>LOGISTICS</span>
                        </ButtonBase>
                        <ButtonBase><Refresh fontSize={'small'} className={styles.refresh}/></ButtonBase>
                    </div>
                </div>

                {type == 'WAREHOUSE' && <div className={styles.warehouse}>
                    <CustomSelectField
                        label={'Select Warehouse'}
                        // value={form?.warehouse}
                        handleChange={value => {
                            //    handleChangeWareHouse(value);
                        }}
                    >
                        <MenuItem value={'ALL'}>ALL</MenuItem>
                    </CustomSelectField>
                </div>}
            </div>

            {_renderTabData()}
        </div>
    )
}

export default UpperButtons
