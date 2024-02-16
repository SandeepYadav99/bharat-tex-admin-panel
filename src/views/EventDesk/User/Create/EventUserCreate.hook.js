import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../../libs/SnackbarUtils";

import {
  serviceCreateEventUser,
  serviceGetEventUserDetails,
  serviceUpdateEventUser,
} from "../../../../services/EventUser.service";
import historyUtils from "../../../../libs/history.utils";
import constants from "../../../../config/constants";

function useEventUserCreateHook({ location }) {
  const initialForm = {
    name: "",
    status: true,
    priority:"", 
  };
  const { id } = useParams();
  const eventId = location?.state?.event_id;

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      serviceGetEventUserDetails({ id: id }).then((res) => {
        const data = res?.data?.details;
        if (res?.error) {
          SnackbarUtils.error(res?.message);
          return;
        }
      
        setForm(prevForm => ({
          ...prevForm,
          id: data?._id,
          name: data?.name,
          status: data?.status === constants.GENERAL_STATUS.ACTIVE,
          priority: data?.priority,
        }));
      });
    
    }
  }, [ id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name","priority"];

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
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = { ...form };
      if (eventId) {
        fd.event_id = eventId;
      }
      fd.status = form?.status ? "ACTIVE" : "INACTIVE";
      let req;
      if (id) {
        req = serviceUpdateEventUser(fd);
      } else {
        req = serviceCreateEventUser(fd);
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
  }, [form, isSubmitting, setIsSubmitting, id, eventId]);

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
    id
  };
}

export default useEventUserCreateHook;
