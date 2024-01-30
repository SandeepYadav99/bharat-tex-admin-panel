import { useCallback, useEffect, useState } from "react";
import { serviceGetList } from "../../../../../services/index.services";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import {
  serviceCreateEventCityGuideBanner,
  serviceDetailEventCityGuideBanner,
} from "../../../../../services/EventCityGuide.service";

const initialForm = {
  image: "",
};
const useBannerDialogHooks = ({ isOpen, handleToggle, candidateId }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [image, setImage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listData, setListData] = useState({
    MEMBERS: [],
  });
  const { id } = useParams();
  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
      setResData([]);
      setIsSubmitted(false);
      setIsVerified(false);
      setErrorData({});
    }
  }, [isOpen]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  useEffect(() => {
    if (id) {
      serviceDetailEventCityGuideBanner({ event_id: id }).then((res) => {
        if (!res.error) {
          console.log("data", res.data?.data[0]);
          setImage(res.data?.data[0]?.image);
        }
      });
    }
  }, [id]);
  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      setIsVerified(false);
    },
    [removeError, form, setForm, setIsVerified]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["image"];
    
    if (form?.image?.type === 'application/pdf') {
      SnackbarUtils.error("Please upload only jpeg/png/jpg file");
    }
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if ([].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      if (form?.image) {
        fd.append("image", form?.image);
      }
      fd.append("event_id", id);
      serviceCreateEventCityGuideBanner(fd).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Uploaded Successfully");
          handleToggle();
          window.location?.reload();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    isSubmitting,
    resData,
    isSubmitted,
    isVerified,
    listData,
    image,
    setImage,
    isSubmitting,
  };
};

export default useBannerDialogHooks;
