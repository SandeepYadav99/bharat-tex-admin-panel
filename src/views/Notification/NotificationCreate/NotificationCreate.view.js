import React, { useMemo } from "react";
import history from "../../../libs/history.utils";
import {
  Button,
  ButtonBase,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  RadioGroup,
  Radio,
  TextField,
  colors,
} from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Add, InfoOutlined } from "@material-ui/icons";
import useNotificationCreate from "./NotificationCreate.hook";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomDateTimePicker from "../../../components/FormFields/DatePicker/CustomDateTimePicker";
import { RELATEDSCREENITEMS } from "../../../libs/DataRelated";

function NotificationCreate() {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
  } = useNotificationCreate({});

  // const sendToField = useMemo(() => {
  //   if (form?.send_to === "CHAPTER") {
  //     return (
  //       <CustomSelectField
  //         isError={errorData?.chapter_id}
  //         errorText={errorData?.chapter_id}
  //         label={"Choose Exhibitors"}
  //         value={form?.chapter_id}
  //         handleChange={(value) => {
  //           changeTextData(value, "chapter_id");
  //         }}
  //       >
  //         {listData?.CHAPTERS?.map((dT) => {
  //           return (
  //             <MenuItem value={dT?.id} key={dT?.id}>
  //               {dT?.name}
  //             </MenuItem>
  //           );
  //         })}
  //       </CustomSelectField>
  //     );
  //   } else if (form?.send_to === "EVENT" && false) {
  //     return (
  //       <CustomSelectField
  //         isError={errorData?.event_id}
  //         errorText={errorData?.event_id}
  //         label={"Choose Visitors"}
  //         value={form?.event_id}
  //         handleChange={(value) => {
  //           changeTextData(value, "event_id");
  //         }}
  //       >
  //         {listData?.EVENTS?.map((dT) => {
  //           return (
  //             <MenuItem value={dT?.id} key={dT?.id}>
  //               {dT?.name}
  //             </MenuItem>
  //           );
  //         })}
  //       </CustomSelectField>
  //     );
  //   }
  //   return null;
  // }, [form, changeTextData, errorData, listData]);

  const sendTimestampField = useMemo(() => {
    if (form?.send_priority === "LATER") {
      return (
        <CustomDateTimePicker
          clearable
          minDate={new Date()}
          label={"Time"}
          onChange={(date) => {
            changeTextData(date, "send_timestamp");
          }}
          value={form?.send_timestamp}
          isError={errorData?.send_timestamp}
        />
      );
    }else {
      return null
    }
  }, [form, changeTextData, errorData]);

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b> Send Notifications</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Notification Details</div>
          </h4>
        </div>
        <div className={styles.nameWrapper}>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.title}
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
                isError={errorData?.message}
                errorText={errorData?.message}
                label={"Message"}
                value={form?.message}
                onTextChange={(text) => {
                  changeTextData(text, "message");
                }}
                onBlur={() => {
                  onBlurHandler("message");
                }}
                multiline
                rows={3}
              />
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          {/* <div className={"formGroup"}> */}
            {/* <CustomSelectField
              isError={errorData?.event_id}
              errorText={errorData?.event_id}
              label={"Related Event"}
              value={form?.event_id}
              handleChange={(value) => {
                changeTextData(value, "event_id");
              }}
            >
              <MenuItem value={'NONE'} key={'null'}>
                None
              </MenuItem>
              {listData?.EVENTS?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField> */}
          {/* </div> */}
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.next_screen}
              errorText={errorData?.next_screen}
              label={"Related Screen/Module"}
              value={form?.next_screen}
              handleChange={(value) => {
                changeTextData(value, "next_screen");
              }}
            >
              {RELATEDSCREENITEMS?.map((related)=>{
                return (
                  <MenuItem value={related?.value}>{related?.label}</MenuItem>

                )
              })}
          
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <div className={styles.heading}>Sent To</div>
            <RadioGroup
              aria-label="option"
              name="send_to"
              value={form?.send_to}
              onChange={(e) => changeTextData(e.target.value, "send_to")}
              row
            >
              <FormControlLabel value="ALL" control={<Radio />} label="All" />
              {/* <FormControlLabel
                style={{ marginLeft: "20px" }}
                value="EXHIBITOR"
                control={<Radio />}
                label="Exhibitors"
              /> */}
              {/* <FormControlLabel
                style={{ marginLeft: "20px" }}
                value="VISITOR"
                control={<Radio />}
                label="Visitors"
              /> */}
            </RadioGroup>
          </div>
          {/* <div className={"formGroup"}>{sendToField}</div> */}
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <div className={styles.heading}>When To Send?</div>
            <RadioGroup
              aria-label="option"
              name="send_priority"
              value={form?.send_priority}
              onChange={(e) => changeTextData(e.target.value, "send_priority")}
              row
            >
              <FormControlLabel
                value="NOW"
                control={<Radio />}
                label="Send Now"
              />
              <FormControlLabel
                style={{ marginLeft: "20px" }}
                value="LATER"
                control={<Radio />}
                label="Send Later"
              />
            </RadioGroup>
          </div>
          <div className={"formGroup"}>{sendTimestampField}</div>
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={styles.btnWrappepr}>
          <ButtonBase
            disabled={isSubmitting ? true : false}
            type={"button"}
            className={styles.createBtn}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "Add"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default NotificationCreate;
