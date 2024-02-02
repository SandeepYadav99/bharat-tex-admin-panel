import React from "react";
import {
  ButtonBase,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";
import { Autocomplete } from "@material-ui/lab";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import history from "../../../libs/history.utils";
import useAlbumCreateHook from "./AlbumCreate_hook";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import MultiFile from "./Component/FileComponent/FileMultiComponent.component";
import { useSelector } from "react-redux";

const GalleryAlbumCreate = () => {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isSubmitting,
    select,
    setSelect,
    selectRelated,
    setSelectRelated,
    selectEvent,
    setSelectEvent,
    selectImages,
    thumbnail,
    renderImages,
    selectVideos,
    renderVideo,
  } = useAlbumCreateHook({});

  const { role } = useSelector((state) => state.auth);

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b>New Album Gallery</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Album Details</div>
          </h4>
        </div>
        <div className={styles.cont}>
          <div>
            <File
              // imageClass={styles.inputFileUploader}
              max_size={5 * 1024 * 1024}
              type={["png", "jpeg", "jpg"]}
              fullWidth={true}
              name="thumbnail"
              accept={"image/*"}
              label="Please Upload Image"
              show_image={true}
              error={errorData?.thumbnail}
              value={form?.thumbnail}
              default_image={thumbnail ? thumbnail : null}
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
                  label={"Album Name"}
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
                <CustomDatePicker
                  clearable
                  label={"Event Date"}
                  // maxDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "event_date");
                  }}
                  value={form?.event_date}
                  isError={errorData?.event_date}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.description}
              errorText={errorData?.description}
              label={"Album Description"}
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
        {/* Update multiple */}
        <div className={"formFlex"}>
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
              error={errorData?.images}
              value={form?.images}
              // default_image={selectImages ? selectImages[0] : null}
              placeholder={"Upload Multiple Image"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "images");
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
        <div className={"formGroup"}>
          <MultiFile
            multiple
            multiDef={selectVideos ? selectVideos : []}
            max_size={10 * 1024 * 1024}
            type={["mp4"]}
            fullWidth={true}
            name="od1"
            label="Upload"
            accept={"video/*"}
            error={errorData?.videos}
            value={form?.videos}
            placeholder={"Upload Multiple Videos"}
            onChange={(file) => {
              if (file) {
                changeTextData(file, "videos");
              }
            }}
            DefChange={(video) => {
              if (video) {
                renderVideo(video);
              }
            }}
          />
        </div>
        <div className={""}>
          <div className={"headerFlex"}>
            <h4 className={"infoTitle"}>
              <div className={"heading"}>Related To</div>
            </h4>
          </div>
          <div className={"formGroup"}>
            <RadioGroup
              aria-label="option"
              name="selectRelated"
              value={selectRelated}
              onChange={(e) => setSelectRelated(e.target.value)}
              row
            >
              <FormControlLabel
                value="events"
                control={<Radio />}
                label="Events"
              />
              {/* <FormControlLabel
                style={{ marginLeft: "20px" }}
                value="chapters"
                control={<Radio />}
                label=" Chapters"
              /> */}
            </RadioGroup>
          </div>
          {/* {role === "GENERAL" ? ( */}
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                {selectRelated === "events" && (
                  <Autocomplete
                    id="tags-outlined"
                    onChange={(e, value) => {
                      changeTextData(value, "related_event_id");
                    }}
                    value={form?.related_event_id || []}
                    options={listData?.EVENTS || []}
                    getOptionLabel={(option) => option?.name || ""}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Choose Event"
                        error={errorData?.related_event_id}
                      />
                    )}
                  />
                )}

                {/* {selectRelated === "chapters" && ( */}
                  {/* <Autocomplete
                    // multiple
                    // error={form?.related_chapter_id}
                    id="tags-outlined-chapters" // Use a different id for clarity
                    onChange={(e, value) => {
                      changeTextData(value, "related_chapter_id"); // Use the correct field name
                    }}
                    value={form?.related_chapter_id || []}
                    options={listData?.CHAPTERS || []}
                    getOptionLabel={(option) => option?.name || ""}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Choose Chapter"
                        error={errorData?.related_chapter_id}
                      />
                    )} */}
                  {/* /> */}
                {/* )} */}
              </div>
            </div>
          {/* ) : ( */}
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                {/* {selectRelated === "events" && (
                  <Autocomplete
                    id="tags-outlined"
                    onChange={(e, value) => {
                      changeTextData(value, "related_event_id");
                    }}
                    value={form?.related_event_id || []}
                    options={listData?.ADMIN_EVENTS || []}
                    getOptionLabel={(option) => option?.name || ""}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Choose Event"
                        error={errorData?.related_event_id}
                      />
                    )}
                  />
                )} */}

                {/* {selectRelated === "chapters" && (
                  <Autocomplete
                    // multiple
                    // error={form?.related_chapter_id}
                    id="tags-outlined-chapters" // Use a different id for clarity
                    onChange={(e, value) => {
                      changeTextData(value, "related_chapter_id"); // Use the correct field name
                    }}
                    value={form?.related_chapter_id || []}
                    options={listData?.ADMIN_CHAPTERS || []}
                    getOptionLabel={(option) => option?.name || ""}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Choose Chapter"
                        error={errorData?.related_chapter_id}
                      />
                    )}
                  />
                )} */}
              </div>
            </div>
          {/* )} */}
        </div>

        {/* <div className={""}>
          <div className={"headerFlex"}>
            <h4 className={"infoTitle"}>
              <div className={"heading"}>Visible To</div>
            </h4>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <RadioGroup
                aria-label="option"
                name="select"
                value={select}
                onChange={(e) => setSelect(e.target.value)}
                row
              >
                <FormControlLabel
                  aria-label="option"
                  value="all_chapters"
                  name="all_chapters"
                  control={<Radio />}
                  label="All Chapters"
                />
                <FormControlLabel
                  style={{ marginLeft: "20px" }}
                  value="chapters"
                  control={<Radio />}
                  label="Select Chapters"
                />
              </RadioGroup>
            </div>
            <div className={"formGroup"}>
              <CustomCheckbox
                color={"primary"}
                handleChange={(text) => {
                  setSelectEvent((e) => !e);
                }}
                label={"Event Partcipants"}
                checked={selectEvent}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              {select === "chapters" && (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  onChange={(e, value) => {
                    changeTextData(value, "visible_chapter_ids");
                  }}
                  value={form?.visible_chapter_ids || []}
                  options={listData?.CHAPTERS || []}
                  getOptionLabel={(option) => option?.name}
                  defaultValue={form?.visible_chapter_ids || []}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Choose Chapter"
                      error={errorData?.visible_chapter_ids}
                    />
                  )}
                />
              )}

              {selectEvent && (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  onChange={(e, value) => {
                    changeTextData(value, "visible_event_ids");
                  }}
                  value={form?.visible_event_ids || []}
                  // id="tags-standard"
                  options={listData?.EVENTS || []}
                  getOptionLabel={(option) => option.name}
                  defaultValue={form?.visible_event_ids || []}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Choose Events"
                      error={errorData?.visible_event_ids}
                    />
                  )}
                />
              )}
            </div>
          </div>
        </div> */}
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
            // onClick={() => handleSubmit("PENDING")}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "UPLOAD"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default GalleryAlbumCreate;
