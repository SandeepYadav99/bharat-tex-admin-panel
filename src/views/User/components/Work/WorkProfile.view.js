import React, {Component} from 'react';
import startsWith from 'lodash.startswith';
import {Button, MenuItem, withStyles, FormControlLabel, Switch, IconButton, Paper} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import {
    renderOutlinedSelectField,
    renderDatePicker,
    renderOutlinedTextField,
    renderCheckbox, renderCascader
} from '../../../../libs/redux-material.utils';
import EventEmitter from "../../../../libs/Events.utils";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import styles from './Style.module.css';
import {bindActionCreators} from "redux";
import history from '../../../../libs/history.utils';
import {serviceUnitCheck} from "../../../../services/Unit.service";
import {serviceUserCheck, serviceUserCountryList, serviceUserManagerList} from "../../../../services/User.service";
import Cascader from "../../../../components/FormFields/Cascader/Cascader";
// import {serviceProviderUserCheck} from "../../services/User.service";

let requiredFields = [];
const validate = (values) => {
    const errors = {};
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
};

const countNormalize = (value, prevValue) => {
    if (value.length > 500) {
        return prevValue;
    }
    return value;
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


let lastValue = '';
let isExists = false;

const asyncValidate = (values, dispatch, props) => {
    return new Promise((resolve, reject) => {
        if (values.emp_id) {
            const value = values.emp_id;
            if (lastValue == value && isExists && false) {
                reject({emp_id: 'Employee Id already Taken'});
            } else {
                const data = props.editData;
                serviceUserCheck({emp_id: value, id: data ? data.id : null }).then((data) => {
                    console.log(data);
                    lastValue = value;
                    if (!data.error) {
                        if (data.data.emp_id) {
                            reject({emp_id: 'Employee Id already Taken'});
                        }
                    }
                    resolve({});
                })
            }
        } else {
            resolve({});
        }
    });
};

class WorkProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_active: true,
            show_confirm: false,
            managers: [],
            countriesData: [],
            country: null
        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleFileChange = this._handleFileChange.bind(this);
        this._handleActive = this._handleActive.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleDialogClose = this._handleDialogClose.bind(this);
        this._suspendItem = this._suspendItem.bind(this);
    }

    componentDidMount() {
        const {data, isEdit} = this.props;
        const request = serviceUserManagerList();
        request.then((data)=> {
            if(!data.error){
                this.setState({
                    managers: data.data
                })
            }
        })



        const {editData} = this.props;
        const countryReq = serviceUserCountryList();
        countryReq.then((data)=> {
            if(!data.error){
                this.setState({
                    countriesData: data.data
                })
            }
            if (editData?.country && editData?.region){
                const country = [editData.country, editData.region]
                this.setState({
                    country: country
                });
                this.props.change('country', country);
            }
        })
        // console.log(editData)
        if (editData) {
            requiredFields = ['emp_id'];
            Object.keys(editData).forEach((key) => {
                if (['emp_id', 'designation', 'department','doj','manager_id','is_manager'].indexOf(key) >= 0) {
                    this.props.change(key, editData[key]);
                }
            });

        } else {
            requiredFields = ['emp_id'];
        }

        if (!isEdit) {
            this.props.change('doj', new Date());
        }
    }

    _handleSubmit(tData) {
        console.log('work profile', tData);
        // history.push('/users')
        const {id,editData} = this.props;
        // const {country} = this.state
        const country = tData.country;
        const fd = new FormData();
        Object.keys(tData).forEach((key) => {
            fd.append(key, tData[key]);
        });
        if (country) {
            tData['country_id'] = country[0].value;
            tData['region_id'] = country[1].value;
        }
        if (!editData) {
            this.props.handleUserClick(tData);
        } else {
            this.props.handleUserClick(tData);
        }
    }

    _handleActive() {
        this.setState({
            is_active: !this.state.is_active,
        });
    }


    _handleFileChange(file) {
        this.setState({
            company_proof: file
        })
    }

    _renderActive() {
        const {data} = this.props;
        if (data) {
            return (<FormControlLabel
                control={
                    <Switch color={'primary'} checked={this.state.is_active} onChange={this._handleActive.bind(this)}
                            value="is_active"/>
                }
                label="Active ?"
            />);
        } else {
            return null
        }
    }

    _suspendItem() {
        const {data} = this.props;
        this.setState({
            show_confirm: false,
        });
        this.props.handleDelete(data.id);
    }

    _handleDialogClose() {
        this.setState({
            show_confirm: false,
        })
    }


    _handleDelete() {
        this.setState({
            show_confirm: true
        });
    }


    _renderDialog() {
        const {classes} = this.props;
        if (this.state.show_confirm) {
            return (<Dialog
                keepMounted
                TransitionComponent={Transition}
                open={this.state.show_confirm}
                onClose={this._handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{paper: classes.dialog}}
            >
                <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete the item?
                        <br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this._handleDialogClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this._suspendItem} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>)
        } return null;
    }


    render() {
        const {managers} = this.state;
        const {handleSubmit, data} = this.props;
        return (
            <div>

                <form onSubmit={handleSubmit(this._handleSubmit)} className={styles.userForm}>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="emp_id"
                                //type={'number'}
                                   component={renderOutlinedTextField}
                                   margin={'dense'}
                                   label="Employee ID"/>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name='doj'
                                   component={renderDatePicker}
                                   margin={'dense'}
                                   label="Date of Joining"
                                   ampm={false}
                                   inputId={'doj'}
                                   maxDate={new Date()}
                            />
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="country"
                                component={renderCascader}
                                label={'Country/Region/City'}
                                options={this.state.countriesData}
                            />
                        {/*<Cascader*/}
                        {/*    value={this.state.country}*/}
                        {/*    label={'Country/Region'}*/}
                        {/*    options={this.state.countriesData}*/}
                        {/*    handleChange={value => {*/}
                        {/*        // console.log(value)*/}
                        {/*        this.setState({*/}
                        {/*            country: value*/}
                        {/*        })*/}
                        {/*        //changeTextData(value, 'category')/*/}
                        {/*    }}*/}
                        {/*/>*/}
                        </div>
                    </div>

                    {/*<div className={'formFlex'}>*/}
                    {/*    <div className={'formGroup'}>*/}
                    {/*        <Field fullWidth={true}*/}
                    {/*               name="country_id"*/}
                    {/*               component={renderOutlinedSelectField}*/}
                    {/*               margin={'dense'}*/}
                    {/*               label="Country/Region">*/}
                    {/*            <MenuItem value={'INDIA'}>INDIA</MenuItem>*/}
                    {/*        </Field>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="department"
                                   component={renderOutlinedSelectField}
                                   margin={'dense'}
                                   label="Department">
                                <MenuItem value={'A'}>A</MenuItem>
                                <MenuItem value={'B'}>B</MenuItem>
                            </Field>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="designation"
                                   component={renderOutlinedSelectField}
                                   margin={'dense'}
                                   label="Designation">
                                <MenuItem value={'A'}>A</MenuItem>
                                <MenuItem value={'B'}>B</MenuItem>
                            </Field>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="manager_id"
                                   component={renderOutlinedSelectField}
                                   margin={'dense'}
                                   label="Manager">
                                {managers.map(val => {
                                    return (<MenuItem value={val.id} key={val.id}><div className={styles.mgrContainer}>{val.image ? <img src={val.image} className={styles.mgrImg}/> : '' }{val.first_name}</div></MenuItem>);
                                })}
                            </Field>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                    <div className="formGroup">
                        <Field
                            fullWidth={true}
                            name="is_manager"
                            component={renderCheckbox}
                            margin={'dense'}
                            label="Is a Manager"/>
                    </div>
                    </div>

                    {/*{this._renderActive()}*/}

                    <div className={styles.saveButton}>
                        <Button variant={'contained'} color={'primary'} type={'submit'}>
                            Save
                        </Button>
                    </div>
                </form>
                {/*{this._renderDialog()}*/}

            </div>
        )
    }
}

const useStyle = theme => ({
    iconBtnError: {
        color: theme.palette.error.dark
    }
});


const ReduxForm = reduxForm({
    form: 'works',  // a unique identifier for this form
    validate,
    asyncValidate,
    enableReinitialize: true,
    onSubmitFail: errors => {
        console.log('onSubmitFial', errors);
    }
    // onSubmitFail: errors => {
    //     EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please enter values', type: 'error'});
    // }
})(withStyles(useStyle, {withTheme: true})(WorkProfile));

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);
