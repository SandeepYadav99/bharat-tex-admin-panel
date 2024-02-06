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
import useEventSponsorCreate from "./EventSponsorCreate.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CountryInputField from "../../../components/CountryInputField/CountryInputField.js";

function EventSponsorCreate({ location }) {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    img,
    id,
    setImg,
    countryCode,
    handleCountryCodeChange,
  } = useEventSponsorCreate({ location });

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              {id ? <b>Edit Partner</b> : <b>Add Partner</b>}
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Partner Details</div>
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
              error={errorData?.img_url}
              value={form?.img_url}
              default_image={img ? img : null}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "img_url");
                }
              }}
            />
            {img && (
              <div className={styles.remove} onClick={() => setImg("")}>
                Remove
              </div>
            )}
          </div>

          <div className={styles.lowerWrap}>
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
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.web_url}
                  errorText={errorData?.web_url}
                  label={"Web URL"}
                  value={form?.web_url}
                  onTextChange={(text) => {
                    changeTextData(text, "web_url");
                  }}
                  onBlur={() => {
                    onBlurHandler("web_url");
                  }}
                />
              </div>
            </div>
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
            <div style={{ display: "flex", gap: "10px" }}>
              <CountryInputField
                countryCode={countryCode}
                handleCountryCodeChange={handleCountryCodeChange}
              />
              <CustomTextField
                isError={errorData?.contact}
                errorText={errorData?.contact}
                label={"Phone Number"}
                value={form?.contact}
                onTextChange={(text) => {
                  changeTextData(text, "contact");
                }}
                onBlur={() => {
                  onBlurHandler("contact");
                }}
              />
            </div>
          </div>
        </div>
      
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.company_profile}
              errorText={errorData?.company_profile}
              label={"Company Profile"}
              value={form?.company_profile}
              onTextChange={(text) => {
                changeTextData(text, "company_profile");
              }}
              onBlur={() => {
                onBlurHandler("company_profile");
              }}
              multiline
              rows={3}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              // disabled={disabled?.member_id}
              isError={errorData?.type}
              errorText={errorData?.type}
              label={"Sponsor Type"}
              value={form?.type}
              handleChange={(value) => {
                changeTextData(value, "type");
              }}
            >
              {listData?.SPONSOR_TYPE?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.type}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.insta}
              errorText={errorData?.insta}
              label={"Social Media Instagram"}
              value={form?.insta}
              onTextChange={(text) => {
                changeTextData(text, "insta");
              }}
              onBlur={() => {
                onBlurHandler("insta");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.fb}
              errorText={errorData?.fb}
              label={"Social Media Facebook"}
              value={form?.fb}
              onTextChange={(text) => {
                changeTextData(text, "fb");
              }}
              onBlur={() => {
                onBlurHandler("fb");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.linkedin}
              errorText={errorData?.linkedin}
              label={"Social Media Linkedin"}
              value={form?.linkedin}
              onTextChange={(text) => {
                changeTextData(text, "linkedin");
              }}
              onBlur={() => {
                onBlurHandler("linkedin");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.twitter}
              errorText={errorData?.twitter}
              label={"Social Media Twitter"}
              value={form?.twitter}
              onTextChange={(text) => {
                changeTextData(text, "twitter");
              }}
              onBlur={() => {
                onBlurHandler("twitter");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.youtube}
              errorText={errorData?.youtube}
              label={"Social Media Youtube"}
              value={form?.youtube}
              onTextChange={(text) => {
                changeTextData(text, "youtube");
              }}
              onBlur={() => {
                onBlurHandler("youtube");
              }}
            />
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
              label={form?.status ? `Active` :"Inactive"}
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
}

export default EventSponsorCreate;
