import React from "react";
import history from "../../../libs/history.utils";
import {
  Button,
  ButtonBase,
  CircularProgress,
  InputAdornment,
  MenuItem,
  TextField,
  colors,
} from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Add, InfoOutlined } from "@material-ui/icons";
import useMemberCreate from "./MemberCreate.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Autocomplete } from "@material-ui/lab";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import { useSelector } from "react-redux";

function MemberCreate() {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    images
  } = useMemberCreate({});

  const {role } = useSelector((state)=>state?.auth);
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b>New Member</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Member Company Profile</div>
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
              error={errorData?.image}
              value={form?.image}
            default_image={images ? images : null}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "image");
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
                  label={"Company Name"}
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
                  isError={errorData?.url}
                  errorText={errorData?.url}
                  label={"Website URL"}
                  value={form?.url}
                  onTextChange={(text) => {
                    changeTextData(text, "url");
                  }}
                  onBlur={() => {
                    onBlurHandler("url");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
              multiple
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "chapter_ids");
              }}
              value={form?.chapter_ids}
              options={role === "CHAPTER_ADMIN" ? listData?.ADMIN_CHAPTERS  : listData?.CHAPTERS}
              getOptionLabel={(option) => option.name}
              defaultValue={form?.chapter_ids}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Associated City Associations"
                  error={errorData?.chapter_ids}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Member Users</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.name2}
              errorText={errorData?.name2}
              label={"Primary User Name"}
              value={form?.name2}
              onTextChange={(text) => {
                changeTextData(text, "name2");
              }}
              onBlur={() => {
                onBlurHandler("name2");
              }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.email}
              errorText={errorData?.email}
              label={"Primary User Email"}
              value={form?.email}
              onTextChange={(text) => {
                changeTextData(text, "email");
              }}
              onBlur={() => {
                onBlurHandler("email");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.title}
              errorText={errorData?.title}
              label={"Primary User Designation/Title"}
              value={form?.title}
              onTextChange={(text) => {
                changeTextData(text, "title");
              }}
              onBlur={() => {
                onBlurHandler("title");
              }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.contact}
              errorText={errorData?.contact}
              label={"Primary User Phone"}
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

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Status</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSwitch
              value={form?.is_active}
              handleChange={() => {
                changeTextData(!form?.is_active, "is_active");
              }}
              label={`Active`}
            />
          </div>
        </div>
        <div className={"formGroup"}>
          <CustomCheckbox
            className={styles.checkbo}
            color={"primary"}
            handleChange={(text) => {
              changeTextData(!form?.is_access_invite, "is_access_invite");
            }}
            label={"Send Access Invite to Member User"}
            checked={form?.is_access_invite}
          />
        </div>
        <div className={"formGroup"}>
          <CustomCheckbox
            className={styles.checkbo}
            color={"primary"}
            handleChange={(text) => {
              // changeTextData(!form?.is_access_invite, "is_access_invite");
            }}
            label={"I have verified the identity and validate of membership of the CREADAI member and city association."}
            checked={"form?.is_valid_member"}
          />
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

export default MemberCreate;
