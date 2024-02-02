import { useCallback, useEffect, useState } from "react";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import {
  serviceCreateExhibitorList,
  serviceCreateExhibitors,
  serviceUpdateExhibitorList,
  serviceUpdateExhibitors,
  serviceExhibitorsList,
  serviceGetProductList,
} from "../../../services/Exhibitor.service";
import historyUtils from "../../../libs/history.utils";

const initialForm = {
  company_logo: "",
  company_name: "",
  brand: "",
  product_groups: [],
  product_categories: [],
  products: [],
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
  company_brochure: "",
  gallery_images: "",
  company_description: "",
  status: true,
  country_code: "",
  secondary_perosn_name: "",
};

const useExhibitorCreate = ({ location }) => {
  const [errorData, setErrorData] = useState({});
  const [image, setImage] = useState("");
  const [form, setForm] = useState({ ...initialForm });
  const [selectImages, setSelectImages] = useState([]);
  const [checked, setChecked] = useState(false);
  const [productListData, setProductListData] = useState([])
  const [listData, setListData] = useState({
    PRODUCT_GROUP: [],
    PRODUCT_CATEGORY: [],
  });

  useEffect(() => {
    serviceExhibitorsList({ list: ["PRODUCT_CATEGORY", "PRODUCT_GROUP"] }).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    serviceGetProductList().then((res) => {
      if (!res.error) {
        setProductListData(res.data)
      }
    })
  }, [])


  const params = useParams();

  const empId = params?.id;

  const handleCheckedData = () => {
    setChecked(() => !checked);
  };

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "company_name",
      "product_groups",
      "product_categories",
      "event_venue",
      "primary_email",
      "password",
      "comapany_person_name",
      "designation",
      "phone_number",
      "address",
      "country_code"
    ];
    required.forEach((val) => {
      if(form?.product_categories?.length === 0){
        errors["product_categories"] = true;
      }
      if(form?.product_groups?.length === 0){
        errors["product_groups"] = true;
      }
      if (!form?.[val]) {
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
    const fd = new FormData();
    const productlist = form?.products?.map((val) => val?.name)
    Object.keys(form).forEach((key) => {
      if (
        key !== "company_logo" &&
        key !== "gallery_images" &&
        key !== "company_brochure"
      ) {
        if (key === "status") {
          fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
        } else if (key === "related_to") {
          fd.append(key, JSON.stringify(form[key]));
        } else if (
          key === "products" ||
          key === "product_categories" ||
          key === "product_groups"
        ) {
          if (key === "products") {
            fd.append(key, JSON.stringify(productlist))
          }
          else {
            fd.append(key, JSON.stringify(form[key]));
          }
        } else if (key === "phone_number") {
          fd.append(key, `${form?.country_code} ${form?.phone_number}`);
        } else {
          fd.append(key, form[key]);
        }
      }
    });
    if (form?.company_logo) {
      fd.append("company_logo", form?.company_logo);
    }
    if (form?.gallery_images?.length > 0) {
      form?.gallery_images?.forEach((item) => {
        fd.append("gallery_images", item);
      });
    }
    if (form?.company_brochure?.length > 0) {
      form?.company_brochure?.forEach((item) => {
        fd.append("company_brochure", item);
      });
    }
    let req;

    if (empId) {
      req = serviceUpdateExhibitors({ ...form, id: empId ? empId : "" });
    } else {
      req = serviceCreateExhibitors(fd);
    }
    req.then((res) => {
      if (!res.error) {
        historyUtils.goBack();
      } else {
        SnackbarUtils.error(res.message);
      }
    });
  }, [form, errorData]);

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
      if (fieldName) {
        t[fieldName] = text;
      }
      else if (fieldName === "products") {
        const newValues = text?.filter((item) => item.trim() !== "");
        const uniqueValues = text
          ? newValues?.filter(
            (item, index, self) =>
              self.findIndex(
                (t) => t.toLowerCase() === item.toLowerCase()
              ) === index
          )
          : [];

        if (uniqueValues.length <= 2) {
          t[fieldName] = uniqueValues;
        } else {
          SnackbarUtils.error("Maximum 2 Task category");
        }
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

  const handleDelete = useCallback(() => { }, []);

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
    listData,
    productListData,
  };
};

export default useExhibitorCreate;
