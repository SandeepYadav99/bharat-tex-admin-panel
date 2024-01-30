import { useCallback, useEffect, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isNum,
  isSpace,
  isUrl,
} from "../../../../libs/RegexUtils";
import LogUtils from "../../../../libs/LogUtils";
import {
  serviceCreateKnowledgeStampList,
  serviceGetKnowledgeStampListDetails,
  serviceUpdateKnowledgeStampList,
} from "../../../../services/KnowledgeCenterStamp.service";
import history from "../../../../libs/history.utils";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../../../config/constants";

const initialForm = {
  name: "",
  priority: "",
  status: true,
  link: "",
  document: "",
  type: "",
};

const useStamp = ({ location }) => {
  const knowledgeCenterId = location?.state?.knowledge_center_id;
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const [typeOfFile, setTypeOfFile] = useState("");
  const [idVal, setIdVal] = useState();

  const { id } = useParams();

  useEffect(() => {
    setIdVal(id);
    if (id) {
      serviceGetKnowledgeStampListDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          const fd = {};
          Object.keys({ ...initialForm }).forEach((val) => {
            if (val !== "type") {
              fd[val] = data[val];
            }
          });
          setForm({
            ...form,
            ...fd,
            name: data?.name,
            priority: data?.priority,
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
          setTypeOfFile(data?.type);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (typeOfFile === "link") {
      setForm({
        ...form,
        document: null,
      });
      setErrorData((prevErrors) => ({
        ...prevErrors,
        document: false,
      }));
    } else if (typeOfFile === "document") {
      setForm({
        ...form,
        link: null,
      });
      setErrorData((prevErrors) => ({
        ...prevErrors,
        link: false,
      }));
    }
  }, [typeOfFile]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "priority"];

    if (typeOfFile === "link") {
      required.push("link");
      if (form?.link && !isUrl(form.link)) {
        errors.link = true;
      }
    } else if (typeOfFile === "document") {
      required.push("document");
    }

    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
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

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (["name", "priority", "status"].indexOf(key) < 0 && form[key]) {
          fd.append(key, form[key]);
        }
      });
      fd.append("knowledge_center_id", knowledgeCenterId);
      if (id) {
        fd.append("id", `${id}`);
      }
      fd.append("status", form?.status ? "ACTIVE" : "INACTIVE");
      fd.append("name", `${form?.name}`);
      fd.append("priority", `${form?.priority}`);
      fd.append("type", typeOfFile);

      let req = serviceCreateKnowledgeStampList;

      if (id) {
        req = serviceUpdateKnowledgeStampList;
      }

      req(fd).then((res) => {
        LogUtils.log("response", res);
        if (!res.error) {
          history.goBack();
        } else {
          SnackbarUtils.success(res.message);
          history.goBack();
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id, typeOfFile]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (!typeOfFile) {
      SnackbarUtils.error("Please select the file type.");
      return;
    }

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }

    submitToServer();
  }, [checkFormValidation, setErrorData, form, typeOfFile]);

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
    typeOfFile,
    setTypeOfFile,
  };
};

export default useStamp;
