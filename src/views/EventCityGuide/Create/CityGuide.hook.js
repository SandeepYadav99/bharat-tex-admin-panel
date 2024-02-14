import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import LogUtils from "../../../libs/LogUtils";
import historyUtils from "../../../libs/history.utils";
import {
  serviceCreateEventCityGuide,
  serviceGetEventCityGuideDetails,
  serviceUpdateEventCityGuide,
} from "../../../services/EventCityGuide.service";

function useCityGuidCreateHook({ location }) {
  const initialForm = {
    banner: null,
    event_id: "",
    title: "",
    priority: "",
    description: "",
    thumbnail: "",
    status: "",
  };
  const colorKey = ["name2", "email", "title", "contact"];
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const descriptionRef = useRef(null);
  const [banner, setBanner] = useState("");
  const [thumb, setthumb] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedEventId = useMemo(() => {
    return location?.state?.eventId;
  }, [location]);

  useEffect(() => {
    if (id) {
      serviceGetEventCityGuideDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          console.log("data", data);
          setForm({
            ...form,
            id: id,
            priority: data?.priority,
            title: data?.title,
            event_id: data?.event_id,
            description: data?.description,
          });
          setBanner(data?.banner);
          setthumb(data?.thumbnail);
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["title", "priority", "description"];
    if (!id) {
      required.push(...["banner", "thumbnail"]);
    }
    if (!banner) {
      required.push("banner");
    }
    if (form?.banner?.type === "application/pdf") {
      SnackbarUtils.error("Please upload only jpeg/png/jpg file");
    }
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
  }, [form, errorData, banner, setBanner]);

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
      if (fieldName === "title") {
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

  descriptionRef.current = changeTextData;
console.log(id, "Id")
  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();
        Object.keys(form).forEach((key) => {
          if (["banner", "thumbnail"].indexOf(key) < 0 && form[key]) {
            fd.append(key, form[key]);
          }
        });
        if (form?.thumbnail) {
          fd.append("thumbnail", form?.thumbnail);
        }
        if (form?.banner) {
          fd.append("banner", form?.banner);
        }
        if (selectedEventId) {
          fd.append("event_id", selectedEventId);
        }
        let req;
        if (id) {
          req = serviceUpdateEventCityGuide(fd);
        } else {
          req = serviceCreateEventCityGuide(fd);
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
    },
    [form, isSubmitting, setIsSubmitting, banner, setBanner, thumb, setthumb]
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
      LogUtils.log("errors==>", errors);
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }
      submitToServer(status);
    },
    [
      checkFormValidation,
      setErrorData,
      form,
      submitToServer,
      banner,
      setBanner,
      thumb,
      setthumb,
    ]
  );

  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    descriptionRef,
    banner,
    thumb,
    setBanner,
    id
  };
}

export default useCityGuidCreateHook;
