import React, { Component } from "react";
import styles from "./Style.module.css";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ButtonBase, Input } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import EventEmitter from "../../../libs/Events.utils";
import history from "../../../libs/history.utils";
import { actionLoginUser } from "../../../actions/auth_index.action";
import {
  serviceRequestOtp,
  serviceVerifyOTP,
} from "../../../services/index.services";

const validate = (values) => {
  const errors = {};
  const requiredFields = ["otp"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values["otp"] && values["otp"].length > 4) {
    errors["otp"] = "Only 4 digits are allowed";
  }
  if (values["otp"] && values["otp"].length < 4) {
    errors["otp"] = "OTP is of 4 digit";
  }
  return errors;
};

let timeout = null;
let timerInterval = null;

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: false,
      message: "",
      disable_resend: false,
      timer_counter: 30,
      otp: [],
      is_valid: false,
    };
    this.inputRefs = [];
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleBack = this._handleBack.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.handleResendOtp = this.handleResendOtp.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  componentDidMount() {
    const { contact } = this.props;
    if (contact && contact !== "") {
    } else {
      // this.props.history.replace(RouteNames.login);
    }
    for (let x in this.inputRefs) {
      this.inputRefs[x].onkeyup = (e) =>
        this._handleKeyPress(e, this.inputRefs[x]);
    }
    // this.refs.name.focus();
    this.inputRefs[0].focus();
  }

  _timeoutDisable() {
    timeout = setTimeout(() => {
      clearInterval(timerInterval);
      this.setState({
        disable_resend: false,
        timer_counter: 30,
      });
    }, 30000);
    timerInterval = setInterval(() => {
      this.setState({
        timer_counter: --this.state.timer_counter,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(timeout);
  }

  _handleKeyPress(e, field) {
    if (e.keyCode === 8) {
      const tempNum = parseInt(field.name) - 1;
      if (tempNum >= 0) {
        this.inputRefs[tempNum].focus();
      }
      const temp = [];
      for (let i = 0; i < 4; i++) {
        if (!this.inputRefs[i].value) {
        } else {
          temp[i] = this.inputRefs[i].value;
        }
      }
      this.setState({
        is_valid: false,
        otp: temp,
      });
    }
    // alert(e.keyCode);
    if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      e.keyCode == 229
    ) {
      const a = field.value;
      field.value = a.slice(-1);

      // e.preventDefault();
      const tempNum = parseInt(field.name) + 1;
      if (this.inputRefs.length > tempNum) {
        this.inputRefs[tempNum].focus();
      } else {
        //this.inputRefs[5].blur();
      }
      let isDone = true;
      const temp = this.state.otp;
      for (let i = 0; i < 4; i++) {
        if (!this.inputRefs[i].value) {
          isDone = false;
        } else {
          temp[i] = this.inputRefs[i].value;
        }
      }
      this.setState({
        is_valid: isDone,
        otp: temp,
      });
    }
  }

  async handleResendOtp() {
    const { contact, country_code } = this.props;
    const cont = country_code + " " + contact;
    const tempRequest = await serviceRequestOtp({ contact: cont });
    if (!tempRequest.error) {
      this.setState({
        disable_resend: true,
      });
      this._timeoutDisable();
    }
  }

  _handleBack() {
    this.props.history.goBack();
  }

  handleCloseSnackbar = () => {
    this.setState({ snackbar: false });
  };

  async _handleSubmit(data) {
    const { contact, country_code } = this.props;
    const cont = country_code + " " + contact;
    console.log("otp", contact, country_code, this.props);
    const tempRequest = await serviceVerifyOTP({
      contact: cont?.replace(/[+-]/g, ""),
      otp: this.state.otp.toString().replace(/,/g, ""),
    });

    if (!tempRequest.error) {
      this.props.actionLoginUser(tempRequest.data);
    } else {
      EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
        error: "Invalid Credentials! Please verify.",
        type: "error",
      });
    }
  }

  render() {
    const { contact, country_code, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this._handleSubmit)}>
          <h3>Verification Code</h3>
          <div className={styles.innerText}>
            We have sent a 4 digit OTP to your registered Mobile Number
            <span style={{ fontSize: "16px", marginLeft: "5px" }}>
              {country_code} - {contact}
            </span>
          </div>

          <br />
          <br />
          <div className={styles.inputContainer}>
            <Input
              className={styles.inputFields}
              type="number"
              name="0"
              inputRef={(el) => (this.inputRefs[0] = el)}
            />
            <Input
              className={styles.inputFields}
              type="number"
              name="1"
              inputRef={(el) => (this.inputRefs[1] = el)}
            />
            <Input
              className={styles.inputFields}
              type="number"
              name="2"
              inputRef={(el) => (this.inputRefs[2] = el)}
            />
            <Input
              className={styles.inputFields}
              type="number"
              name="3"
              inputRef={(el) => (this.inputRefs[3] = el)}
            />
          </div>

          <div className={styles.bottomText}>
            <span className={styles.receive}>Didn't Receive OTP? </span>
            <ButtonBase
              onClick={this.handleResendOtp}
              type={"button"}
              disabled={this.state.disable_resend}
              className={styles.resendText}
            >
              Resend OTP
              {this.state.disable_resend
                ? " - " +
                  "00:" +
                  (this.state.timer_counter >= 10
                    ? this.state.timer_counter
                    : "0" + this.state.timer_counter)
                : ""}
            </ButtonBase>
          </div>
          <br />
          <br />
          <div className={"text-center"}>
            <ButtonBase type={"submit"} className={styles.login}>
              Confirm
            </ButtonBase>
          </div>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.snackbar}
          onClose={this.handleCloseSnackbar}
          message={<span id="message-id">{this.state.message}</span>}
        />
      </div>
    );
  }
}

const temp = reduxForm({
  form: "otp",
  validate,
})(Otp);

function mapStateToProps(state) {
  return {
    // contact: state.auth.user_details.contact,
    // country_code: state.auth.user_details.country_code,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // actionLoginUser: actionLoginUser,
      // actionSetActive: actionSetActive,
      // actionStoreUserData: actionStoreUserData,
      actionLoginUser: actionLoginUser,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(temp);
