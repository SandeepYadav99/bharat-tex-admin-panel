import React from "react";
import history from "../../../libs/history.utils";
import {
  Button,
  ButtonBase,
  CircularProgress,
  MenuItem,
} from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useEventBannerCreate from "./EventBannerCreate.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import { useParams } from "react-router-dom";

function EventBannerCreate({ location }) {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    image,
    setImage,
    isLinkDisabled,
    setIsLinkDisabled,
  } = useEventBannerCreate({ location });

  const params = useParams();

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              {params?.id ? <b>Edit Banner</b> : <b>Add Banner</b>}
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Banner Details</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.type}
              errorText={errorData?.type}
              label={"Type"}
              value={form?.type}
              handleChange={(value) => {
                changeTextData(value, "type");

                setIsLinkDisabled(value === "PARTNER");
              }}
            >
              <MenuItem value="BANNER">BANNER</MenuItem>
              <MenuItem value="PARTNER">PARTNER</MenuItem>
            </CustomSelectField>
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
              isError={errorData?.link}
              errorText={errorData?.link}
              label={"Link(optional)"}
              value={form?.link}
              onTextChange={(text) => {
                changeTextData(text, "link");
              }}
              onBlur={() => {
                onBlurHandler("link");
              }}
              disabled={isLinkDisabled}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            {!image && (
              <File
                max_size={10 * 1024 * 1024}
                type={["jpeg", "jpg", "png"]}
                fullWidth={true}
                name="od1"
                label="Upload Event Banner Image"
                accept={"application/pdf,application/msword,image/*"}
                error={errorData?.image}
                value={form?.image}
                placeholder={"Upload Event Banner Image"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "image");
                  }
                }}
              />
            )}

            <div className={styles.inst}>
              <InfoOutlinedIcon />
              Recommended Size for banner image is 800 x 400 px
            </div>
          </div>
          <div className={"formGroup"}></div>
        </div>
        {image && <img src={image} className={styles.imgClass} />}
        {image && (
          <div className={styles.remove} onClick={() => setImage("")}>
            Remove
          </div>
        )}
      </div>
      <div className={"plainPaper"}>
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

export default EventBannerCreate;
