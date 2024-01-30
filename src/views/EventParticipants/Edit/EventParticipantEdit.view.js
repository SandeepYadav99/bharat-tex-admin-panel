import React, { useMemo } from "react";
import {
    ButtonBase,
    CircularProgress, IconButton, InputAdornment,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useEventParticipantCreate from "./EventParticipantEditHook";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import LogUtils from "../../../libs/LogUtils";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import UpperInfoComponent from "./UpperInfo.component";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const EventParticipantEditView = ({ handleToggleSidePannel, isSidePanel, data }) => {
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
      listData,

  } = useEventParticipantCreate({ handleToggleSidePannel, isSidePanel, data });
  const classes = useStyles();
  return (
    <div className={styles.departmentWrap}>
        <UpperInfoComponent data={data} />
        <div className="formFlex">
            <div className={"formGroup"}>
                <CustomTextField
                    isError={errorData?.password}
                    errorText={errorData?.password}
                    label={"New Password"}
                    value={form?.password}
                    onTextChange={(text) => {
                        changeTextData(text, "password");
                    }}
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
      <div className={styles.btnCont}>
        <ButtonBase
          disabled={isSubmitting}
          type={"button"}
          onClick={handleSubmit}
          className={styles.createBtn}
        >
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : "Updated"}
        </ButtonBase>
      </div>
    </div>
  );
};

export default EventParticipantEditView;
