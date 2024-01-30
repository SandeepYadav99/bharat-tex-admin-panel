import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { actionDetailAppUser } from "../../../../actions/AppUser.action";
import styles from "./Style.module.css";
import { useHistory } from "react-router-dom";
import { Add } from "@material-ui/icons";
import {
  Button,
  Paper,
  Checkbox,
  IconButton,
  MenuItem,
  ButtonBase,
  Menu,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

const CardDetail = ({ value }) => {
  const params = useParams();
  const history = useHistory();

  const handleUpdate = () => {
    history.push(`/business-list` + "/" + params?.id);
  };
  return !value ? (
    <p> Loading.... </p>
  ) : (
    <div className={styles.parent}>
      <Paper elevation={1} className={styles.box}>
        <b className={styles.titleValue}>Greeting information</b>

        <div className={styles.container}>
          <div className={styles.sub_container}>
            <div className={styles.titleValueData}>
              <p className={styles.keyData}>Name:</p>
              <p className={styles.valueData}>{value?.name}</p>
            </div>
            <div className={styles.titleValueData}>
              <p className={styles.keyData}>Updated On:</p>
              <p className={styles.valueData}>{value?.updatedAtText}</p>
            </div>
          </div>
          <div>
            <div className={styles.titleValueData}>
              <p className={styles.keyDataSecond}>Date:</p>
              <p className={styles.valueData}>{value?.dateText}</p>
            </div>
          </div>
        </div>
      </Paper>
      <Paper elevation={1} className={styles.box}>
        <div>
          <span className={styles.title}> Greeting Images</span>
          <div className={styles.newLine} />
        </div>
        <div className={styles.imageContainer}>
          {value?.image?.map((val, i) => {
            return (
              <a href={val} target="_blank">
              <img
                src={val}
                alt="Image Dummy"
                key={i}
                className={styles.imageHeightAdjust}
              />
              </a>
            );
          })}
        </div>
        <div className={styles.btnBaseBackground}>
          <ButtonBase
            onClick={handleUpdate}
            className={"createBtn"}
            id={styles.btnDatavalue}
            style={{width:"100px"}}
          >
            ADD
          </ButtonBase>
        </div>
      </Paper>
    </div>
  );
};

export default CardDetail;
