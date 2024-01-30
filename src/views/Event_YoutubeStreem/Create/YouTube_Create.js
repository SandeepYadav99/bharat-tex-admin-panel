import React from "react";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";

import historyUtils from "../../../libs/history.utils";
import useYoutubeCreateHook from "./YouTube_hook";

function YoutubeCreateView({ location }) {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    descriptionRef,
    image,
  } = useYoutubeCreateHook({ location });
// console.log(location)
const eventId = location?.state?.event_id;
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b>Add Youtube Stream</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Youtube Stream Details</div>
          </h4>
        </div>
        <div className={styles.cont}>
          
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.link}
                  errorText={errorData?.link}
                  label={"Youtube URL"}
                  value={form?.link}
                  onTextChange={(text) => {
                    changeTextData(text, "link");
                  }}
                  onBlur={() => {
                    onBlurHandler("link");
                  }}
                />
              </div>
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

        <div className={styles.btnWrappepr}>
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

export default YoutubeCreateView;
