import TopNavBar from "../../../components/TopNavBar/TopNavBar.js";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import { ButtonBase} from "@material-ui/core";

const AssociateEvent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          {" "}
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b> User Details</b>
            </span>{" "}
          </ButtonBase>
          <div className={styles.newLine} />{" "}
        </div>
      </div>
      <div className={styles.topNavBar}>
        <TopNavBar data={3} />
      </div>
    </div>
  );
};

export default AssociateEvent;
