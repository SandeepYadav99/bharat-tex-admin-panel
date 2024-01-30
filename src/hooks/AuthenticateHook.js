import {useMemo} from "react";
import {useSelector} from "react-redux";
import Constants from "../config/constants";


const useAuthenticate = () => {
    const {role} = useSelector(state => state.auth);

    const isCorporateHR = useMemo(() => {
        return role === Constants.ROLES.CORPORATE_HR;
    }, [role]);

    return {
        isCorporateHR
    }
};

export default useAuthenticate;
