import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { actionDetailAppUser } from "../../../../actions/AppUser.action";
import styles from "./Style.module.css";

const UserProfileView = ({ id }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState();

  useEffect(() => {
    if (!value) {
      dispatch(actionDetailAppUser({ id }));
    }
  }, []);

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.App_User);

  useEffect(() => {
    setValue(data?.data?.details);
  });

  return !value ? (
    <p> Loading.... </p>
  ) : (
    <div>
      <div className={styles.container}>
        <div className={styles.profileContainer}>
        <div>
            <img
              src={value?.image}
              alt="Profile_Image"
              style={{ height: "107px", width: "107px", borderRadius: "107px", marginBottom:"15px" }}
            />
         </div>
          <div className={styles.profileDetails}>
            <div className={styles.description_subContainer}>
              <div className={styles.description_key}>
                <span>
                  <b>Name:</b>
                </span>
                <span>
                  <b>Phone: </b>
                </span>
                <span>
                  <b>State:</b>
                </span>
                <span>
                  <b>Designation:</b>
                </span>
              </div>
              <div className={styles.description_value}>
                <span>{value?.name}</span>
                <span>{value?.country_code} {value?.contact}</span>
                <span>{value?.state}</span>
                <span>{value?.designation}</span>
              
              </div>
            </div>
          </div>
        </div>
        <div className={styles.profileDescription}>
          <div className={styles.description_subContainer}>
            <div className={styles.description_key}>
              <span>
                <b>Email:</b>
              </span>
              <span>
                <b>City:</b>
              </span>
              <span>
                <b>Company Name:</b>
              </span>
              <span>
                <b>Industry:</b>
              </span>
            </div>
            <div className={styles.description_value}>
              <span>{value?.email}</span>
              <span>{value?.city}</span>
              <span style={{ textDecoration: "underline", color: "#AB183D" }}>
                {value?.company_name}
              </span>
              <span>{value?.industry}</span>
              {/* <span className={styles.status_description}>{value?.status}</span> */}
            </div>
          </div>
        </div>

       
      </div>

      <hr className={styles.hrLine} />
      <div>
        <p className={styles.paragraph}>
          <span>Address:</span> {value?.address}
        </p>
      </div>
    </div>
  );
};

export default UserProfileView;
