import React from "react";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../../libs/history.utils";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../../components/FormFields/CustomSwitch";
import useAdminCreate from "./CategoryCreateHook";
import CountryInputField from "../../../../components/CountryInputField/CountryInputField.js";

const CategoryCreateView = ({ location }) => {
  const {
    form,
    errorData,
    isSubmitting,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    id,
    countryCode,
    handleCountryCodeChange,
  } = useAdminCreate({ location });
  console.log(form);
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b>{id ? "Edit" : "Add"} Category User</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={styles.departmentWrap}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>User Details</div>
          </h4>
        </div>
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
            <div style={{ display: "flex", gap: "8px" }}>
              <CountryInputField
                countryCode={countryCode}
                handleCountryCodeChange={handleCountryCodeChange}
              />
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
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.priority}
              errorText={errorData?.priority}
              label={"Priority"}
              value={form?.priority}
              onTextChange={(text) => {
                changeTextData(text, "priority");
              }}
              onBlur={() => {
                onBlurHandler("priority");
              }}
            />
          </div>
        </div>
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
            ) : id ? (
              "Update"
            ) : (
              "Create"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreateView;
