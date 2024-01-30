import React, { useMemo, useState } from "react";
import {
  Button,
  ButtonBase,
  CircularProgress,
  MenuItem,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import CountryInputField from "../../../../components/CountryInputField/CountryInputField";
import useAdminCreate from "./StateMemCreateHook";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const StateMemCreate = ({ handleToggleSidePannel, isSidePanel, empId }) => {
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
    listData,
    disabled,
    selectedCountry,
    handleChangeCountry,
  } = useAdminCreate({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();

  const { role } = useSelector((state) => state.auth);

  return (
    <div className={styles.departmentWrap}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <div style={{ display: "flex", gap: "20px" }}>
            <CountryInputField
              countryCode={selectedCountry}
              handleCountryCodeChange={handleChangeCountry}
            />
            <CustomTextField
              type="tel"
              style={{ border: "none", outline: "none", paddingRight: "40px" }}
              isError={errorData?.contact}
              errorText={errorData?.contact}
              label={"Phone Number"}
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
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            disabled={disabled?.name}
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
          <CustomTextField
            disabled={disabled?.title}
            isError={errorData?.title}
            errorText={errorData?.title}
            label={"Title/Designation"}
            value={form?.title}
            onTextChange={(text) => {
              changeTextData(text, "title");
            }}
            onBlur={() => {
              onBlurHandler("title");
            }}
          />
        </div>
      </div>
      <div className={"formGroup"}>
        {role === "GENERAL" ? (
          <CustomSelectField
            disabled={disabled?.member_id}
            isError={errorData?.member_id}
            errorText={errorData?.member_id}
            label={"Company Name"}
            value={form?.member_id}
            handleChange={(value) => {
              changeTextData(value, "member_id");
            }}
          >
            {listData?.MEMBERS?.map((dT) => {
              return (
                <MenuItem value={dT?.id} key={dT?.id}>
                  {dT?.name}
                </MenuItem>
              );
            })}
          </CustomSelectField>
        ) : (
          <CustomSelectField
            disabled={disabled?.member_id}
            isError={errorData?.member_id}
            errorText={errorData?.member_id}
            label={"Company Name"}
            value={form?.member_id}
            handleChange={(value) => {
              changeTextData(value, "member_id");
            }}
          >
            {listData?.ADMIN_MEMBERS?.map((dT) => {
              return (
                <MenuItem value={dT?.id} key={dT?.id}>
                  {dT?.name}
                </MenuItem>
              );
            })}
          </CustomSelectField>
        )}
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            disabled={disabled?.email}
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
            "Add"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default StateMemCreate;
