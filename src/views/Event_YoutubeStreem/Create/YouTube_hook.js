import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";

import {
  serviceCreateEventSpeaker,
  serviceGetEventSpeakerDetails,
  serviceUpdateEventSpeaker,
} from "../../../services/EventSpeaker.service";
import historyUtils from "../../../libs/history.utils";
import constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import {
  serviceCreateYoutubeStreem,
  serviceUpdateYoutubeStreem,
} from "../../../services/YoutubeStreem.service";
import { isUrl, validateUrl } from "../../../libs/RegexUtils";

function useYoutubeCreateHook({ location }) {
  const initialForm = {
    event_id: "",
    link: "",
    status: true,
  };
  const eventId = location?.state?.event_id;
  const { id } = useParams();
  console.log(location, id);
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      // "s_image",
      "link",
    ];

    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (form?.link && !isUrl(form?.link)) {
      errors.link = true;
      SnackbarUtils.error("Please Enter the Valid Url");
    }
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
  console.log(form);
  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        // const fd = new FormData();
        const updatedData = {
          event_id: eventId,
          link: form?.link,
          status: form.status ? "ACTIVE" : "INACTIVE",
        };

        serviceCreateYoutubeStreem(updatedData).then((res) => {
          if (!res.error) {
            historyUtils.goBack();
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [form, isSubmitting, setIsSubmitting, id, eventId]
  );

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
  };
}

export default useYoutubeCreateHook;
