import React, { useMemo } from "react";
import { ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import File from "../../../components/FileComponent/FileComponent.component";

import useBusinessCreate from "./BusinessCreate.hook";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import MultiFile from "../../GalleryAlbum/Create/Component/FileComponent/FileMultiComponent.component";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const BusinessCreate = ({}) => {
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
    selectImages,
    renderImages,
  } = useBusinessCreate({});
  const classes = useStyles();

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>{id ? "Edit " : "Add New"} Business Greeting</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Greeting Details</div>
          </h4>
        </div>
        <div className={styles.cont}>
          <div className={styles.fileBlock}>
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
                  label={"Greeting Name"}
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
                <CustomDatePicker
                  clearable
                  label={"Date"}
                  onChange={(date) => {
                    changeTextData(date, "date");
                  }}
                  value={form?.date}
                  isError={errorData?.date}
                />
              </div>
            </div>
              <div className={"formGroup"}>
                <MultiFile
                multiDef={selectImages ? selectImages : []}
                multiple
                max_size={10 * 1024 * 1024}
                type={["jpeg", "jpg", "png"]}
                fullWidth={true}
                name="od1"
                label="Upload Multiple Image"
                accept={"image/*"}
                error={errorData?.image}
                value={form?.image}
                placeholder={"Upload Multiple Image"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "image");
                  }
                }}
                DefChange={(img) => {
                  if (img) {
                    renderImages(img);
                  }
                }}
              />
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

        <div className={styles.btnCont}>
          <ButtonBase
            disabled={isSubmitting}
            type={"button"}
            onClick={handleSubmit}
            className={styles.createBtn}
          >
            Upload
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default BusinessCreate;
