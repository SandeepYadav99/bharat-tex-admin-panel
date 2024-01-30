import styles from "./Style.module.css";
import DeleteIcon from "../../assets/img/ic_delete.png";
import Comments from "../../assets/img/ic_comment.png";
import { useDispatch } from "react-redux";
import {feedDeleteAppuser,feedPostAppUserData} from '../../actions/AppUser.action';
import { useEffect,useState } from "react";


const AppUserFeedIcons = ({ user_id,post_id }) => {
  const [deleteData,setDeleteData] = useState(0)
  const dispatch = useDispatch();
  let payloadData = {
    user_id,
    index: 1,
    row: null,
    order: null,
    query: "",
    query_data: null,
  };

  const handleDelete =()=>{
    dispatch(feedDeleteAppuser({post_id}))
    setDeleteData((deleteData)=>deleteData+1)
  }

  
  return (
    <div className={styles.iconContainer}>
      <img src={DeleteIcon} alt="del"  onClick={handleDelete} />
      <img src={Comments} alt="del" />
    </div>
  );
};

export default AppUserFeedIcons;
