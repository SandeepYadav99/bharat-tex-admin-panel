import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateEventBanner,
  serviceGetEventBannerDetails,
  serviceUpdateEventBanner,
} from "../../../services/EventBanner.service";
import { useMemo } from "react";
import { validateUrl } from "../../../libs/RegexUtils";

function useEventBanner({ location }) {
  const initialForm = {
     priority: "",
    type: "",
    image: null,
    link: "",
    status: true,
  };
  const [form, setForm] = useState({ ...initialForm });
  const [image, setImage] = useState("");
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLinkDisabled, setIsLinkDisabled] = useState(false);
  const selectedEventId = useMemo(() => {
    return location?.state?.eventId;
  }, [location]);

  useEffect(() => {
    if (id) {
      serviceGetEventBannerDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...form,
            id: id,
            priority: data?.priority,
            type: data?.type,
            link: data?.link,
            status: data?.status === "ACTIVE" ? true : false,
          });
          setImage(data?.image);
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["type"];

    if (!id) {
      required.push("image");
    }
    if (!image) {
      required.push("image");
    }

    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) !== 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (form?.link && !validateUrl(form?.link)) {
      errors.link = true;
      SnackbarUtils.error("Please Enter the Valid Link");
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key] ) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, image, setImage]);

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
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        LogUtils.log("key", key);
        if (key !== "image") {
          if (key === "status") {
            fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
          } else {
            fd.append(key, form[key]);
          }
        }
      });
      if (form?.image) {
        fd.append("image", form?.image);
      }
      if (selectedEventId) {
        fd.append("event_id", selectedEventId);
      }

      let req;
      if (id) {
        req = serviceUpdateEventBanner(fd);
      } else {
        req = serviceCreateEventBanner(fd);
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
  }, [form, isSubmitting, setIsSubmitting, selectedEventId]);

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
    [checkFormValidation, setErrorData, form, submitToServer, selectedEventId]
  );

  console.log("form", form);
  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    image,
    setImage,
    isLinkDisabled,
    setIsLinkDisabled
  };
}

export default useEventBanner;
