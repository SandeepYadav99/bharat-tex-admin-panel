import React, { useMemo } from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";

import useCityAssCreate from "./CityAssCreate.hook";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const CityAssCreate = ({ location }) => {
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
  } = useCityAssCreate({ location });
  const classes = useStyles();

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>{id ? "Update" : "Add"} City Association</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>City Details</div>
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
              default_image={image ? image : null}
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
                  label={"City Chapter Name"}
                  value={form?.name}
                  onTextChange={(text) => {
                    changeTextData(text, "name");
                  }}
                  // onBlur={() => {
                  //   onBlurHandler("name");
                  // }}
                />
              </div>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.code}
                  errorText={errorData?.code}
                  label={"Code"}
                  value={form?.code}
                  onTextChange={(text) => {
                    changeTextData(text, "code");
                  }}
                  // onBlur={() => {
                  //   onBlurHandler("code");
                  // }}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomAutoComplete
                  disabled={true}
                  autoCompleteProps={{
                    freeSolo: false,
                    getOptionLabel: (option) => option?.name || "",
                  }}
                  dataset={listData?.CHAPTERS ? listData?.CHAPTERS : []}
                  datasetKey={"name"}
                  onTextChange={(text, value) => {
                    changeTextData(text, "parent_chapter_id");
                  }}
                  variant={"outlined"}
                  label={"State Chapter"}
                  name={"parent_chapter_id"}
                  isError={errorData?.parent_chapter_id}
                  value={form?.parent_chapter_id}
                />
              </div>
              <div className={"formGroup"}>
                <CustomSelectField
                  label={"Admin"}
                  value={form?.admin_id}
                  handleChange={(value) => {
                    changeTextData(value, "admin_id");
                  }}
                >
                  {listData?.ADMIN?.map((dT) => {
                    return (
                      <MenuItem value={dT?.id} key={dT?.id}>
                        {dT?.name}
                      </MenuItem>
                    );
                  })}
                </CustomSelectField>
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

        <div className={styles.btnCont}>
          <ButtonBase
            disabled={isSubmitting}
            type={"button"}
            onClick={handleSubmit}
            className={styles.createBtn}
          >
            Add
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default CityAssCreate;
