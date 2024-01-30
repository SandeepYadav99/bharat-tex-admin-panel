import { useCallback, useEffect, useRef, useState } from "react";
import {
  isAlphaNumChars,
} from "../../../libs/RegexUtils";
import LogUtils from "../../../libs/LogUtils";
import { serviceCreateKnowledgeList,serviceGetKnowledgeListDetails,serviceUpdateKnowledgeList } from "../../../services/KnowledgeCenter.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../../config/constants";

const initialForm = {
  name: "",
  priority: "",
  description:'',
  status: true,
};

const useCreate = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();


  const statusValue = form?.status === true ? "ACTIVE" : "INACTIVE";

  const payload ={
    status:statusValue,
    name:form?.name,
    description:form?.description,
    priority:form?.priority,
  }

  const payloadID ={
    status:statusValue,
    name:form?.name,
    description:form?.description,
    priority:form?.priority,
    id:id,
  }

  useEffect(() => {
    if (id) {
      serviceGetKnowledgeListDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          const fd = {};
          Object.keys({ ...initialForm }).forEach((val) => {
            fd[val] = data[val];
          });
          setForm({
            ...form,
            name:data?.name,
            description:data?.description,
            priority:data?.priority,
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
        } 
      });
    }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "priority", "description"];
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
        if (["name","priority", "description","status"].indexOf(key) < 0 && form[key]) {
          fd.append(key, form[key]);
        }
      });
      fd.append("status", form?.status ? "ACTIVE" : "INACTIVE");
      fd.append("name", `${form?.name}` );
      fd.append("priority", `${form?.priority}` );
      fd.append("description", `${form?.description}` );

      if(id){
        fd.append("id",id);
      }

      let req = serviceCreateKnowledgeList;
      if (id) {
        req = serviceUpdateKnowledgeList;
      }
      if(id){
        req(payloadID).then((res) => {
          LogUtils.log("response", res);
          if (!res.error) {
            historyUtils.push("/knowledge-center");
          } else {
            SnackbarUtils.success(res.message);
          }
          setIsSubmitting(false);
        });
      }
      else{
        req(payload).then((res) => {
          LogUtils.log("response", res);
          if (!res.error) {
            historyUtils.push("/knowledge-center");
          } else {
            SnackbarUtils.success(res.message);
          }
          setIsSubmitting(false);
        });
      }
    }
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form]);

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
      }  else {
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
  };
};

export default useCreate;
