import React, { useMemo } from "react";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import history from "../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../../../components/FormFields/CustomSwitch";
import {
  ButtonBase,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

import useStamp from "./Stamp.hook";
import File from "../../../../components/FileComponent/FileComponent.component";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const Stamp = ({ location }) => {

  const params = useParams();

  const {
    form,
    errorData,
    isSubmitting,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    id,
    typeOfFile,
    setTypeOfFile,
  } = useStamp({ location });
  const classes = useStyles();


  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>{id ? "Edit File " : "Add File"}</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>File Details</div>
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
                  value={form?.priority}
                  type="text"
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
          </div>
        </div>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Choose File Type</div>
          </h4>
        </div>
        <div className={styles.formContainer}>
          <RadioGroup
            aria-label="option"
            name="selectRelated"
            value={typeOfFile}
            onChange={(e) => setTypeOfFile(e.target.value)}
            row
          >
            <FormControlLabel value="link" control={<Radio />} label="Link" />
            <FormControlLabel
              style={{ marginLeft: "20px" }}
              value="document"
              control={<Radio />}
              label="File"
            />
          </RadioGroup>
          {typeOfFile === "link" ? (
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.link}
                errorText={errorData?.link}
                label={"Link"}
                value={form?.link}
                onTextChange={(text) => {
                  changeTextData(text, "link");
                }}
                onBlur={() => {
                  onBlurHandler("link");
                }}
              />
            </div>
          ) : (
            <div className={"formGroup"}>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                style={{ width: "100%" }}
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
            </div>
          )}
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

export default Stamp;
