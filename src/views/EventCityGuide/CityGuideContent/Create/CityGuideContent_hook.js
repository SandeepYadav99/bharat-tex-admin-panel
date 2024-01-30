import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { serviceGetList } from "../../../../services/Common.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import LogUtils from "../../../../libs/LogUtils";
import historyUtils from "../../../../libs/history.utils";
import { serviceCreateEventList } from "../../../../services/EventList.service";

const useCityGuidContenteHook = () => {
  const initialForm = {
    banner: null,
    title: "",
    thumbnail: null,
    priority: "",
  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const descriptionRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("errorData", errorData);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["banner", "title", "priority", "thumbnail"];
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();

        Object.keys(form).forEach((key) => {
          LogUtils.log("key", key);
          if (["chapter_ids", "member_users"].includes(key)) {
            fd.append(key, JSON.stringify(form[key]));
          } else {
            fd.append(key, form[key]);
          }
        });

        console.log("form", form, errorData);
        serviceCreateEventList(fd).then((res) => {
          if (!res.error) {
            historyUtils.goBack();
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [form, isSubmitting, setIsSubmitting]
  );
console.log('form',form,descriptionRef.current)
  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleSubmit = useCallback(
    async (status) => {
      const errors = checkFormValidation();
      LogUtils.log("errors==>", errors);
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }
      console.log("yha");
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer]
  );

  console.log("form", form);
  descriptionRef.current = changeTextData;

  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    descriptionRef,
  };
};

export default useCityGuidContenteHook;
