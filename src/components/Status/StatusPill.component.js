import Constants from "../../config/constants";
import classNames from "classnames";
import React, {useMemo} from "react";

const StatusPill = ({style, status}) => {
    const clName = useMemo(() => {
        let className = 'warning';
        if (status in Constants.STATUS) {
            className = Constants.STATUS[status];
        }
        return className;
    }, [status]);

    return (<span className={classNames('status', clName)} style={style ? style : {whiteSpace:'nowrap'}} >{(status)}</span>);
};

export default StatusPill;
