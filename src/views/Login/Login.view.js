import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Login.module.css";
import {
  renderCountryContact,
  renderOutlinedPasswordField,
  renderOutlinedTextField,
  renderTextField,
} from "../../libs/redux-material.utils";
import { Button, withStyles, ButtonBase } from "@material-ui/core";
import { serviceLoginUser } from "../../services/index.services";
import { actionLoginUser } from "../../actions/auth_index.action";
import DashboardSnackbar from "../../components/Snackbar.component";
import EventEmitter from "../../libs/Events.utils";
import { updateTitle } from "../../libs/general.utils";
import history from "../../libs/history.utils";
import SnackbarUtils from "../../libs/SnackbarUtils";

const validate = (values) => {
  const errors = {};
  const requiredFields = ["email", "password"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
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
    color: "black",
    backgroundColor: "white",
    padding: "10px 60px",
    minWidth: "170px",
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: "500",
    "&:hover": {
      color: "white",
      backgroundColor: "#5f63f2",
    },
  },
};

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: false,
      is_checked: false,
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleForgotPassword = this._handleForgotPassword.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  async componentDidMount() {
    updateTitle("Login");
  }

  _handleSubmit(data) {
    const modifiedContact = data?.email.replace(/[+-]/g, '')
    data.email = modifiedContact
    // history.push(`/`);
  
    serviceLoginUser(data).then((val) => {
      if (!val.error) {
        this.props.actionLoginUser(val.data, this.state.is_checked);
      } else {
        SnackbarUtils.error("Invalid Credentials! Please verify.");
      }
    });
  }

  _handleChange() {
    this.setState({
      is_checked: !this.state.is_checked,
    });
  }

  _handleForgotPassword() {
    this.props.history.push("/other");
  }

  render() {
    const { handleSubmit, classes } = this.props;
    return (
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
              Enter your email ID to login
              </div>
              <br />
              <form onSubmit={handleSubmit(this._handleSubmit)}>
                <>
                  <div>
                  <Field
                      fullWidth={true}
                      name="email"
                      component={renderTextField}
                      label="E-Mail"
                      margin={"dense"}
                      variant="outlined"
                    />
                    {/* <Field
                      fullWidth={true}
                      margin={"dense"}
                      name="contact"
                      component={renderCountryContact}
                      label="Phone Number"
                    /> */}
                  </div>
                  <br />
                  <div>
                    <Field
                      // type={'password'}
                      fullWidth={true}
                      name="password"
                      component={renderOutlinedPasswordField}
                      label="Password"
                    />
                  </div>

                  <div style={{ marginTop: "7px" }}>
                    <ButtonBase type="submit" className={styles.login}>
                      Login
                    </ButtonBase>
                  </div>
                  {/* <div className={styles.otpWrap}>
                    <div className={styles.bottomSignup}>
                      <ButtonBase
                        onClick={this._handleForgotPassword}
                        className={styles.forgotBtn}
                      >
                        Login with OTP
                      </ButtonBase>
                    </div>
                  </div> */}
                </>
              </form>
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
