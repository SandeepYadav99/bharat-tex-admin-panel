import React, { useMemo } from "react";
import { Button, ButtonBase, CircularProgress } from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import File from "../../../components/FileComponent/FileComponent.component";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import history from "../../../libs/history.utils";
import NewEditor from "../../../components/NewEditor/NewEditor.component";
import useCityGuidCreateHook from "./CityGuide.hook";

const CityGuidView = ({ location }) => {
  const {
    form,
    errorData,
    changeTextData,
    handleSubmit,
    isSubmitting,
    descriptionRef,
    banner,
    thumb,
    id,
    setBanner,
  } = useCityGuidCreateHook({ location });

  // const renderDes = useMemo(() => {
  //   console.log("form?.description", form?.description);
  //   return (
  //     <NewEditor
  //       editorData={form?.description}
  //       handleChange={(html) => {
  //         descriptionRef.current(html, "description");
  //       }}
  //     />
  //   );
  // }, [form?.description, thumb]);
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              {id ? <b>Edit venue guide section</b> : <b>Add venue guide Section</b>}
              
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Venue Guide Section Details</div>
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
              default_image={thumb ? thumb : null}
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
                  isError={errorData?.title}
                  errorText={errorData?.title}
                  label={"Title"}
                  value={form?.title}
                  onTextChange={(text) => {
                    changeTextData(text, "title");
                  }}
                  // onBlur={() => {
                  //   onBlurHandler("title");
                  // }}
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
                  // onBlur={() => {
                  //   onBlurHandler("priority");
                  // }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Description</div>
          </h4>
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.description}
            errorText={errorData?.description}
            label={" Description"}
            value={form?.description}
            onTextChange={(text) => {
              changeTextData(text, "description");
            }}
            // onBlur={() => {
            //   onBlurHandler("description");
            // }}
          />
        </div>
        {!banner && (
          <div className={"formGroup"}>
            <File
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]} // jpeg/png/jpg
              fullWidth={true}
              name="od1"
              label="Upload  Banner Image"
              accept={"image/*"}
              error={errorData?.banner}
              value={form?.banner}
              placeholder={"Upload  Banner Image"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "banner");
                }
              }}
            />
            <div className={styles.inst}>
              <InfoOutlinedIcon />
              Recommended Size for banner image is 800x400 px
            </div>
          </div>
        )}

        {banner && <img src={banner} className={styles.imgClass} />}
        {banner && (
          <div>
            <div className={styles.remove} onClick={() => setBanner("")}>
              Remove
            </div>
            <div className={styles.inst2}>
              <InfoOutlinedIcon />
              Recommended Size for banner image is 800x400 px
            </div>
          </div>
        )}
        <div className={styles.btnWrappepr}>
          <ButtonBase
            disabled={isSubmitting ? true : false}
            type={"button"}
            className={styles.createBtn}
            onClick={() => handleSubmit("PENDING")}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : id ? (
              "UPDATE"
            ) : (
              "ADD"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default CityGuidView;
