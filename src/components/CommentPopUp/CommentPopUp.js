import React from "react";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import DeleteIcon from "../../assets/img/ic_delete.png";
import { useDispatch } from "react-redux";
import {feedCommentDeleteAppUserFeed} from '../../actions/AppUser.action';

const CommentPopUp = ({
  open,
  title,
  commentDetail,
  onClick,
}) => {

  const dispatch = useDispatch();
 
  const handleDelete = (comment_id) => {
    dispatch(feedCommentDeleteAppUserFeed({comment_id}))
  };


  return (
    <Dialog
      open={open}
      aria-labelledby="dialog-title"
      sx={{ width: "auto", padding: "20px", width: "100px" }}
    >
      <div className={styles.dialogTitle} onClick={onClick}>
        <div className={styles.titleName}> {title} </div>
        <div onClick={onClick} style={{fontSize:"24px"}}>x</div>
      </div>
      <div className={styles.newLine} />{" "}
      <div className={styles.commentArea}>
        {commentDetail?.map((val) => {
          return !val ? "Loading" : (
            <div key={val?.post_id} className={styles.containerComment}>
            <div className={styles.alignCenter}>
              <div className={styles.imageContainer}>
                {" "}
                <img
                  src={val?.user?.image}
                  alt="img"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "100%",
                  }}
                />
                <p className={styles.titleName}>{val?.user?.name}</p>
              </div>
              <br />
              <div className={styles.commentDeleteContainer}>
                {" "}
                {val?.comment}
                <img src={DeleteIcon} alt="text" style={{height:"25px",width:"25px",marginTop:"-20px"}} onClick={()=>handleDelete(val?._id)}/>
              </div>
              </div>
            </div>
          );
        })}
        
      </div>
    </Dialog>
  );
};

export default CommentPopUp;
