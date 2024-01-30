import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { validateUrl } from "../../../libs/RegexUtils";
import { useParams } from "react-router";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceGetNotificationDetails,
  serviceSendNotifications,
} from "../../../services/Notification.service";

function useNotificationCreate() {
  const initialForm = {
    title: "",
    message: "",
    next_screen: "",
    chapter_id: "",
    send_to: "ALL",
    event_id: "",
    send_priority: "NOW",
    send_timestamp: "",
  };

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [listData, setListData] = useState({
    CHAPTERS: [],
    EVENTS: [],
  });


  useEffect(() => {
    if (id) {
      serviceGetNotificationDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          const fd = { id: data?.id };
          Object.keys({ ...initialForm }).forEach((item) => {
            if (data[item]) {
              fd[item] = data[item];
            }
          });
          setForm({
            ...form,
            ...fd,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    serviceGetList(["CHAPTERS", "EVENTS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const checkFormValidation = useCallback(() => {
    const errors = {};
    let required = [
      "title",
      "message",
      "next_screen",
      "send_to",
      "event_id",
      "send_priority",
    ];
    if (form?.send_to === "CHAPTER") {
      required.push("chapter_id");
    }
    if (form?.send_to === "EVENT") {
      required.push("event_id");
    }
    if (form?.send_priority === "LATER") {
      required.push("send_timestamp");
    }
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });

    if (form?.send_to === 'EVENT' && form?.event_id === 'NONE') {
      errors['event_id'] = true;
    }
    if (form?.send_timestamp) {
      const date = new Date(form?.send_timestamp);
      const todayDate = new Date();
      date.setHours(0, 0, 0, 0);
      todayDate.setHours(0, 0, 0, 0);
      if (date.getTime() < todayDate.getTime()) {
        errors["send_timestamp"] = true;
      }
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

      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        serviceSendNotifications({ ...form, event_id: form?.event_id === 'NONE' ? null : form?.event_id }).then((res) => {
          if (!res.error) {
            historyUtils.goBack();
            SnackbarUtils.success("Notification Sent");
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [form, isSubmitting, setIsSubmitting]
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
    [checkFormValidation, setErrorData, form, submitToServer]
  );

  return {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    id,
  };
}

export default useNotificationCreate;
