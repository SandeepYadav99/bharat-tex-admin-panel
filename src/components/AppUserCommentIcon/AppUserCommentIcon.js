import styles from "./Style.module.css";
import DeleteIcon from "../../assets/img/ic_delete.png";
import Information from "../../assets/img/ic_info.png";

const AppUserCommentIcon = ({ id }) => {
  return (
    <div className={styles.iconContainer}>
      <img src={Information} alt="Info"/>
      <img src={DeleteIcon} alt="del" />
    </div>
  );
};

export default AppUserCommentIcon;
