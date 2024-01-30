import React from "react";
import { Button, ButtonBase, CircularProgress } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import File from "../../../../../components/FileComponent/FileComponent.component";
import useBannerDialogHooks from "./BannerDialog.hook";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    textDecoration: "underline",
  },
  textField: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BannerDialog = ({ isOpen, handleToggle, candidateId }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    image,
    setImage,
    onBlurHandler,
    listData,
    isSubmitting
  } = useBannerDialogHooks({ isOpen, handleToggle, candidateId });

  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        open={isOpen}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.headerContainer}>
            <div>
              <span className={styles.heading}>Manage Banner</span>
              <div className={styles.newLine} />
            </div>
          </div>
          <div className={styles.resetWrapper}>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>

          <div className={styles.fieldWrapper}>
            {image ? (
              <>
                {image && <img src={image} className={styles.imgClass} />}
                <div className={styles.remove} onClick={() => setImage("")}>
                  Remove
                </div>
              </>
            ) : (
              <div className={"formGroup"}>
                <File
                  max_size={10 * 1024 * 1024}
                  type={[ "jpeg", "jpg", "png"]}
                  fullWidth={true}
                  name="od1"
                  label="Upload  Banner Image"
                  accept={"image/*"}
                  error={errorData?.image}
                  value={form?.image}
                  placeholder={"Upload  Banner Image"}
                  onChange={(file) => {
                    if (file) {
                      changeTextData(file, "image");
                    }
                  }}
                />
                <div className={styles.inst}>
                  <InfoOutlinedIcon />
                  Recommended Size for banner image is 500x400 px
                </div>
              </div>
            )}
          </div>
          {!image && (
            <div className={styles.printFlex}>
           
              <ButtonBase onClick={handleSubmit} className={styles.createBtn}>
              {isSubmitting ?   <CircularProgress color="success" size="20px" /> :
                "Submit" }
              </ButtonBase>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default BannerDialog;
