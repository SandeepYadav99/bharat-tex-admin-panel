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
import useAdminCreate from "./AdminCreateHook";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ResetPasswordDialog from "./Component/ResetPassword/ResetPasswordPopUp";
import country_code from "../../../assets/country_code.json";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const AdminCreateView = ({ handleToggleSidePannel, isSidePanel, empId }) => {
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
    handleResetPassword,
    isRejectPopUp,
    handleRejectApi,
    toggleRejectDialog,
    countryCode,
    handleCountryCode,
  } = useAdminCreate({ handleToggleSidePannel, isSidePanel, empId });

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
          <div className={"formGroup"}>
            <div className={styles.formGrid}>
            <CustomSelectField
            isError={errorData?.country_code}
            errorText={errorData?.country_code}
            label={"Code"}
            value={form?.country_code}
            handleChange={(value) => {
              changeTextData(value, "country_code");
            }}
          >
            {
              country_code?.map((val)=>{
                return(
                  <MenuItem value={val?.dial_code}>{val?.dial_code}</MenuItem>
                )
              })
            }
          </CustomSelectField>
              <CustomTextField
                type="tel"
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
        </div>
        {!empId && (
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
                      onClick={() =>
                        setShowPasswordCurrent(!showPasswordCurrent)
                      }
                    >
                      {showPasswordCurrent ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}
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
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            {/* <MenuItem value="CHAPTER_ADMIN">CHAPTER ADMIN</MenuItem>
            <MenuItem value="EVENT_MANAGER">EVENT MANAGER</MenuItem> */}
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
      {empId ? (
        <div className={styles.btnContReset}>
          <ButtonBase
            type={"button"}
            onClick={toggleRejectDialog}
            className={styles.createBtnReset}
          >
            Reset Password
          </ButtonBase>
        </div>
      ) : (
        ""
      )}

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
      <ResetPasswordDialog
        handleConfirm={handleRejectApi}
        handleDialog={toggleRejectDialog}
        isOpen={isRejectPopUp}
        showPasswordCurrent={showPasswordCurrent}
        setShowPasswordCurrent={setShowPasswordCurrent}
        empId={empId}
        handleToggleSidePannel={handleToggleSidePannel}
      />
    </div>
  );
};

export default AdminCreateView;
