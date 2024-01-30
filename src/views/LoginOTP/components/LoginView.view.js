import React from 'react';
import styles from './Style.module.css'
import {Field,reduxForm} from "redux-form";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {renderCountryContact} from '../../../libs/redux-material.utils';
import parsePhoneNumber from "libphonenumber-js";
import {ButtonBase} from "@material-ui/core";
import EventEmitter from "../../../libs/Events.utils";
import DashboardSnackbar from "../../../components/Snackbar.component";
import { serviceRequestOtp } from '../../../services/index.services';

const validate = (values) => {
    const errors = {};
    const requiredFields = ['contact'];

    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
    if (values.contact) {
        const phoneNumber = parsePhoneNumber(values.contact)
        // console.log('phoneNumber', phoneNumber, (phoneNumber && phoneNumber.isValid()));
        if (phoneNumber) {
            if (phoneNumber.isValid() === false) {
                errors.contact = 'Invalid Number';
            }
        } else {
            errors.contact = 'Invalid Number';
        }
    }
    return errors;
};



const LoginView = (props) => {
    const {handleSubmit,country_code} = props;

    const _handleSubmit = async (data) => {
        let tempContact = data.contact.split(" ")
        let temp = tempContact[1].replace('-','');
        const modifiedContact = data?.contact.replace(/[+-]/g, '')
        console.log('temp',tempContact,temp,data)
        const request = await serviceRequestOtp({contact: modifiedContact});
        if (!request.error) {
            props.handleLogin(temp,tempContact[0])
        } else {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
                    error: request.message,
                    type: 'error'
                });
        }

        // if (!request.error) {
        //     const rData = request.data;
        //     props.handleLogin(rData.contact,rData.country_code)
        // } else {
        //     EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
        //         error: request.message,
        //         type: 'error'
        //     });
        // }
    }

    return(
        <div>
            <form onSubmit={handleSubmit(_handleSubmit)}>
               <div>
                   <Field fullWidth={true}
                          name="contact"
                          component={renderCountryContact}
                          margin={'dense'}
                          country_code={'IN'}
                          label="Enter your Mobile Number"
                           // errorText="Required"
                   />
               </div>
                <br/>
                <br/>
                <div className={'text-center'}>
                    <ButtonBase className={styles.login} type={'submit'}>
                        Proceed
                    </ButtonBase>
                </div>
            </form>
            <DashboardSnackbar/>
        </div>
    )
}

const temp = reduxForm({
    form: 'login',
    validate
})(LoginView)

function mapStateToProps(state) {
    return {
        is_authenticated: state.auth.is_authenticated,
        country_code: state.auth.country_code,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(temp)
