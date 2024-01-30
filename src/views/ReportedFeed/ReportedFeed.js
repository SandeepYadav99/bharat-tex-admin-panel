import ReportedComment from "./ReportedComment/ReportedComment";
import ReportedPost from "./ReportedPost/ReportedPost";
import styles from "./Style.module.css";

const ReportedFeed = () => {
  return (
    <div className={styles.cont}>
      <ReportedPost />
      <ReportedComment />
    </div>
  );
};

export default ReportedFeed;
