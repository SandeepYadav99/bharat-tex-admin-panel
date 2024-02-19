import React, { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import {
  serviceCreateInfoCenter,
  serviceGetInfoCenterDetails,
  serviceUpdateInfoCenter,
} from "../../../services/InfoCenter.service";

function useInfoCenterCreateHook({ location }) {
  const initialForm = {
    event_id: "",
    name: "",
    priority: "",
    file: "",
    thumbnail: "",
    status: true,
  };

  const selectedEventId = useMemo(() => {
    return location?.state?.event_id;
  }, [location]);

  const { id } = useParams();
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (id) {
      serviceGetInfoCenterDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setImage(data?.thumbnail);
          setForm({
            ...form,
            id: id,
            name: data?.name,
            priority: data?.priority,
            file: data?.file,
            status: data?.status === constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [selectedEventId, id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      // "s_image",
      "name",
      // "file",
      "priority",
      // "thumbnail",
      
    ];

    if (!id) {
      required.push("thumbnail") && required.push("file");
    }

    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (form?.file.size <= 5 * 1024 * 1024) {
      errors["file"] = false;
    } 
    // else {
    //   SnackbarUtils.error("Maximum File Upload Size 5 MB");
    //   errors["file"] = true;
    // }
    
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

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();

        for (const key in form) {
          if (form.hasOwnProperty(key)) {
            if (key === "status") {
              fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
            } else if (key === "event_id") {
              fd.append("event_id", selectedEventId);
            } else if (["thumbnail", "status", "event_id"].indexOf(key) < 0) {
              fd.append(key, form[key]);
            }
          }
        }

        if (form?.thumbnail) {
          fd.append("thumbnail", form?.thumbnail);
        }

        const req = id
          ? serviceUpdateInfoCenter(fd)
          : serviceCreateInfoCenter(fd);

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
    [form, isSubmitting, setIsSubmitting, id, selectedEventId]
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
    image,
    id
  };
}

export default useInfoCenterCreateHook;
