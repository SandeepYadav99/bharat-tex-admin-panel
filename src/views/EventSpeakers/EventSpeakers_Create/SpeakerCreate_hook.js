import  { useCallback, useEffect, useMemo } from "react";
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


function useSpeakerCreateHook({ location }) {
  const [speaker,setSpeaker] = useState(false);
  const initialForm = {
    s_image: "",
    s_name: "",
    s_description: "",
    s_company: "",
    s_designation: "",
    s_status: true,
    is_moderator:true,
    priority:'',
  };
  const { id } = useParams();
  const eventId = location?.state?.event_id;

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");

  const images = useMemo(() => {
    return image;
  }, [image]);



  useEffect(() => {
    if (id) {
      serviceGetEventSpeakerDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          setForm({
            ...form,
            id: data?.s_id,
            s_name: data?.s_name,
            s_description: data?.s_description,
            s_company: data?.s_company,
            s_designation: data?.s_designation,
            s_status: data?.s_status === constants.GENERAL_STATUS.ACTIVE,
            priority:data?.priority,
            // is_moderator
          });
          setImage(data?.s_image);
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [eventId, id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      //  "s_image",
      "s_name",
     
      "s_company",
      // "s_designation"
    
    ];

    // if (!id) {
    //   required.push("s_image");
    // }
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
        const SPEAKER_KEY = {
          s_name: "s_name",
          s_description: "s_description",
          s_designation: "s_designation",
          s_company: "s_company",
        };
        for (const key in form) {
          if (SPEAKER_KEY.hasOwnProperty(key)) {
            fd.append(SPEAKER_KEY[key], form[key]);
          }
        }

        fd.append("s_status", form.s_status ? "ACTIVE" : "INACTIVE");// is_moderator
        // fd.append("is_moderator", form.is_moderator ? "ACTIVE" : "INACTIVE");// is_moderator
        if (form?.s_image) {
          fd.append("s_image", form?.s_image);
        }

        if(form?.priority){
          fd.append("priority",form?.priority)
        }
        
        // if(params?.id){
        //   if (form?.s_image) {
        //     fd.append("s_image", form?.s_image);
        //   }
        //   else{
        //     fd.append("s_image")
        //   }
        // }
        if (eventId) {
          fd.append("event_id", eventId);
        }
        if (id) {
          fd.append("id", id);
        }

        const serviceFunction = id
          ? serviceUpdateEventSpeaker
          : serviceCreateEventSpeaker;

        serviceFunction(fd).then((res) => {
          if (!res.error) {
            historyUtils.goBack();
            // historyUtils.push(`${RouteName.EVENTS_SPEAKERS_LIST}`);
          } else {
            SnackbarUtils.error(res.message);
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
    images,
    setImage,
    speaker,
    id
  };
}

export default useSpeakerCreateHook;
