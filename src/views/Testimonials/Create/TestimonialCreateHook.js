import { useCallback, useEffect, useRef, useState } from "react";
import { isEmail } from "../../../libs/RegexUtils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import Constants from "../../../config/constants";
import {
  serviceCreateProductGroup,
  serviceGetProductGroupDetails,
  serviceUpdateProductGroup,
} from "../../../services/ProductGroup.service";
import historyUtils from "../../../libs/history.utils";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  serviceCreateTestimonial,
  serviceGetTestimonialDetails,
  serviceUpdateTestimonial,
} from "../../../services/Testimonial.service";

const initialForm = {
  image: "",
  name: "",
  designaion: "",
  company: "",
  priorty: "",
  text: "",
  status: true,
};

const useTestimonialCreate = ({location}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState("");
  const includeRef = useRef(null);
  const { id: empId } = useParams();
  useEffect(() => {
    if (empId) {
      serviceGetTestimonialDetails({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;

          setForm({
            ...form,
            name: data?.name,
            designaion: data?.designation,
            company: data?.company,
            priorty: data?.priority,
            text: data?.text,
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
          setImage(data?.image);
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [empId]);

  // useEffect(() => {
  //   if (!isSidePanel) {
  //     handleReset();
  //   }
  // }, [isSidePanel]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "priorty"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
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
      const formData = new FormData();
      formData.append("name", form?.name);
      formData.append("image", form?.image);
      formData.append("designation", form?.designaion);
      formData.append("company", form?.company);
      formData.append("priority", form?.priorty);
      formData.append("text", form?.text);
      formData.append("status", form?.status ? "ACTIVE" : "INACTIVE");
      formData.append("event_id", location?.state?.event_id );
      let req;
      if (empId) {
        formData.append("id", empId);
        req = serviceUpdateTestimonial(formData);
      } else {
        req = serviceCreateTestimonial(formData);
      }
      req.then((res) => {
        if (!res.error) {
          historyUtils.goBack();
          // window.location.reload();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, empId]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, includeRef.current]);

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
        t[fieldName] = text?.replace(/^\s+/, "");
      }else if (fieldName === "company") {
        t[fieldName] = text?.replace(/^\s+/, "");
      }else if (fieldName === "designaion") {
        t[fieldName] = text?.replace(/^\s+/, "");
      }else if (fieldName === "text") {
        t[fieldName] = text?.replace(/^\s+/, "");
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
    includeRef,
    handleReset,
    empId,
    showPasswordCurrent,
    setShowPasswordCurrent,
    image,
  };
};

export default useTestimonialCreate;
