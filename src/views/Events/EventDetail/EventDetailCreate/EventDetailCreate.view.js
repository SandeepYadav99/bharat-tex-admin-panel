import React, { useMemo } from "react";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import styles from "./Style.module.css";
import useEventDetailCreate from "./EventDetailCreateHook";
import CustomDateTimePicker from "../../../../components/FormFields/DatePicker/CustomDateTimePicker";

const EventDetailCreate = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
  timer,
}) => {
  const {
    form,
    errorData,
    isSubmitting,
    handleSubmit,
    changeTextData,
    id,
  } = useEventDetailCreate({
    handleToggleSidePannel,
    isSidePanel,
    empId,
    timer,
  });
  return (
    <div className={styles.departmentWrap}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomDateTimePicker
            clearable
            label={"Date & Time"}
            onChange={(date) => {
              changeTextData(date, "timer_date");
            }}
            value={form?.timer_date}
            isError={errorData?.timer_date}
          />
        </div>
      </div>

      <div className={styles.btnCont}>
        <ButtonBase
          disabled={isSubmitting}
          type={"button"}
          onClick={handleSubmit}
          className={styles.createBtn}
        >
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : empId ? (
            "Set"
          ) : (
            "Set"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default EventDetailCreate;
