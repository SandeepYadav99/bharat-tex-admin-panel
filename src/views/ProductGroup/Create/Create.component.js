import React from "react";
import {

  ButtonBase,
  CircularProgress,

} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";

import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useProductGroup from "./Create.hook";
import historyUtils from "../../../libs/history.utils";
import { ArrowBackIos } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const ProductGroupView = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const {
    form,
    errorData,
    isSubmitting,
   
    handleSubmit,
   
    onBlurHandler,
    changeTextData,
  
  } = useProductGroup({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();
  return (
    <div className={"plainPaper"}>
      <div>
      <ButtonBase onClick={() => historyUtils.goBack()}>
          <ArrowBackIos fontSize={"small"} />{" "}
          <span>
          <span className={styles.title}>Product Group</span>
          </span>
        </ButtonBase>
       
      </div>
      <div className={styles.departmentWrap}>
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
              label={form?.status ? `Active` :"Inactive"}
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
    </div>
  );
};

export default ProductGroupView;
