import React from "react";
import history from "../../libs/history.utils";
import { Button, ButtonBase, CircularProgress } from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import useTypeCreate from "./TypeCreate.hook";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import useAddCategory from "./AddCategory.hook";
import CustomSwitch from "../../components/FormFields/CustomSwitch";
import { useParams } from "react-router-dom";

function AddCategory({ location }) {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    selectedEventId
  } =useAddCategory({ location });

  const params = useParams();
  
  
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b> {params?.id ? "Edit" :"Add"}{" "}Category type</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Category type Details</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Name"}
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
      </div>
      <div className={"plainPaper"}>
        <div className={styles.btnWrappepr}>
        <CustomSwitch
          value={form?.status}
          handleChange={() => {
            changeTextData(!form?.status, "status");
          }}
          label={form?.status ? "Active" : "Inactive"}
        />
          <ButtonBase
            disabled={isSubmitting ? true : false}
            type={"button"}
            className={styles.createBtn}
            onClick={() => handleSubmit("PENDING")}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "ADD"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
