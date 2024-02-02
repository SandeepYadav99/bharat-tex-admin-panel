import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Login.module.css";
import { Button, withStyles, ButtonBase } from "@material-ui/core";
import DashboardSnackbar from "../../components/Snackbar.component";
import { Link } from "react-router-dom";

import EventEmitter from "../../libs/Events.utils";
import { updateTitle } from "../../libs/general.utils";
import LoginViewForm from "./components/LoginView.view";
import OtpView from "./components/Otp.view";
import { serviceLoginUser } from "../../services/index.services";
import { actionLoginUser } from "../../actions/auth_index.action";

const validate = (values) => {
  const errors = {};
  const requiredFields = ["email", "password"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const useStyles = {
  btnColor: {
    backgroundColor: "white",
    marginTop: "20px",
    paddingLeft: "20px",
    color: "#2196F3",
    marginRight: "15px",
    paddingRight: "20px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  btnBottom: {
    backgroundColor: "white",
    paddingLeft: "20px",
    color: "#2196F3",
    marginRight: "10px",
    marginLeft: "15px",
    paddingRight: "20px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  dialog: {
    padding: "10px 25px",
  },
  colorButton: {
    color: "white",
    backgroundColor: "#1cb496",
    padding: "12px 50px",
    minWidth: "185px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    "&:hover": {
      color: "white",
      backgroundColor: "#1cb496",
    },
  },
};

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: false,
      is_checked: false,
      showOTP: false,
      contact: "",
      country_code: "",
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleForgotPassword = this._handleForgotPassword.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
  }

  _sendOTPRequest = () => {
    this.setState({ showOTP: true });
  };

  _handleLogin(contact, country_code) {
    this.setState({
      contact: contact,
      country_code: country_code,
      showOTP: true,
    });
  }

  async componentDidMount() {
    updateTitle("Login");
  }

  _handleSubmit(data) {
    serviceLoginUser(data).then((val) => {
      if (!val.error) {
        this.props.actionLoginUser(val.data);
      } else {
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
          error: "Invalid Credentials! Please verify.",
          type: "error",
        });
      }
    });
  }

  _handleChange() {
    this.setState({
      is_checked: !this.state.is_checked,
    });
  }

  _handleForgotPassword() {
    this.props.history.push("/forgot/password");
  }

  render() {
    const { handleSubmit, classes } = this.props;
    const { contact, country_code } = this.state;
    return (
      // <div className={'login'}>
      // <div className={styles.mainLoginView}>
      //     <div className={styles.loginFlex1}>
      //         <div className={styles.innerText}>

      //         </div>
      //     </div>
      //     <div className={styles.loginFlex2}>
      //         <div></div>
      //         <div className={styles.signContainer}>
      //             <div className={styles.logo}>
      //                 <img src={require('../../assets/img/credai_logo@2x.png')} height={110}/>
      //             </div>
      //             <div className={styles.title}>
      //                 <div>Cherise App Admin</div>
      //             </div>

      //             {this.state.showOTP ? <OtpView contact={contact} country_code={country_code} /> : (<LoginViewForm handleLogin={this._handleLogin}/>)}
      //         </div>
      //         <div>

      //         </div>
      //     </div>
      //     <DashboardSnackbar/>
      // </div>
      // </div>
      <div className={"login"}>
        <div className={styles.mainLoginView}>
          <div className={styles.loginFlex1}></div>
          <div className={styles.loginFlex2}>
            <div className={styles.signContainer}>
              <div className={styles.logoImg}>
                <img
                  src={require("../../assets/img/Bharat_tax_logo.png")}
                  className={styles.sky}
                />
              </div>
              <h1 className={styles.headingText}>Login</h1>
              <div className={styles.newLine} />
              <br />
              <div className={styles.des}>
                Enter your phone number to receive OTP
              </div>
              <br />
              {this.state.showOTP ? (
                <OtpView contact={contact} country_code={country_code} />
              ) : (
                <LoginViewForm handleLogin={this._handleLogin} />
              )}
            </div>

            <div className={styles.privacyLinks}></div>
          </div>
          <DashboardSnackbar />
        </div>
      </div>
    );
  }
}

LoginView = reduxForm({
  form: "LoginPage", // a unique identifier for this form
  validate,
  onSubmitFail: (errors) => {
    EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
      error: "Please enter Credentials",
      type: "error",
    });
  },
})(LoginView);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actionLoginUser: actionLoginUser,
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(LoginView));
