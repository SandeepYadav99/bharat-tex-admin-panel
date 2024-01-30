import { useCallback, useEffect, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isDate,
  isInvalidDateFormat,
  isNum,
  isSpace,
} from "../../../libs/RegexUtils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateBusinessList,
  serviceGetBusinessListDetails,
  serviceUpdateBusinessList,
} from "../../../services/BusinessGreeting.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../../config/constants";
import { useSelector } from "react-redux";

const initialForm = {
  name: "",
  date: "",
  image: "",
  thumbnail: "",
  status: true,
};

const useBusinessCreate = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();

  const [selectImages, setSelectImages] = useState([]);

  useEffect(() => {
    if (id) {
      serviceGetBusinessListDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          setSelectImages(data?.image);
          const fd = {};
          setForm({
            ...form,
            name: data?.name,
            date: data?.date,
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
          setImage(data?.thumbnail);
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "date", ...(id ? [] : ["thumbnail", "image"])];
    if (!id) {
      required.push("thumbnail");
    }
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
      else if (form?.date && !isDate(form?.date)) {
        if (isInvalidDateFormat(form?.date)) {
          errors["date"] = true;
        }
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
      Object.keys(form).forEach((key) => {
        if (["thumbnail", "status"].indexOf(key) < 0 && form[key]) {
          fd.append(key, form[key]);
        }
      });
      fd.append("status", form?.status ? "ACTIVE" : "INACTIVE");
      if (form?.thumbnail) {
        fd.append("thumbnail", form?.thumbnail);
      }
      if (id) {
        fd.append("id", id);
      }

      if (selectImages?.length > 0) {
        fd.append("remote_images", JSON.stringify(selectImages));
      }
      if (form?.image?.length > 0) {
        form?.image?.forEach((item) => {
          fd.append("image", item);
        });
      }

      let req = serviceCreateBusinessList;
      if (id) {
        req = serviceUpdateBusinessList;
      }

      req(fd).then((res) => {
        if (!res.error) {
          historyUtils.push("/business-list");
        } else {
          SnackbarUtils.success(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id, selectImages]);


  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    setIsSubmitting(true);
    submitToServer();
  }, [checkFormValidation, setErrorData, form,selectImages]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );
  const renderImages = (image) => {
    setSelectImages([...image]);
  };

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        if (!text || isAlphaNumChars(text)) {
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

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    isEdit,
    handleDelete,
    handleReset,
    id,
    image,
    selectImages,
    renderImages,
  };
};

export default useBusinessCreate;
