import React, { useMemo } from "react";
import { ButtonBase } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import useEventOrganiserUserCreate from "./EventOrganiserUserCreate.hook";
import CustomPhoneContactField from "../../../components/FormFields/CustomPhoneContactField";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const EventOrganiserUserCreate = ({ location }) => {
  console.log(location, "Location");
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
    image,
    handleManualClick,
    isEnterManually,
  } = useEventOrganiserUserCreate({ location });

  const classes = useStyles();
  const UserField = useMemo(() => {
    if (isEnterManually) {
      return (
        <CustomTextField
          isError={errorData?.name}
          errorText={errorData?.name}
          label={"Username"}
          value={form?.name}
          onTextChange={(text) => {
            changeTextData(text, "name");
          }}
          onBlur={() => {
            onBlurHandler("name");
          }}
        />
      );
    }
    return (
      <CustomAutoComplete
        disabled={form?.user_id && form?.is_auto}
        autoCompleteProps={{
          freeSolo: true,
          getOptionLabel: (option) => option?.label || "",
        }}
        dataset={listData?.USERS ? listData?.USERS : []}
        datasetKey={"label"}
        onTextChange={(text, value) => {
          if (typeof text === "string") {
            changeTextData({ name: text }, "user");
          } else {
            changeTextData(text, "user");
          }
        }}
        variant={"outlined"}
        label={"User"}
        name={"user"}
        isError={errorData?.user}
        value={form?.user}
      />
    );
  }, [isEnterManually, form, changeTextData, listData, errorData]);

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>{id ? "Update" : "Add"} User List</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>User Details</div>
          </h4>
        </div>
        <div className={styles.cont}>
          <div>
            <File
              // imageClass={styles.inputFileUploader}
              max_size={5 * 1024 * 1024}
              type={["png", "jpeg", "jpg"]}
              fullWidth={true}
              name="document"
              accept={"image/*"}
              label="Please Upload Image"
              show_image={true}
              error={errorData?.image}
              value={form?.image}
              default_image={image ? image : null}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "image");
                }
              }}
            />
          </div>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  label={"Company"}
                  value={form?.company}
                  onTextChange={(text) => {
                    changeTextData(text, "company");
                  }}
                  onBlur={() => {
                    onBlurHandler("company");
                  }}
                />
              </div>
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

            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.website}
                  errorText={errorData?.website}
                  label={"Website"}
                  value={form?.website}
                  onTextChange={(text) => {
                    changeTextData(text, "website");
                  }}
                  onBlur={() => {
                    onBlurHandler("website");
                  }}
                />
              </div>
            </div>
          </div>
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
          <div className={"formGroup"}>
            <CustomPhoneContactField
              isError={errorData?.contact}
              errorText={errorData?.contact}
              label={"Phone number "}
              value={form?.contact}
              onTextChange={(text) => {
                changeTextData(text, "contact");
              }}
            
              isValid={(value) => {
             
                if (value.match(/12345/)) {
                  return "";
                } else if (value.match(/1234/)) {
                  return false;
                } else {
                  return true;
                }
            
                }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.about}
              errorText={errorData?.about}
              label={"About"}
              value={form?.about}
              onTextChange={(text) => {
                changeTextData(text, "about");
              }}
              onBlur={() => {
                onBlurHandler("about");
              }}
              multiline
              rows={4}
            />
          </div>
        </div>
      
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeTextData(!form?.should_show_profile, "should_show_profile");
              }}
              label={"Open profile"}
               checked={form?.should_show_profile}
            />
         
        <div className={styles.btnCont}>
          <ButtonBase
            disabled={isSubmitting}
            type={"button"}
            onClick={handleSubmit}
            className={styles.createBtn}
          >
            {id ? "UPDATE" : "Add"}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default EventOrganiserUserCreate;
