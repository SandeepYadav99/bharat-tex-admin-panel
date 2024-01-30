import TopNavBar from "../../../components/TopNavBar/TopNavBar.js";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import { ButtonBase} from "@material-ui/core";
import FeedPostModule from "./FeedPostModule/FeedPostModule.js";
import { useParams } from "react-router-dom";

const FeedPost = () => {
   
  const params = useParams();

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
        <TopNavBar data={1} />
      </div>
      <div>
        <FeedPostModule user_id={params?.id}/>
      </div>
    </div>
  );
};

export default FeedPost;
