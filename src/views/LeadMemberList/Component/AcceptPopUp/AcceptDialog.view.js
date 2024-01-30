import React from "react";
import { Button, ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomAutoComplete from "../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";

import useAcceptDialogHook from "./AcceptDialog.hook";

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

const AcceptDialog = ({ isOpen, handleToggle, candidateId }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    listData,
  } = useAcceptDialogHook({ isOpen, handleToggle, candidateId });

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
            <div className={styles.heading}>Approve Request</div>
            <div className={styles.newLine}></div>
            <div className={styles.des}>Please associate member company</div>
          </div>

          <div className={styles.fieldWrapper}>
            <div>
              <CustomAutoComplete
                autoCompleteProps={{
                  freeSolo: false,
                  getOptionLabel: (option) => option?.name || "",
                }}
                dataset={listData?.MEMBERS ? listData?.MEMBERS : []}
                datasetKey={"name"}
                onTextChange={(text, value) => {
                  changeTextData(text, "member_id");
                }}
                variant={"outlined"}
                label={"Company Name"}
                name={"member_id"}
                isError={errorData?.member_id}
                value={form?.member_id}
              />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase onClick={handleSubmit} className={styles.createBtn}>
              Submit
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AcceptDialog;
