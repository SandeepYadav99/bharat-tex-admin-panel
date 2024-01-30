import React from "react";
import { Button, ButtonBase, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import { Autocomplete } from "@material-ui/lab";
import useAssociateDialogHook from "./AssociateDialog.hook";

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

const AssociateDialog = ({ isOpen, handleToggle, candidateId, data }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    listData,
  } = useAssociateDialogHook({ isOpen, handleToggle, candidateId, data });

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
          <div className={styles.resetWrapper}>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Associate Gallery Albums</div>
            <div className={styles.newLine}></div>
          </div>

          <div className={styles.fieldWrapper}>
            <div>
              <Autocomplete
                multiple
                id="tags-outlined"
                onChange={(e, value) => {
                  changeTextData(value, "album_id");
                }}
                value={form?.album_id}
                // id="tags-standard"
                options={listData?.ALBUMS ? listData?.ALBUMS : []}
                getOptionLabel={(option) => option.name}
                defaultValue={form?.album_id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Albums"
                    error={errorData?.album_id}
                  />
                )}
              />
            </div>
            <div className={styles.lower}>
              {form?.album_id?.length > 0 &&
                form?.album_id?.map((item) => (
                  <div className={styles.firstCellFlex}>
                    <img src={item?.thumbnail} alt="BannerImg" />
                    <div className={styles.productName}>{item?.name}</div>
                  </div>
                ))}
            </div>
          </div>

          <div className={styles.printFlex}>
            <ButtonBase onClick={handleSubmit} className={styles.createBtn}>
              Add Album
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AssociateDialog;
