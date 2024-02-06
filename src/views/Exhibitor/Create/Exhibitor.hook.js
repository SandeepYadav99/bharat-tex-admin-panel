import { useCallback, useEffect, useState } from "react";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import {
  serviceCreateExhibitors,
  serviceUpdateExhibitors,
  serviceExhibitorsList,
  serviceGetProductList,
  serviceGetExhibitorsDetails,
} from "../../../services/Exhibitor.service";
import historyUtils from "../../../libs/history.utils";
import { isEmail } from "../../../libs/RegexUtils";

const initialForm = {
  company_logo: "",
  company_name: "",
  brand_name: "",
  product_groups: [],
  product_categories: [],
  products: [],
  event_venue: "",
  event_stall: "",
  zone_tag: [],
  partner_tag: "",
  primary_email: "",
  password: "",
  secondary_email: "",
  secondary_password: "",
  company_perosn_name: "",
  conatct_person_designation: "",
  primary_conatct_number: "",
  other_conatct_number: "",
  company_address: "",
  website: "",
  instagram_link: "",
  facebook_link: "",
  linkedin_link: "",
  twitter_link: "",
  company_brochure: "",
  gallery_images: "",
  company_description: "",
  status: true,
  country_code: "",
  secondary_perosn_name: "",
  youtube_link: "",
  is_partner:false
};

const useExhibitorCreate = ({ location }) => {
  const [errorData, setErrorData] = useState({});
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting]=useState(false)
  const [form, setForm] = useState({ ...initialForm });
  const [selectImages, setSelectImages] = useState([]);
  const [checked, setChecked] = useState(false);
  const [productListData, setProductListData] = useState([]);
  const [listData, setListData] = useState({
    PRODUCT_GROUP: [],
    PRODUCT_CATEGORY: [],
  });

  const EventListManager = ["FIBERS_YARNS","FABRICS","APPAREL_FASHION","HOME_TEXTILE","HANDLOOM","TECHNICAL_TEXTILE","HANDICRAFTS_CARPETS","INTELLIGENT_MANUFACTURING"]


  useEffect(() => {
    serviceExhibitorsList({ list: ["PRODUCT_CATEGORY", "PRODUCT_GROUP"] }).then(
      (res) => {
        if (!res.error) {
          setListData(res.data);
        }
      }
    );
  }, []);

  useEffect(() => {
    serviceGetProductList().then((res) => {
      if (!res.error) {
        setProductListData(res.data);
      }
    });
  }, []);

  const params = useParams();

  const empId = params?.id;

  const handleCheckedData = () => {
    setChecked(() => !checked);
  };

  useEffect(() => {
    if (empId) {
      serviceGetExhibitorsDetails({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setSelectImages(data?.gallery_images)
          setImage(data?.company_logo)
          setForm({
            ...form,
            products:data?.products,
            company_name: data?.company_name,
            product_groups: data?.product_groups,
            product_categories: data?.product_categories,
            event_venue: data?.event_venue,
            primary_email: data?.primary_email,
            password: data?.password,
            company_perosn_name: data?.company_perosn_name,
            conatct_person_designation: data?.conatct_person_designation,
            primary_conatct_number: data?.primary_conatct_number,
            company_address: data?.company_address,
            country_code: data?.country_code,
            instagram_link: data?.instagram_link,
            youtube_link: data?.youtube_link,
            linkedin_link: data?.linkedin_link,
            facebook_link: data?.facebook_link,
            twitter_link: data?.twitter_link,
            zone_tag: data?.zone_tag,
            event_stall: data?.event_stall,
            website: data?.website,
            secondary_perosn_name: data?.secondary_perosn_name,
            company_description: data?.company_description,
            brand_name: data?.brand_name,
            secondary_email: data?.secondary_email,
            other_conatct_number: data?.other_conatct_number,
            partner_tag:data?.partner_tag,
            status:data?.status,
            is_partner:data?.is_partner,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [empId]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "company_name",
      "product_groups",
      "product_categories",
      "event_venue",
      "primary_email",
      // "password",
      "company_perosn_name",
      "conatct_person_designation",
      "primary_conatct_number",
      "company_address",
      "country_code",
    ];
    if(form?.is_partner){
      required.push("partner_tag")
    }else{
      delete errors["partner_tag"]
    }
    if(!empId){
      required.push("password")
    }
    required.forEach((val) => {
      if (form?.product_categories?.length === 0) {
        errors["product_categories"] = true;
      }
      if (form?.product_groups?.length === 0) {
        errors["product_groups"] = true;
      }
      if (!form?.[val]) {
        errors[val] = true;
      }
    });
    if(form?.primary_email && !isEmail(form?.primary_email)){
      errors["primary_email"]="Invalid email address "
    }
    if(form?.secondary_email && !isEmail(form?.secondary_email)){
      errors["secondary_email"]="Invalid email address "
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(async() => {
    if (isSubmitting) {
      return;
    }
  
    setIsSubmitting(true);
  
    const fd = new FormData();

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
          key === "product_groups" || 
          key === "zone_tag"
        ) {
          if (key === "products") {
            fd.append(key, JSON.stringify(form?.products));
          } 
          else if(key === "zone_tag"){
            fd.append(key, JSON.stringify(form?.zone_tag));
          }
          else {
            fd.append(key, JSON.stringify(form[key]));
          }
        } else if (key === "primary_conatct_number") {
          fd.append(key, `${form?.primary_conatct_number}`);
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
    if (selectImages?.length > 0) {
      fd.append("remote_images", JSON.stringify(selectImages));
    }
  
    let req;

    if (empId) {
      fd.append("id", empId);
      req = serviceUpdateExhibitors(fd);
    } else {
      req = serviceCreateExhibitors(fd);
    }
    req.then((res) => {
      if (!res.error) {
        historyUtils.goBack();
      } else {
     
        SnackbarUtils.error(res.message);
      }
      setIsSubmitting(false)
    });
  }, [form, errorData,selectImages]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
   return true
     
    }
   await submitToServer();
  }, [checkFormValidation, setErrorData, form,selectImages]);

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
      if (fieldName=== "company_name") {
        t[fieldName] = text;
      }else if(fieldName=== "primary_email"){
        t[fieldName] = text;
      }else if(fieldName=== "primary_email"){
        t[fieldName] = text;
      }else if(fieldName=== "secondary_email"){
        t[fieldName] = text;
      } else if (fieldName === "products") {
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
      }else if(fieldName){
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
    listData,
    productListData,
    EventListManager,
    image,
    empId
  };
};

export default useExhibitorCreate;
