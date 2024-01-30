import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './Style.module.css';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useDispatch} from "react-redux";
import history from '../../libs/history.utils';
import {Button, ButtonBase} from "@material-ui/core";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import HomeIcon from '@material-ui/icons/Home';
import WarehouseView from "./WarehouseView";
import LogisticsView from "./LogisticsView";
import UpperButtons from "./components/UpperButtons/UpperButtons.view";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            // aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    <div className={styles.innerContainer}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
})

const ProductTabInfo = ({location}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
        // history.push(`?tab=${(newValue)}`);
    }, [setValue, value]);

    useEffect(() => {

    }, []);


    return(
        <div>
            <div className={'container'}>
                <div>
                    <AppBar position="static" className={styles.backgroundColor}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"

                        >
                            <Tab className={'iconTabs'} icon=<HomeIcon fontSize={'small'}/> label="Warehouse" />
                            <Tab className={'iconTabs'} icon=<LocalShippingIcon fontSize={'small'}/> label="Logistics" />
                        </Tabs>
                    </AppBar>

                    <div className={styles.paperBackground}>
                        <TabPanel  value={value} index={0} dir={"ltr"}>
                            <UpperButtons/>
                            <WarehouseView/>
                        </TabPanel>
                        <TabPanel  value={value} index={1} dir={"ltr"}>
                            <LogisticsView/>
                        </TabPanel>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ProductTabInfo
