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
    listData, productListData,
  } = useExhibitorCreate({});

  return (
    <div className={styles.container}>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Add Exhibitor</div>
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
                  isError={errorData?.brand}
                  errorText={errorData?.brand}
                  label={"Brand"}
                  value={form?.brand}
                  onTextChange={(text) => {
                    changeTextData(text, "brand");
                  }}
                  onBlur={() => {
                    onBlurHandler("brand");
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
              // id="tags-standard"
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
          <div className={"formGroup"}>
            <CustomTextField
              label={"Booth Number"}
              value={form?.booth_number}
              onTextChange={(text) => {
                changeTextData(text, "booth_number");
              }}
              onBlur={() => {
                onBlurHandler("booth_number");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.zone}
              errorText={errorData?.zone}
              label={"Zone"}
              value={form?.zone}
              handleChange={(value) => {
                changeTextData(value, "zone");
              }}
            >
              <MenuItem value="FIBRE">FIBRE & YARNS</MenuItem>
              <MenuItem value="FABRICS">FABRICS</MenuItem>
              <MenuItem value="APPAREL">APPAREL & FASHION</MenuItem>
              <MenuItem value="HOME">HOME TEXTILE</MenuItem>
              <MenuItem value="HANDLOOM">HANDLOOM</MenuItem>
              <MenuItem value="HANDICRAFT">HANDICRAFT & CARPET</MenuItem>
              <MenuItem value="INTELLIGENT">INTELLIGENT MANUFACTURING</MenuItem>
            </CustomSelectField>
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
              value={checked}
              onChange={handleCheckedData}
            />
            <span>This is A featured Partner Exhibitor</span>
          </div>
          <div className={"formGroup"}>
            {checked && (
              <CustomSelectField
                isError={errorData?.partner_type}
                errorText={errorData?.partner_type}
                label={"Partner Type"}
                value={form?.partner_type}
                handleChange={(value) => {
                  changeTextData(value, "partner_type");
                }}
              >
                <MenuItem value="PLATINUM">Platinum Partner</MenuItem>
                <MenuItem value="GOLD">Gold Partner</MenuItem>
                <MenuItem value="SILVER">Silver Partner</MenuItem>
                <MenuItem value="FASHION">Fashion Partner</MenuItem>
                <MenuItem value="SUSTAINIBILITY">
                  Sustainibility Partner
                </MenuItem>
                <MenuItem value="ASSOCIATE">Associate Partner</MenuItem>
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
              onBlur={() => {
                onBlurHandler("primary_email");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.password}
              errorText={errorData?.password}
              label={"Password"}
              value={form?.password}
              onTextChange={(text) => {
                changeTextData(text, "password");
              }}
              onBlur={() => {
                onBlurHandler("password");
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
          <div className={"formGroup"}>
          </div>
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
              onBlur={() => {
                onBlurHandler("secondary_email");
              }}
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
                {
                  CountryCode?.map((val) => {
                    return (
                      <MenuItem value={val?.dial_code} key={val.code}>{val?.dial_code}</MenuItem>
                    )
                  })
                }
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
              onBlur={() => {
                onBlurHandler("primary_conatct_number");
              }}
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
              isError={errorData?.instagram}
              errorText={errorData?.instagram}
              label={"Instagram"}
              value={form?.instagram}
              onTextChange={(text) => {
                changeTextData(text, "instagram");
              }}
              onBlur={() => {
                onBlurHandler("instagram");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.facebook}
              errorText={errorData?.facebook}
              label={"Facebook"}
              value={form?.facebook}
              onTextChange={(text) => {
                changeTextData(text, "facebook");
              }}
              onBlur={() => {
                onBlurHandler("facebook");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.linkdin}
              errorText={errorData?.linkdin}
              label={"Linkdin"}
              value={form?.linkdin}
              onTextChange={(text) => {
                changeTextData(text, "linkdin");
              }}
              onBlur={() => {
                onBlurHandler("linkdin");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.twitter}
              errorText={errorData?.twitter}
              label={"Twitter"}
              value={form?.twitter}
              onTextChange={(text) => {
                changeTextData(text, "twitter");
              }}
              onBlur={() => {
                onBlurHandler("twitter");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.youtube}
              errorText={errorData?.youtube}
              label={"Youtube"}
              value={form?.youtube}
              onTextChange={(text) => {
                changeTextData(text, "youtube");
              }}
              onBlur={() => {
                onBlurHandler("youtube");
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
                max_size={10 * 1024 * 1024}
                type={["pdf", "docx"]}
                fullWidth={true}
                name="od1"
                label="Upload File"
                accept={"application/pdf,application/msword"}
                error={errorData?.company_brochure}
                isError={errorData?.company_brochure}
                value={form?.company_brochure}
                placeholder={"Company Brochure"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "company_brochure");
                  }
                }}
              />
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
          
                }
              }
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
            isError={errorData?.description}
            errorText={errorData?.description}
            label={"Description"}
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
            onClick={() => handleSubmit()}
          >
            Add
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default ExhibitorCreate;
