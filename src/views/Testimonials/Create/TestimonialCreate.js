import React from "react";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";

import CustomSwitch from "../../../components/FormFields/CustomSwitch";

import historyUtils from "../../../libs/history.utils";
import { ArrowBackIos } from "@material-ui/icons";
import useTestimonialCreate from "./TestimonialCreateHook";
import File from "../../../components/FileComponent/FileComponent.component";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const TestimonialCreate = ({ handleToggleSidePannel, isSidePanel , location}) => {
  const {
    form,
    errorData,
    isSubmitting,
    image,
    handleSubmit,
    empId,
    onBlurHandler,
    changeTextData,
  } = useTestimonialCreate({ handleToggleSidePannel, isSidePanel , location});
  const classes = useStyles();

  return (
    <div>
      <div className={styles.actionButtoon}>
        <ButtonBase onClick={() => historyUtils.goBack()}>
          <ArrowBackIos fontSize={"small"} />{" "}
          <span>
            <span className={styles.title}>Testimonial</span>
          </span>
        </ButtonBase>
      </div>
      <div className={styles.gaps}/>
      <div className={"plainPaper"}>
        <div>
          <div className={styles.cont}>
            <File
              // imageClass={styles.inputFileUploader}
              max_size={5 * 1024 * 1024}
              type={["png", "jpeg", "jpg"]}
              fullWidth={true}
              name="thumbnail"
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

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "100%" }}>
                <div className={"formGroup"}>
                  <CustomTextField
                    isError={errorData?.name}
                    errorText={errorData?.name}
                    label={" Name"}
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
                  <CustomTextField
                    isError={errorData?.designaion}
                    errorText={errorData?.designaion}
                    label={"Designation"}
                    value={form?.designaion}
                    onTextChange={(text) => {
                      changeTextData(text, "designaion");
                    }}
                    onBlur={() => {
                      onBlurHandler("designaion");
                    }}
                  />
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <div className={"formGroup"}>
                  <CustomTextField
                    isError={errorData?.company}
                    errorText={errorData?.company}
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
                    isError={errorData?.priorty}
                    errorText={errorData?.priorty}
                    label={"Priorty"}
                    type={"number"}
                    value={form?.priorty}
                    onTextChange={(text) => {
                      changeTextData(text, "priorty");
                    }}
                    onBlur={() => {
                      onBlurHandler("priorty");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.text}
                errorText={errorData?.text}
                label={"Text"}
                value={form?.text}
                onTextChange={(text) => {
                  changeTextData(text, "text");
                }}
                onBlur={() => {
                  onBlurHandler("text");
                }}
                multiline
                rows={4}
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
                "Update"
              ) : (
                "ADD"
              )}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCreate;
