import { useCallback, useEffect, useState } from "react";
import { isAlphaNumChars, isNum, isSpace } from "../../../libs/RegexUtils";
import useDebounce from "../../../hooks/DebounceHook";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateEventOrganiserUser,
  serviceGetEventOrganiserUserDetails,
  serviceUpdateEventOrganiserUser,
} from "../../../services/EventOrganiserUser.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import { serviceGetList } from "../../../services/index.services";

const initialForm = {
  image: "",
  company_name: "",
  brand: "",
  product_group: [],
  product_category: [],
  product: [],
  event_venue: "",
  booth_number: "",
  zone: "",
  partner_type: "",
  primary_email: "",
  password: "",
  secondary_email: "",
  secondary_password: "",
  comapany_person_name: "",
  designation: "",
  phone_number: "",
  alternate_number: "",
  address: "",
  website: "",
  instagram: "",
  facebook: "",
  linkdin: "",
  twitter: "",
  company_brochure:"",
  gallery:"",
  company_description:"",
  status:false,
};

const useExhibitorCreate = ({ location }) => {
  const [errorData, setErrorData] = useState({});
  const [image, setImage] = useState("");
  const [form, setForm] = useState({ ...initialForm });
  const [selectImages,setSelectImages] = useState([]);
  const [checked,setChecked] = useState(false);


  const handleCheckedData =()=>{
    setChecked(()=> !checked)
  }

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [""];
  }, [form, errorData]);

  const submitToServer = useCallback(() => {}, []);

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
      if (fieldName ) {
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
  }, [form, setForm]);

  const renderImages = (image) => {
    setSelectImages([...image]);
  };



  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    handleDelete,
    handleReset,
    image,
    selectImages,
    setSelectImages,
    renderImages,
    handleCheckedData,
    checked,
  };
};

export default useExhibitorCreate;
