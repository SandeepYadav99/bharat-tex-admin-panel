import React, { useMemo } from "react";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useCreate from "./Create.hook";


const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const Create = ({ }) => {
  const {
    form,
    errorData,
    isSubmitting,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    id,
  } = useCreate({});
  const classes = useStyles();


  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>{id ? "Edit" : "Add"} Knowledge Center Section</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Section Details</div>
          </h4>
        </div>
        <div className={styles.cont}>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.name}
                  errorText={errorData?.name}
                  label={"Section Name"}
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
                  type="text" 
                  value={form?.priority}
                  onTextChange={(text) => {
                    const sanitizedValue = text.replace(/[^0-9]/g, "");
                    changeTextData(sanitizedValue, "priority");
                  }}
                  onBlur={() => {
                    onBlurHandler("priority");
                  }}
                />
              </div>
            </div>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.description}
                errorText={errorData?.description}
                label={"Description"}
                value={form?.description}
                onTextChange={(text) => {
                  changeTextData(text, "description");
                }}
                onBlur={() => {
                  onBlurHandler("description");
                }}
                multiline
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={"plainPaper"}>
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
              "ADD"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default Create;
