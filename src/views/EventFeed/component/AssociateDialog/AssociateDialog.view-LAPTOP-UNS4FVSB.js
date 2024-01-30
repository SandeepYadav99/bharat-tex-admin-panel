import React from "react";
import { ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import useAssociateDialogHook from "./AssociateDialog.hook";
import DeleteIcon from "../../../../assets/img/ic_delete.png";
import WaitingComponent from "../../../../components/Waiting.component";

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
    // top: "3px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssociateDialog = ({ isOpen, handleToggle, candidateId, data }) => {
  const classes = useStyles();
  const { dataValue, isSubmitting, handleDeleteComment } =
    useAssociateDialogHook({
      isOpen,
      handleToggle,
      candidateId,
      data,
    });
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
          <div
        className={styles.popHeader}
          >
            <div className={styles.resetWrapper}>
              <ButtonBase
                classes={{ root: classes.closeBtn }}
                onClick={handleToggle}
              >
                <Close />
              </ButtonBase>
            </div>
            <div>
              <span className={"capitalize"}>
                <b>Comments</b>
              </span>
              <div className={styles.newLine} />
            </div>
          </div>
          {isSubmitting ? (
            <WaitingComponent />
          ) : (
            <div className={styles.upperWrap}>
              {dataValue?.length > 0 ? (
                dataValue?.map((val) => {
                  return (
                    <div key={val?.post_id} className={styles.containerComment}>
                      <div className={styles.imageContainer}>
                        <div className={styles.imgWrapper}>
                          <img
                            src={val?.user?.image}
                            alt="img"
                            style={{
                              height: "30px",
                              width: "30px",
                              borderRadius: "100%",
                            }}
                          />
                          <b>{val?.user?.name}</b>
                        </div>
                        <div
                          className={
                            val?.reports === 0
                              ? styles.commentWrap
                              : styles.commentFlag
                          }
                        >
                          {val?.comment}
                        </div>
                      </div>
                      <br />
                      <div className={styles.commentDeleteContainer}>
                        <img
                          src={DeleteIcon}
                          alt="del"
                          onClick={() => handleDeleteComment(val?.id)}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.noWrap}> No Comment Found.....</div>
              )}
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default AssociateDialog;
