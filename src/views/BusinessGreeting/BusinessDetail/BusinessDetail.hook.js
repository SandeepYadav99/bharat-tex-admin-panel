import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { serviceGetBusinessListDetails } from "../../../services/BusinessGreeting.service";
import { useHistory } from "react-router";

const useBusinessDetail = ({}) => {
  const params = useParams();
  const history = useHistory();
  const [detailData, setDetailData] = useState();

  const payloadData = {
    id: params?.id,
  };

  const handleUpdate =()=>{
    history.push(`/business-list`+'/'+params?.id);
 }

  useEffect(() => {
    const response = serviceGetBusinessListDetails(payloadData).then(
      (data) => setDetailData(data?.data)
    );
  }, [params?.id]);

  return {
    detailData,
    handleUpdate,
  };
};

export default useBusinessDetail;
