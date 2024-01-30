import React from 'react';
import styles from './style.module.css'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme, withStyles, withTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserView from '../../User.view';
import WorkProfile from '../../components/Work/WorkProfile.view'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import ShareIcon from '@material-ui/icons/Share';
import {Paper} from "@material-ui/core";
import {serviceGetCustomerDetail} from "../../../../services/ProviderUser.service";
import {serviceCreateUser, serviceUpdateUser} from "../../../../services/User.service";
import history from '../../../../libs/history.utils';
import WaitingComponent from "../../../../components/Waiting.component";
import EventEmitter from "../../../../libs/Events.utils";

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
                <div className={'container'}>
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

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            editData: null,
            isLoading: true,
            tabOneData: null,
            tabData: null,
            open: true,
            btnDisabled: true
        };
        this._handleUser = this._handleUser.bind(this);
        this._handleUserClick = this._handleUserClick.bind(this);
        this._handleDataSave = this._handleDataSave.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.match.params ? this.props.match.params : ''
        if (id && id != 'create')  {
            const req = serviceGetCustomerDetail({id: id});
            req.then((res) => {
                if (!res.error) {
                    this.setState({
                        editData: res.data,
                        isLoading: false,
                        btnDisabled: false
                    });
                }
            });
        } else {
            this.setState({
                isLoading: false,
            })
        }
    }


    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    _handleUser(data){
        // console.log('userdata',data)
        const { editData  } = this.state;
        this.setState({
            tabOneData: data,
            open: false,
            // userId: data._id,
            value: 1
        });
        if (editData) {
            data.append('id', editData.id)
            const req = serviceUpdateUser(data)
            req.then((res) => {
                if(!res.error) {
                    this.setState({
                        editData: res.data
                    })
                }
            })
        }
    }

    _handleUserClick(data){
        // console.log(id,data, 'data');
        const { tabOneData, editData } = this.state;
        let fd = tabOneData ? tabOneData : new FormData();
        if(fd) {
            Object.keys(data).forEach(key => {
               fd.append(key, data[key]);
            });
        }
        let  req = null;
        if (editData) {
            if (!fd.has('id')) {
                fd.append('id', editData.id)
            }
           req =  serviceUpdateUser(fd);
        } else {
            if (!tabOneData) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Enter data in first tab', type: 'error'});
                return true;
            }
            req = serviceCreateUser(fd);
        }
        req.then((res) => {
                if(!res.error) {
                    history.push('/users')}
        })
    }

    _handleDataSave(data){
        this.setState({
            editData: data,
        })
    }

    render() {
        const {classes, theme} = this.props;
        const {id} = this.props.match.params ? this.props.match.params : '';
        const {userId,open, editData, isLoading,project_type,btnDisabled,tabOneData} = this.state;
        console.log(btnDisabled)
        if (isLoading) {
            return (<WaitingComponent/>);
        }
        return (
            <div>
                <AppBar position="static" className={styles.backgroundColor}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        // centered
                        // aria-label="full width tabs example"
                    >
                        <Tab className={'iconTabs'} icon=<PersonOutlineIcon fontSize={'small'}/> label="Personal Info"{...a11yProps(0)} />
                        <Tab className={'iconTabs'} icon=<WorkOutlineIcon fontSize={'small'}/>  label="Work Info" {...a11yProps(1)} disabled={open && btnDisabled}/>
                        {/*<Tab className={'iconTabs'} icon=<ShareIcon fontSize={'small'}/> label="Social" {...a11yProps(2)} />*/}
                    </Tabs>
                </AppBar>

                <div className={styles.paperBackground}>
                    <TabPanel value={this.state.value} index={0} dir={theme.direction}>
                        <UserView editData={editData} id={id} handleUser = {this._handleUser} />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1} dir={theme.direction}>
                        <WorkProfile editData={editData} id={id} handleUserClick = {this._handleUserClick}/>
                    </TabPanel>
                </div>
            </div>
        )
    }
}

export default withTheme(ProfileView);

