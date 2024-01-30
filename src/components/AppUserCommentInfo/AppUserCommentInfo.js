import { useDispatch, useSelector } from "react-redux";
import styles from "./Style.module.css";

const AppUserCommentInfo = () => {
  const { commentInfo } = useSelector((state) => state.App_User);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            src={commentInfo?.data[0]?.user?.image}
            alt="img"
            className={styles.imageHeight}
          />
        </div>
        <div className={styles.details}>
          <div className={styles.divider}>
            <span className={styles.spanDecoration}>
              <b>Posted By : </b>
              <span styles={{color:"#818181"}}>
              {commentInfo?.data[0]?.user?.name}
              </span>
            </span>
            <span className={styles.spanDecoration}>
              <b>No of Likes :</b>
              <span styles={{color:"#818181"}}>{commentInfo?.data[0]?.likes}</span>
            </span>
          </div>
          <div className={styles.divider}>
          <span className={styles.spanDecoration}>
              <b>Posted On : </b>
              <span styles={{color:"#818181"}}>{commentInfo?.data[0]?.postedAtDateTime}</span>
            </span>
            <span className={styles.spanDecoration}>
              <b>Number of Comments : </b>
              <span styles={{color:"#818181"}}>{commentInfo?.data[0]?.comments}</span>
              
            </span>
          </div>
        </div>
        <div className={styles.token}>
        <span className={styles.spanDecoration}>
          <b>Content:</b>
          <span styles={{color:"#818181"}}>{commentInfo?.data[0]?.title}</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default AppUserCommentInfo;
