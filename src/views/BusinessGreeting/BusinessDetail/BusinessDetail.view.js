import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import useBusinessDetail from "./BusinessDetail.hook";
import CardDetail from "./CardDetail/CardDeatil.view";
import StatusPill from "../../../components/Status/StatusPill.component";

const BusinessDetail = () => {
  const history = useHistory();
  const { detailData,handleUpdate } = useBusinessDetail({});

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <div className={styles.topBtnLeft}>
          <ButtonBase
          onClick={() => handleUpdate()}
          className={"createBtnMng"}
          style={{width:"100px"}}
        >
          Edit 
        </ButtonBase></div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Business Greeting Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <CardDetail value={detailData} />
    </div>
  );
};

export default BusinessDetail;
