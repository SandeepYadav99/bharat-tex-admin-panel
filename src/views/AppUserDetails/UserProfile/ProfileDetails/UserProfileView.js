import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { actionDetailAppUser } from "../../../../actions/AppUser.action";
import styles from "./Style.module.css";

const UserProfileView = ({ id }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState();

  useEffect(() => {
    if(!value){
      dispatch(actionDetailAppUser({ id }));
    }
  },[]);

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.App_User);

  useEffect(() => {
    setValue(data?.data?.details);
  });

  return !value ? <p> Loading.... </p>:(
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <img
          src={value?.image}
          alt="Profile_Image"
          style={{ height: "50px", width: "50px", borderRadius: "100%" }}
        />
        <div className={styles.profileDetails}>
          <span>
            <b>{value?.name}</b>
          </span>
          <span>{value?.contact}</span>
          <span>{value?.email}</span>
        </div>
      </div>
      <div className={styles.profileDescription}>
        <div className={styles.description_subContainer}>
          <div className={styles.description_key}>
            <span>
              <b>Company:</b>
            </span>
            <span>
              <b>Title:</b>
            </span>
            <span>
              <b>Status:</b>
            </span>
          </div>
          <div className={styles.description_value}>
            <span style={{textDecoration:"underline",color:'#AB183D'}}>{value?.company_name}</span>
            <span>{value?.title}</span>
            <span className={styles.status_description}>{value?.status}</span>
          </div>
        </div>
      </div>
      <div className={styles.QRCode_Container}>
      
      </div>
    </div>
  );
};

export default UserProfileView;
