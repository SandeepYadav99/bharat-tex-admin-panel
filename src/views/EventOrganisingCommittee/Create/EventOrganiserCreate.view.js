import React, { useMemo } from "react";
import {
  ButtonBase,
  CircularProgress,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useEventOrganiserCreate from "./EventOrganiserCreateHook";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import LogUtils from "../../../libs/LogUtils";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const EventOrganiserCreateView = ({ handleToggleSidePannel, isSidePanel, data }) => {
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
    setShowPasswordCurrent
      
  } = useEventOrganiserCreate({ handleToggleSidePannel, isSidePanel, data });
  const classes = useStyles();
  
 

  return (
    <div className={styles.departmentWrap}>
        <div className="formFlex">
            <div className={"formGroup"}>
                <CustomTextField
                    isError={errorData?.title }
                    errorText={errorData?.title}
                    label={"Title"}
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
      <div className={styles.btnCont}>
        <ButtonBase
          disabled={isSubmitting}
          type={"button"}
          onClick={handleSubmit}
          className={styles.createBtn}
        >
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : data ? (
            "Update"
          ) : (
            "Create"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default EventOrganiserCreateView;
