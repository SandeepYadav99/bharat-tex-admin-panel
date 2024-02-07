import React, { useMemo } from "react";
import {
  ButtonBase,
  CircularProgress,
  MenuItem,
  TextField,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import useExhibitorCreate from "./Exhibitor.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import MultiFile from "../../GalleryAlbum/Create/Component/FileComponent/FileMultiComponent.component";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import Chip from "@material-ui/core/Chip";
import { Autocomplete } from "@material-ui/lab";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import CountryCode from "../../../assets/country_code.json";
import { ArrowBackIos } from "@material-ui/icons";
import historyUtils from "../../../libs/history.utils";
import { isSubmitting } from "redux-form";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const ExhibitorCreate = () => {
  const {
    errorData,
    form,
    changeTextData,
    onBlurHandler,
    selectImages,
    setSelectImages,
    renderImages,
    handleCheckedData,
    checked,
    handleSubmit,
    listData,
    productListData,
    EventListManager,
    image,
    empId,
    pdf,
  } = useExhibitorCreate({});


  
  return (
    <div className={styles.container}>
      <div className={"plainPaper"}>
        {/* <div }>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Add Exhibitor</div>
          </h4>
        </div> */}
        <div className={styles.outerFlex}>
        <div className={"headerFlex"}>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIos fontSize={"small"} />
            <span className={"capitalize"}>
            <div className={"heading"}><b> {empId ? "Edit Exhibitor" : "Add Exhibitor"}</b> </div>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
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
              default_image={image ? image : null}
              label="Please Upload Image"
              show_image={true}
              error={errorData?.company_logo}
              value={form?.company_logo}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "company_logo");
                }
              }}
           
            />
          </div>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  label={"Company Name"}
                  value={form?.company_name}
                  onTextChange={(text) => {
                    changeTextData(text, "company_name");
                  }}
                  onBlur={() => {
                    onBlurHandler("company_name");
                  }}
                  error={errorData?.company_name}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.brand_name}
                  errorText={errorData?.brand_name}
                  label={"Brand"}
                  value={form?.brand_name}
                  onTextChange={(text) => {
                    changeTextData(text, "brand_name");
                  }}
                  onBlur={() => {
                    onBlurHandler("brand_name");
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
                changeTextData(value, "product_groups");
              }}
              value={form?.product_groups}
            
              options={listData ? listData?.PRODUCT_GROUP : []}
              getOptionLabel={(option) => option.name}
              defaultValue={form?.product_groups}
              error={errorData?.product_groups}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Product Group"
                  error={errorData?.product_groups}
                />
              )}
            />
          </div>
          <div className={"formGroup"}>
            <Autocomplete
              multiple
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "product_categories");
              }}
              value={form?.product_categories}
              // id="tags-standard"
              options={listData ? listData?.PRODUCT_CATEGORY : []}
              getOptionLabel={(option) => option.name}
              defaultValue={form?.product_categories}
              error={errorData?.product_categories}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Product Category"
                  error={errorData?.product_categories}
                />
              )}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
              multiple
              rows={6}
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "products");
              }}
              options={productListData}
              value={form?.products}
              freeSolo
              selectOnFocus={false}
              error={errorData?.products}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  /> // disabled={option.length < 2}
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Product"
                  error={errorData?.products}
                />
              )}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.event_venue}
              errorText={errorData?.event_venue}
              label={"Event Venue"}
              value={form?.event_venue}
              handleChange={(value) => {
                changeTextData(value, "event_venue");
              }}
            >
              <MenuItem value="BHARAT_MANDAPAM">BHARAT MANDAPAM</MenuItem>
              <MenuItem value="YASHOBHOOMI">YASHOBHOOMI</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
          <CustomTextField
              label={"Hall No"}
              value={form?.hall_no}
              onTextChange={(text) => {
                changeTextData(text, "hall_no");
              }}
              onBlur={() => {
                onBlurHandler("hall_no");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              label={"Booth Number"}
              value={form?.event_stall}
              onTextChange={(text) => {
                changeTextData(text, "event_stall");
              }}
              onBlur={() => {
                onBlurHandler("event_stall");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
          <Autocomplete
              multiple
              rows={6}
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "zone_tag");
              }}
              options={EventListManager ? EventListManager : []}
              value={form?.zone_tag}
              freeSolo
              selectOnFocus={false}
              error={errorData?.zone_tag}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  /> // disabled={option.length < 2}
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Zone"
                  error={errorData?.zone_tag}
                />
              )}
            />
          </div>
          <div className={"formGroup"}></div>
        </div>
        <div className={"formFlex"}></div>
        <div className={"formFlex"}>
          <div
            style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
            className={"formGroup"}
          >
            <input
              type="checkbox"
              value={form?.is_partner }
              checked={form?.is_partner}
              onChange={()=>changeTextData(!form?.is_partner,"is_partner")}
            />
            <span>This is A featured Partner Exhibitor</span>
          </div>
          <div className={"formGroup"}>
            {form?.is_partner && (
              <CustomSelectField
                isError={errorData?.partner_tag}
                errorText={errorData?.partner_tag}
                label={"Partner Type"}
                value={form?.partner_tag}
                handleChange={(value) => {
                  changeTextData(value, "partner_tag");
                }}
              >
                <MenuItem value="PLATINUM_PARTNER">Platinum Partner</MenuItem>
                <MenuItem value="GOLD_PARTNER">Gold Partner</MenuItem>
                <MenuItem value="SILVER_PARTNER">Silver Partner</MenuItem>
                <MenuItem value="FASHION_PARTNER">Fashion Partner</MenuItem>
                <MenuItem value="SUSTAINBILITY_PARTNER">
                  Sustainibility Partner
                </MenuItem>
                <MenuItem value="ASSOCIATE_PARTNER">Associate Partner</MenuItem>
              </CustomSelectField>
            )}
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div>
          {" "}
          <b>Contact Detail</b>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.company_perosn_name}
              errorText={errorData?.company_perosn_name}
              label={"Company Person Name"}
              value={form?.company_perosn_name}
              onTextChange={(text) => {
                changeTextData(text, "company_perosn_name");
              }}
              onBlur={() => {
                onBlurHandler("company_perosn_name");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.conatct_person_designation}
              errorText={errorData?.conatct_person_designation}
              label={"Designation"}
              value={form?.conatct_person_designation}
              onTextChange={(text) => {
                changeTextData(text, "conatct_person_designation");
              }}
              onBlur={() => {
                onBlurHandler("conatct_person_designation");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.primary_email}
              errorText={errorData?.primary_email}
              label={"Primary Email"}
              value={form?.primary_email}
              onTextChange={(text) => {
                changeTextData(text, "primary_email");
              }}
              // onBlur={() => {
              //   onBlurHandler("primary_email");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.primary_password}
              errorText={errorData?.primary_password}
              label={"Password"}
              value={form?.primary_password}
              onTextChange={(text) => {
                changeTextData(text, "primary_password");
              }}
              onBlur={() => {
                onBlurHandler("primary_password");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              label={"Secondary Person Name"}
              value={form?.secondary_perosn_name}
              onTextChange={(text) => {
                changeTextData(text, "secondary_perosn_name");
              }}
              onBlur={() => {
                onBlurHandler("secondary_perosn_name");
              }}
            />
          </div>
          <div className={"formGroup"}></div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.secondary_email}
              errorText={errorData?.secondary_email}
              label={"Secondary Email"}
              value={form?.secondary_email}
              onTextChange={(text) => {
                changeTextData(text, "secondary_email");
              }}
              // onBlur={() => {
              //   onBlurHandler("secondary_email");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.secondary_password}
              errorText={errorData?.secondary_password}
              label={"Passowrd"}
              value={form?.secondary_password}
              onTextChange={(text) => {
                changeTextData(text, "secondary_password");
              }}
              onBlur={() => {
                onBlurHandler("secondary_password");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"} id={styles.oneLineView}>
            <div id={styles.countryCode}>
              <CustomSelectField
                isError={errorData?.country_code}
                errorText={errorData?.country_code}
                label={"Country Code"}
                value={form?.country_code}
                handleChange={(value) => {
                  changeTextData(value, "country_code");
                }}
              >
                {CountryCode?.map((val) => {
                  return (
                    <MenuItem value={val?.dial_code} key={val.code}>
                      {val?.dial_code}
                    </MenuItem>
                  );
                })}
              </CustomSelectField>
            </div>
            <CustomTextField
              isError={errorData?.primary_conatct_number}
              errorText={errorData?.primary_conatct_number}
              label={"Phone"}
              value={form?.primary_conatct_number}
              onTextChange={(text) => {
                changeTextData(text, "primary_conatct_number");
              }}
              // onBlur={() => {
              //   onBlurHandler("primary_conatct_number");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.other_conatct_number}
              errorText={errorData?.other_conatct_number}
              label={"Alternate Number"}
              value={form?.other_conatct_number}
              onTextChange={(text) => {
                changeTextData(text, "other_conatct_number");
              }}
              onBlur={() => {
                onBlurHandler("other_conatct_number");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.company_address}
              errorText={errorData?.company_address}
              label={"Address"}
              value={form?.company_address}
              onTextChange={(text) => {
                changeTextData(text, "company_address");
              }}
              onBlur={() => {
                onBlurHandler("company_address");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.website}
              errorText={errorData?.website}
              label={"Website"}
              value={form?.website}
              onTextChange={(text) => {
                changeTextData(text, "website");
              }}
              onBlur={() => {
                onBlurHandler("website");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.instagram_link}
              errorText={errorData?.instagram_link}
              label={"Instagram"}
              value={form?.instagram_link}
              onTextChange={(text) => {
                changeTextData(text, "instagram_link");
              }}
              onBlur={() => {
                onBlurHandler("instagram_link");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.facebook_link}
              errorText={errorData?.facebook_link}
              label={"facebook"}
              value={form?.facebook_link}
              onTextChange={(text) => {
                changeTextData(text, "facebook_link");
              }}
              onBlur={() => {
                onBlurHandler("facebook_link");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.linkedin_link}
              errorText={errorData?.linkedin_link}
              label={"linkedin"}
              value={form?.linkedin_link}
              onTextChange={(text) => {
                changeTextData(text, "linkedin_link");
              }}
              onBlur={() => {
                onBlurHandler("linkedin_link");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.twitter_link}
              errorText={errorData?.twitter_link}
              label={"Twitter"}
              value={form?.twitter_link}
              onTextChange={(text) => {
                changeTextData(text, "twitter_link");
              }}
              onBlur={() => {
                onBlurHandler("twitter_link");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.youtube_link}
              errorText={errorData?.youtube_link}
              label={"youtube"}
              value={form?.youtube_link}
              onTextChange={(text) => {
                changeTextData(text, "youtube_link");
              }}
              onBlur={() => {
                onBlurHandler("youtube_link");
              }}
            />
          </div>
          <div></div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div>
          {" "}
          <b>Company Info</b>{" "}
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <div className={"formGroup"}>
              <File
                max_size={5 * 1024 * 1024}
                type={["pdf"]}
                fullWidth={true}
                name="od1"
                label="Upload File"
                accept={"application/pdf"}
                error={errorData?.company_brochure}
                isError={errorData?.company_brochure}
                value={form?.company_brochure}
                placeholder={"Company Brochure"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "company_brochure");
                  }
                }}
                link={pdf}
              />
              {console.log(pdf,"pdf")}
            </div>
          </div>
          <div className={"formGroup"}>
            <MultiFile
              multiDef={selectImages ? selectImages : []}
              max_count="5"
              multiple
              max_size={1 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="od1"
              label="Gallery"
              accept={"image/*"}
              error={errorData?.gallery_images}
              value={form?.gallery_images}
              placeholder={"Gallery"}
              onChange={(file) => {
                changeTextData(file, "gallery_images");
              }}
              DefChange={(img) => {
                if (img) {
                  renderImages(img);
                }
              }}
            />
          </div>
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.company_description}
            errorText={errorData?.company_description}
            label={"Description"}
            value={form?.company_description}
            onTextChange={(text) => {
              changeTextData(text, "company_description");
            }}
            onBlur={() => {
              onBlurHandler("company_description");
            }}
            multiline
            rows={3}
          />
        </div>
      </div>
      <div className={"plainPaper"}>
        <CustomSwitch
          value={form?.status}
          handleChange={() => {
            changeTextData(!form?.status, "status");
          }}
          label={`Active`}
        />
        <div className={styles.btnWrappepr}>
          <ButtonBase
            type={"button"}
            className={styles.createBtn}
            onClick={ handleSubmit}
          >
             {/* {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : ( */}
               Add
            {/* )} */}
           
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default ExhibitorCreate;
