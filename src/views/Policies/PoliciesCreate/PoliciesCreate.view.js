import React from "react";
import {
  ButtonBase,
  CircularProgress,
  MenuItem,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import usePoliciesCreateHook from "./PoliciesCreateHook";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import File from "../../../components/FileComponent/FileComponent.component";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const PoliciesCreateView = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const {
    form,
    errorData,
    isSubmitting,
    listData,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    document
  } = usePoliciesCreateHook({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();

  const {role} = useSelector((state)=>state.auth);


  return (
    <div className={styles.departmentWrap}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Policy Title"}
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
          <CustomDatePicker
            clearable
            label={"Date"}
            // maxDate={new Date()}
            onChange={(date) => {
              changeTextData(date, "effective_date");
            }}
            value={form?.effective_date}
            isError={errorData?.effective_date}
          />
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            isError={errorData?.chapter_id}
            errorText={errorData?.chapter_id}
            label={"Associate Chapter"}
            value={form?.chapter_id}
            handleChange={(value) => {
              changeTextData(value, "chapter_id");
            }}
          >

           {role === "GENERAL" &&
            listData?.CHAPTERS?.map((dT) => {
              return (
                <MenuItem value={dT?.id} key={dT?.id}>
                  {dT?.name}
                </MenuItem>
              );
            })
          }
          {role === "CHAPTER_ADMIN" &&
            listData?.ADMIN_CHAPTERS?.map((dT) => {
              return (
                <MenuItem value={dT?.id} key={dT?.id}>
                  {dT?.name}
                </MenuItem>
              );
            })
          }
           {role === "EVENT_MANAGER" &&
            listData?.ADMIN_CHAPTERS?.map((dT) => {
              return (
                <MenuItem value={dT?.id} key={dT?.id}>
                  {dT?.name}
                </MenuItem>
              );
            })
          }
          </CustomSelectField>
        </div>

      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <File
            max_size={10 * 1024 * 1024}
            type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
            fullWidth={true}
            name="od1"
            label="Attach file"
            accept={"application/pdf,application/msword,image/*"}
            error={errorData?.document}
            value={form?.document}
            placeholder={"Attach file"}
            onChange={(file) => {
              if (file) {
                changeTextData(file, "document");
              }
            }}
          />
          {empId === undefined ? " " : <a className={styles.inst} href={document ?? " "} target="_blank">View File</a>}
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
            "Save"
          ) : (
            "Add"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default PoliciesCreateView;
