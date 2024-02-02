import React from "react";
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
import useEventCreate from "./EventCreate.hook";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Autocomplete } from "@material-ui/lab";
import { useSelector } from "react-redux";

function EventCreate() {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    changeFeatureData,
    feature,
    select,
    setSelect,
    id,
    logo,
    thumb,
  } = useEventCreate({});




  const { role } = useSelector((state) => state.auth)

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b> {id ? "Update" : "Create"} Event</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Event Details</div>
          </h4>
        </div>
        <div className={styles.nameWrapper}>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.name}
                errorText={errorData?.name}
                label={"Event Title"}
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
                disabled={true}
                isError={errorData?.slug}
                errorText={errorData?.slug}
                label={"Event Slug"}
                value={form?.slug}
                onTextChange={(text) => {
                  changeTextData(text, "slug");
                }}
                onBlur={() => {
                  onBlurHandler("slug");
                }}
              />
            </div>
          
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Start Date"}
              // maxDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "start_date");
              }}
              value={form?.start_date}
              isError={errorData?.start_date}
            />
          </div>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"End Date"}
              onChange={(date) => {
                changeTextData(date, "end_date");
              }}
              value={form?.end_date}
              isError={errorData?.end_date}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.location}
              errorText={errorData?.location}
              label={"Location"}
              value={form?.location}
              onTextChange={(text) => {
                changeTextData(text, "location");
              }}
              onBlur={() => {
                onBlurHandler("location");
              }}
            />
          </div>

        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.url}
              errorText={errorData?.url}
              label={"Event URL"}
              value={form?.url}
              onTextChange={(text) => {
                changeTextData(text, "url");
              }}
              onBlur={() => {
                onBlurHandler("url");
              }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.registration_url}
              errorText={errorData?.registration_url}
              label={"Event Registration URL"}
              value={form?.registration_url}
              onTextChange={(text) => {
                changeTextData(text, "registration_url");
              }}
              onBlur={() => {
                onBlurHandler("registration_url");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.registration_status}
              errorText={errorData?.registration_status}
              label={"Registration Status"}
              value={form?.registration_status}
              handleChange={(value) => {
                changeTextData(value, "registration_status");
              }}
            >
              <MenuItem value="YES">YES</MenuItem>
              <MenuItem value="NO">NO</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.is_digital}
              errorText={errorData?.is_digital}
              label={"Is Event Digital?"}
              value={form?.is_digital}
              handleChange={(value) => {
                changeTextData(value, "is_digital");
              }}
            >
              <MenuItem value="YES">YES</MenuItem>
              <MenuItem value="NO">NO</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
      
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.description}
              errorText={errorData?.description}
              label={"About Event"}
              value={form?.description}
              onTextChange={(text) => {
                changeTextData(text, "description");
              }}
              onBlur={() => {
                onBlurHandler("description");
              }}
              multiline
              rows={3}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <File
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="od1"
              label="Upload Event Banner Image"
              accept={"application/pdf,application/msword,image/*"}
              error={errorData?.banner}
              value={form?.banner}
              placeholder={"Upload Event Banner Image"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "banner");
                }
              }}
            />
            <div className={styles.inst}>
              <InfoOutlinedIcon />
              Recommended Size for banner image is 1600x900 px
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={styles.adharBack}>
            <div className={styles.adharWrap}>
              <File
                bannerLabel="Upload Event Logo"
                default_image={logo ? logo : ""}
                // imageClass={styles.inputFileUploader}
                max_size={5 * 1024 * 1024}
                type={["png", "jpeg", "jpg"]}
                fullWidth={true}
                name="document"
                accept={"image/*"}
                label="Please Upload Image"
                show_image={true}
                error={errorData?.logo}
                value={form?.logo}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "logo");
                  }
                }}
              />
              {/* <div>Upload Event Logo</div> */}
            </div>
            <div className={styles.adharWrap}>
              <File
                bannerLabel="Upload Thumbnail"
                default_image={thumb ? thumb : ""}
                // imageClass={styles.inputFileUploader}
                max_size={5 * 1024 * 1024}
                type={["png", "jpeg", "jpg", "gif"]}
                fullWidth={true}
                name="document"
                accept={"image/*"}
                label="Aadhar Back"
                show_image={true}
                error={errorData?.thumbnail}
                value={form?.thumbnail}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "thumbnail");
                  }
                }}
              />
              {/* <div>Upload Event Thumbnail</div> */}
            </div>
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Event Theme</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.primary_colour}
              errorText={errorData?.primary_colour}
              label={"Primary Color"}
              value={form?.primary_colour}
              onTextChange={(text) => {
                changeTextData(text, "primary_colour");
              }}
              onBlur={() => {
                onBlurHandler("primary_colour");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.secondary_colour}
              errorText={errorData?.secondary_colour}
              label={"Secondary Color"}
              value={form?.secondary_colour}
              onTextChange={(text) => {
                changeTextData(text, "secondary_colour");
              }}
              onBlur={() => {
                onBlurHandler("secondary_colour");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.action_colour}
              errorText={errorData?.action_colour}
              label={"Action Color"}
              value={form?.action_colour}
              onTextChange={(text) => {
                changeTextData(text, "action_colour");
              }}
              onBlur={() => {
                onBlurHandler("action_colour");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.menu_text_colour}
              errorText={errorData?.menu_text_colour}
              label={"Menu Text Color"}
              value={form?.menu_text_colour}
              onTextChange={(text) => {
                changeTextData(text, "menu_text_colour");
              }}
              onBlur={() => {
                onBlurHandler("menu_text_colour");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Event Feature</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              // handleChange={(text) => {
              //   changeFeatureData(
              //     !feature?.event_participants,
              //     "event_participants"
              //   );
              // }}
              label={"Event Participants"}
              checked={feature?.event_participants}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              // handleChange={(text) => {
              //   changeFeatureData(!feature?.event_schedule, "event_schedule");
              // }}
              label={"Event Schedule"}
              checked={feature?.event_schedule}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              // handleChange={(text) => {
              //   changeFeatureData(!feature?.about_event, "about_event");
              // }}
              label={"About Event"}
              checked={feature?.about_event}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(
                  !feature?.event_organizing_committee,
                  "event_organizing_committee"
                );
              }}
              label={"Event Organizing Committee"}
              checked={feature?.event_organizing_committee}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              // handleChange={(text) => {
              //   changeFeatureData(!feature?.event_speakers, "event_speakers");
              // }}
              label={"Event Speakers"}
              checked={feature?.event_speakers}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.event_gallery, "event_gallery");
              }}
              label={"Event Gallery"}
              checked={feature?.event_gallery}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.analytics, "analytics");
              }}
              label={"Analytics"}
              checked={feature?.analytics}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.help_desk, "help_desk");
              }}
              label={"Help Desk"}
              checked={feature?.help_desk}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.poll, "poll");
              }}
              label={"Poll"}
              checked={feature?.poll}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.surveys, "surveys");
              }}
              label={"Surveys"}
              checked={feature?.surveys}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.sponsors, "sponsors");
              }}
              label={"Sponsors"}
              checked={feature?.sponsors}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.city_guide, "city_guide");
              }}
              label={"City Guide"}
              checked={feature?.city_guide}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              // handleChange={(text) => {
              //   changeFeatureData(!feature?.event_feed, "event_feed");
              // }}
              label={"Event Feed"}
              checked={feature?.event_feed}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              // handleChange={(text) => {
              //   changeFeatureData(!feature?.profile, "profile");
              // }}
              label={"Profile"}
              checked={feature?.profile}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              // handleChange={(text) => {
              //   changeFeatureData(!feature?.networking, "networking");
              // }}
              label={"Networking"}
              checked={feature?.networking}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              // disabled={true}
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.feedback, "feedback");
              }}
              label={"Feedback"}
              checked={feature?.feedback}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              // disabled={true}
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.event_banner, "event_banner");
              }}
              label={"Event Banner"}
              checked={feature?.event_banner}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              // disabled={true}
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.youtube_live, "youtube_live");
              }}
              label={"YouTube Live"}
              checked={feature?.youtube_live}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              // disabled={true}
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(
                  !feature?.information_center,
                  "information_center"
                );
              }}
              label={"Information Center"}
              checked={feature?.information_center}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              // disabled={true}
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(
                  !feature?.exhibitor,
                  "exhibitor"
                );
              }}
              label={"Exhibitor"}
              checked={feature?.exhibitor}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(
                  !feature?.testimonial,
                  "testimonial"
                );
              }}
              label={"testimonial"}
              checked={feature?.testimonial}
            />
          </div>
          <div className={"formGroup"}></div>
        </div>
      </div>
     
      <div className={"plainPaper"}>
        {id ? (
          <>
            {form?.status !== "INDRAFT" ? (
              <div className={styles.btnWrappepr}>
                <ButtonBase
                  disabled={isSubmitting ? true : false}
                  type={"button"}
                  className={styles.createBtn}
                  onClick={() => handleSubmit()}
                >
                  {isSubmitting ? (
                    <CircularProgress color="success" size="20px" />
                  ) : (
                    "UPDATE"
                  )}
                </ButtonBase>
              </div>
            ) : (
              <div className={styles.btnWrappepr}>
                <ButtonBase
                  disabled={isSubmitting ? true : false}
                  type={"button"}
                  className={styles.download}
                  onClick={() => handleSubmit("INDRAFT")}
                >
                  {isSubmitting ? (
                    <CircularProgress color="success" size="20px" />
                  ) : (
                    "SAVE AS DRAFT"
                  )}
                </ButtonBase>
                <ButtonBase
                  disabled={isSubmitting ? true : false}
                  type={"button"}
                  className={styles.createBtn}
                  onClick={() => handleSubmit("PENDING")}
                >
                  {isSubmitting ? (
                    <CircularProgress color="success" size="20px" />
                  ) : (
                    "REQUEST FOR APPROVAL"
                  )}
                </ButtonBase>
              </div>
            )}
          </>
        ) : (
          <div className={styles.btnWrappepr}>
            <ButtonBase
              disabled={isSubmitting ? true : false}
              type={"button"}
              className={styles.download}
              onClick={() => handleSubmit("INDRAFT")}
            >
              {isSubmitting ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                "SAVE AS DRAFT"
              )}
            </ButtonBase>
            <ButtonBase
              disabled={isSubmitting ? true : false}
              type={"button"}
              className={styles.createBtn}
              onClick={() => handleSubmit("PENDING")}
            >
              {isSubmitting ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                "REQUEST FOR APPROVAL"
              )}
            </ButtonBase>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCreate;
