import React from "react";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import historyUtils from "../../../libs/history.utils";
import useInfoCenterCreateHook from "./InfoCenter_hook";
import { useParams } from "react-router-dom";

function EventSpeakerCreateView({ location }) {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isSubmitting,
    image,
    id
  } = useInfoCenterCreateHook({ location });

  const params = useParams();

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b>{params?.id ? "Edit" : "Add"} Hall Layouts File</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Hall Layouts Details</div>
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
              error={errorData?.thumbnail}
              value={form?.thumbnail}
               default_image={image ? image : null}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "thumbnail");
                }
              }}
            />
          </div>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.name}
                  errorText={errorData?.name}
                  label={"File Name"}
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
                  onTextChange={(text) => {
                    changeTextData(text, "priority");
                  }}
                  onBlur={() => {
                    onBlurHandler("priority");
                  }}
                />
              </div>
              <div className={"formGroup"}>
                <File
                  max_size={10 * 1024 * 1024}
                  type={["pdf", "docx"]}
                  fullWidth={true}
                  name="od1"
                  label="Upload File"
                  accept={"application/pdf,application/msword"}
                  error={errorData?.file}
                  isError={errorData?.file}
                  value={form?.file}
                  placeholder={"Upload File"}
                  onChange={(file) => {
                    if (file) {
                      // setSelectImages([...selectImages, file])
                      changeTextData(file, "file");
                    }
                  }}
                />
                {
                  form?.file && <a href={form?.file} target="_blank">Preview</a>
                }
            
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

export default EventSpeakerCreateView;
