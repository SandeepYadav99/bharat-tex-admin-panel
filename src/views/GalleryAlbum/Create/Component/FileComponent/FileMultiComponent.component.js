import React, { Component, useMemo } from "react";
import styles from "./FileComponent.module.css";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import EventEmitter from "../../../../../libs/Events.utils";
import { imageGallery } from "suneditor/src/plugins";

class MultiFile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._handleFileChange = this._handleFileChange.bind(this);
    this._getImageUrl = this._getImageUrl.bind(this);
    this._removeImage = this._removeImage.bind(this);
    this._removedefImages = this._removedefImages.bind(this);
  }


  _handleFileChange(e) {
    const { multiple } = this.props;
    const allowedArr = this.props.type;
    const maxCount = "max_count" in this.props ? this.props.max_count : 0;
    let isError = false;
    let tempTotal = 0;
    let totalValid = 0;
    e.preventDefault();
    if (e.target.files[0]) {
      console.log(e.target.files, "FILECOMPONENT");
      const tempFiles = [];
      Object.keys(e.target.files).forEach((key) => {
        if (multiple && maxCount != 0 && maxCount <= tempTotal) {
          return true;
        }
        const tempFile = e.target.files[key];
        const sFileName = tempFile.name;
        const sFileExtension = sFileName
          .split(".")
        [sFileName.split(".").length - 1].toLowerCase();
        const fileSize = tempFile.size;

        if (
          fileSize <= this.props.max_size &&
          (allowedArr.length > 0
            ? allowedArr.indexOf(sFileExtension) > -1
            : true)
        ) {
          console.log(this.props);
          tempFiles.push(tempFile);
          totalValid++;
        } else {
          isError = true;
          SnackbarUtils.error(
            `Maximum file upload size is ${this?.props?.max_size / (1024 * 1024)
            } MB`
          );
          console.log("error");
        }
        tempTotal++;
      });
      if (isError && totalValid < 1) {
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
          error: "Invalid Upload",
          type: "error",
        });
      }
      if (tempFiles.length > 0) {
        if (multiple) {
          console.log("inside", tempFiles);
          this.props.onChange(tempFiles);
        } else {
          this.props.onChange(tempFiles[0]);
        }
      }
    }
  }

  _getImageUrl(value) {
    const { default_image, user_image } = this.props;
    if (value) {
      return URL.createObjectURL(value);
    } else if (default_image) {
      return default_image;
    } else if (user_image) {
      return require("../../../../../assets/img/profile.png");
    }
  }

  _removeImage(values) {
    const { value } = this.props;
    const filtered = [...value];
    filtered.splice(values, 1);
    this.props.onChange(filtered);
  }

  _removedefImages(values) {
    const { multiDef } = this.props;
    const filteredImg = [...multiDef];
    filteredImg.splice(values, 1);
    this.props.DefChange(filteredImg);
  }

  render() {
    const { value, multiple, accept, error, link, multiDef } = this.props;
    let tempPlaceHolder = this.props.placeholder;
    if (value != "" && value !== null) {
      if (value instanceof Object && !Array.isArray(value)) {
        tempPlaceHolder =
          value?.name?.length > 20 ? value?.name?.substr(0, 20) : value.name;
      } else {
        tempPlaceHolder = value?.length + " Selected";
      }
    }
    return (
      <div className={styles.positionR}>
        <div></div>

        <div className={styles.fileUpload}>
          <div
            className={styles.fileName}
            style={
              error
                ? { border: "1px solid red", color: "red" }
                : { color: "grey" }
            }
          >
            {tempPlaceHolder}
          </div>

          <div>
            <label className={styles.fileLabel}>Upload</label>
            <input
              multiple={multiple}
              id="upload"
              data-value={"JPG"}
              accept={accept ? accept : "image/*"}
              onChange={this._handleFileChange}
              className={styles.fileInput}
              type="file"
            />
          </div>
        </div>
        <div className={styles.WrapInner}>
          {
            accept === "image/*" ?

              (multiDef?.length > 0 &&
                multiDef?.map((image, index) => (
                  <div className={styles.imgWrapper}>
                    <img key={`Image_def_${index}`} src={image} alt={`Images ${index}`} />
                    <div
                      className={styles.removeCls}
                      onClick={() => this._removedefImages(index)}
                    >
                      Remove
                    </div>
                  </div>
                ))
              ) :
              multiDef?.map((image, index) => (
                <div className={styles.imgWrapper}>
                  <video key={`Image_def_${index}`} src={image} alt={`Images ${index}`}
                    style={{ height: "200px", width: "300px" }}
                  >
                  </video>
                  <div
                    className={styles.removeCls}
                    onClick={() => this._removedefImages(index)}
                  >
                    Remove
                  </div>
                </div>
              ))
          }
          {accept === "image/*" ?
            (value?.length) > 0 &&
            value?.map((image, index) => (
              <div className={styles.imgWrapper}>
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Image_${index}`}
                />
                <div
                  className={styles.removeCls}
                  onClick={() => this._removeImage(index)}
                >
                  Remove
                </div>
              </div>
            ))
            : (value?.length) > 0 &&
            value?.map((image, index) => (
              <div className={styles.imgWrapper}>
                <video
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Image_${index}`}
                  style={{ height: "200px", width: "300px" }}
                >
                </video>
                <div
                  className={styles.removeCls}
                  onClick={() => this._removeImage(index)}
                >
                  Remove
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default MultiFile;
