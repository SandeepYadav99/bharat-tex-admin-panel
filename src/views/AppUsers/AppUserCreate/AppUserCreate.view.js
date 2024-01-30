import React, { useMemo } from "react";
import {
  Button,
  ButtonBase,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";

import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useAppCreate from "./AppCreateHook.js";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const AppUserCreateView = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const {
    form,
    errorData,
    isSubmitting,
    isLoading,
    handleSubmit,
    removeError,
    onBlurHandler,
    changeTextData,
    id,
    showPasswordCurrent,
    setShowPasswordCurrent,
  } = useAppCreate({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();
  return (
    <div className={styles.departmentWrap}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Full Name"}
            value={form?.name}
            onTextChange={(text) => {
              changeTextData(text, "name");
            }}
            onBlur={() => {
              onBlurHandler("name");
            }}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          {/* <CountryContactFC
            fullWidth={true}
            error={errorData?.name}
            name="contact"
            type={"number"}
            margin={"dense"}
            label="Phone No"
            value="fds"
          /> */}
          {/* <Field
            fullWidth={true}
            name="contact"
            type={"number"}
            component={renderCountryContact}
            margin={"dense"}
            label="Phone No"
          /> */}
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.contact}
              errorText={errorData?.contact}
              label={"Contact"}
              value={form?.contact}
              onTextChange={(text) => {
                changeTextData(text, "contact");
              }}
              onBlur={() => {
                onBlurHandler("contact");
              }}
            />
          </div>
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            type={showPasswordCurrent ? "text" : "password"}
            label={"Password"}
            value={form?.password}
            onTextChange={(text) => {
              changeTextData(text, "password");
            }}
            isError={errorData?.password}
            errorText={errorData?.password}
            onBlur={() => {
              onBlurHandler("password");
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPasswordCurrent(!showPasswordCurrent)}
                  >
                    {showPasswordCurrent ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.email}
            errorText={errorData?.email}
            label={"Email"}
            value={form?.email}
            onTextChange={(text) => {
              changeTextData(text, "email");
            }}
            onBlur={() => {
              onBlurHandler("email");
            }}
          />
        </div>
        <div className={"formGroup"}>
            <CustomSelectField
            isError={errorData?.role}
            errorText={errorData?.role}
            label={"ROLE"}
            value={form?.role}
            handleChange={(value) => {
              changeTextData(value, "role");
            }}
          >
            <MenuItem value="GENERAL">GENERAL</MenuItem>
            <MenuItem value="CHAPTER_ADMIN">CHAPTER ADMIN</MenuItem>
            <MenuItem value="EVENT_MANAGER">EVENT MANAGER</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className={"headerFlex"}>
        <h4 className={"infoTitle"}>
          <div className={"heading"}>Status</div>
        </h4>
      </div>

      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSwitch
            value={form?.status}
            handleChange={() => {
              changeTextData(!form?.status, "status");
            }}
            label={`Active`}
          />
        </div>
      </div>

      <div className={styles.btnCont}>
        <ButtonBase
          disabled={isSubmitting}
          type={"button"}
          onClick={handleSubmit}
          className={styles.createBtn}
        >
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : empId ? (
            "Update"
          ) : (
            "Create"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default AppUserCreateView;
