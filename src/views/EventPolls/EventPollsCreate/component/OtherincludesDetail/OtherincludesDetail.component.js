import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import styles from "./style.module.css";
import { useParams } from "react-router";
import LogUtils from "../../../../../libs/LogUtils";
import OtherincludesDetailFields from "./OtherincludesDetailFields.component";
import { ButtonBase } from "@material-ui/core";
import { Add } from "@material-ui/icons";

const TEMP_OBJ = {
  option: "",
};

const OtherincludesDetailForm = ({ data, errorData: errorForm }, ref) => {
  const [fields, setFields] = useState([{ ...TEMP_OBJ }, { ...TEMP_OBJ }]);
  const [errorData, setErrorData] = useState({});
  const [variants, setVariants] = useState([]);
  const { id } = useParams();

  useImperativeHandle(ref, () => ({
    isValid() {
      return validateData();
    },
    resetData() {
      setFields([JSON.parse(JSON.stringify(TEMP_OBJ))]);
    },
    getData() {
      return fields;
    },
    setData(data) {
      setFields([...data]);
    },
  }));

  const getState = () => {
    return fields;
  };

  const validateData = (index, type) => {
    const errors = {};
    fields.forEach((val, index) => {
      const err =
        index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
      const required = ["option"];
      required.forEach((key) => {
        if (!val[key] && val[key] !== 0) {
          err[key] = true;
        }
      });

      if (Object.keys(err)?.length > 0) {
        errors[index] = err;
      }
    });

    console.log("othererroros", errors);
    setErrorData(errors);
    return !(Object.keys(errors).length > 0);
  };
  useEffect(() => {
    if (data) {
      setFields({ ...data });
    }
  }, [data]);

  const removeErrors = useCallback(
    (index, key) => {
      const errors = JSON.parse(JSON.stringify(errorData));
      if (errors[index] != undefined && " ") {
        if (Array.isArray(key)) {
          key.forEach((k) => {
            delete errors[index][k];
          });
        } else {
          delete errors[index][key];
        }
        setErrorData(errors);
      }
    },
    [setErrorData, errorData]
  );

  const changeData = (index, data, dateValue) => {
    const tempData = [...fields];
    if (dateValue) {
      tempData.forEach((item) => (item.travel_date = ""));
    } else {
      tempData[index] = { ...tempData[index], ...data };
    }
    LogUtils.log("data", data);
    setFields(tempData);
    const errArr = [];
    Object.keys(data).forEach((key) => {
      errArr.push(key);
    });
    removeErrors(index, errArr);
  };

  const onBlur = useCallback(() => {}, []);
  const handlePress = async (type, index = 0) => {
    LogUtils.log("type", type, index);
    const oldState = [...fields];
    if (type == "ADDITION") {
      oldState.push(TEMP_OBJ);
    } else {
      if (oldState.length === 1) {
        return true;
      }
      oldState.splice(index, 1);
    }
    LogUtils.log("oldState", oldState);
    setFields(oldState);
    // validateData();
  };

  const renderFields = useMemo(() => {
    return fields.map((val, index) => {
      const tempFilters = variants.filter((variant) => {
        const index = fields.findIndex((val) => val?.sku?.sku === variant?.sku);
        return index < 0;
      });
      return (
        <div className={styles.Inner}>
          <OtherincludesDetailFields
            variants={tempFilters}
            validateData={validateData}
            errors={index in errorData ? errorData[index] : null}
            changeData={changeData}
            handlePress={handlePress}
            data={val}
            index={index}
            onBlur={onBlur}
          />
        </div>
      );
    });
  }, [
    variants,
    errorData,
    validateData,
    changeData,
    handlePress,
    onBlur,
    fields,
  ]);

  return (
    <>
      {renderFields}
      {fields?.length < 6 && (
        <div className={styles.btnWrapper}>
          <ButtonBase
            className={styles.addition}
            label={"+"}
            onClick={() => {
              handlePress("ADDITION", 0);
            }}
          >
            <Add fontSize={"small"} /> <span>Add </span>
          </ButtonBase>
        </div>
      )}
    </>
  );
};

export default forwardRef(OtherincludesDetailForm);
