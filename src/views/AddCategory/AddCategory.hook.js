import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import { useMemo } from "react";
import { serviceAddCategoryDetails, serviceCreateCategory, serviceUpdateCategory } from "../../services/AddCategory.service";
import { useSelector } from "react-redux";
import Constants from "../../config/constants";


function useAddCategory({ location }) {
  const { user } = useSelector((state) => state.auth);
  const initialForm = {
    priority: "",
    name: "",
    status: true,
    event_id: `${user?.event_id}`,
  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedEventId = useMemo(() => {
    return location?.state?.eventId;
  }, [location]);

  useEffect(() => {
    if (id) {
      serviceAddCategoryDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          setForm({
            ...form,
            id: id,
            priority: data?.priority,
            name: data?.name,
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["priority", "name"];
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
      } else if (fieldName === "priority") {
        if (text >= 0) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );


  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      let req;

      let createPayload ={
        ...form,
        status: form?.status  ? "ACTIVE" : "INACTIVE",
      }
      

      if (id){
        let payload = {
          ...form,
          id:id,
          event_id:`${user?.event_id}`,
          status: form?.status === true ? "ACTIVE" : "INACTIVE",
        }
        req = serviceUpdateCategory({ ...payload });
      }
      else{
        req = serviceCreateCategory({ ...createPayload });
      }
      
      req.then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting]);

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

      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer]
  );

  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    selectedEventId,
  };
}

export default useAddCategory;
