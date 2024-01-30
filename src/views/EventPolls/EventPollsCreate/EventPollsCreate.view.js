import React, { useMemo } from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import OtherincludesDetailForm from "./component/OtherincludesDetail/OtherincludesDetail.component";
import useEventPollsCreate from "./EventPollsCreate.hook";

const EventPollsCreate = ({location}) => {
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
    otherRef,
  } = useEventPollsCreate({location});

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>{id ? "Update" : "Add"} Poll Question</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Question Details</div>
          </h4>
        </div>

        <div className={styles.lowerWrap}>
          <div className={"formFlex"}>
            <CustomTextField
              isError={errorData?.poll_question}
              errorText={errorData?.poll_question}
              label={"Poll Question"}
              value={form?.poll_question}
              onTextChange={(text) => {
                changeTextData(text, "poll_question");
              }}
              onBlur={() => {
                onBlurHandler("poll_question");
              }}
            />
          </div>
          <div className={styles.lowerWrp}>
            <OtherincludesDetailForm ref={otherRef} />
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
            Add
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default EventPollsCreate;
