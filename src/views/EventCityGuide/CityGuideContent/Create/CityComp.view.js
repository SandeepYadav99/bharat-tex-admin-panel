import { ButtonBase, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import styles from "./Style.module.css";
import useCityCompHook from "./CityComp.hook";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../../libs/history.utils";
import NewEditor from "./component/NewEditor.component";
import { useParams } from "react-router-dom";

function CityCompView({ location }) {
  const {
    form,
    errorData,
    changeTextData,
    handleSubmit,
    descriptionRef,
    isSubmitting,
    onBlurHandler,
  } = useCityCompHook({ location });

  const params = useParams();

  return (
    <div className={styles.cagrWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b>{params?.id ? "Edit" : "Add"} {" "} Venue guide  Content</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.Heading}>Content Details</div>
      <div className={"formGroup"}>
        <CustomTextField
          isError={errorData?.title}
          errorText={errorData?.title}
          label={"Title"}
          value={form?.title}
          onTextChange={(text) => {
            changeTextData(text, "title");
          }}
         
        />
      </div>

      <div className={"formGroup"}>
        <CustomTextField
          isError={errorData?.priority}
          errorText={errorData?.priority}
          label={"Priority"}
          value={form?.priority}
          onTextChange={(text) => {
            changeTextData(text, "priority");
          }}
        />
      </div>
      <div className={"headerFlex"}>
        <h4 className={"infoTitle"}>
          <div className={"heading"}>Description</div>
        </h4>
      </div>
      <NewEditor
        editorData={form?.description}
        handleChange={(html) => {
          descriptionRef.current(html, "description");
        }}
      />
    
    
      <div className={styles.btnContainer}>
        <div className={styles.btnCont1}>
          <ButtonBase
            disabled={isSubmitting ? true : false}
            type={"button"}
            onClick={handleSubmit}
            className={
              isSubmitting ? styles.disabledCreatebtn : styles.createBtn
            }
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "Add"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default CityCompView;
