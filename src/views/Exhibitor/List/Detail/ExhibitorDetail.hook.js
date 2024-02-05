import { useEffect, useState } from "react";
import { serviceGetExhibitorsDetails } from "../../../../services/Exhibitor.service";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const useExhibitorDetail = ({ }) => {
    const [detail, setDetail] = useState([]);
    const params = useParams();

    const empId = params?.id;


    useEffect(() => {
        serviceGetExhibitorsDetails({ id: empId }).then((res) =>
            setDetail(res?.data))
    }, [empId])


    return {
        detail
    };
};

export default useExhibitorDetail;
