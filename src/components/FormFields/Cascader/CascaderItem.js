import React, {useCallback, useMemo} from "react";
import styles from "./Style.module.css";
import csx from "classnames";
import {lv} from "suneditor/src/lang";


const CascaderItem = ({ options, level, label, handleClick, value }) => {

    const handleItemClick = useCallback((data, index) => {
        handleClick(data,index,level);
    }, [handleClick, level]);


    const items = useMemo(() => {
        // console.log('cascadeerITem', label, level);
        if (options && Array.isArray(options)) {
            const items =  options.map((val, index) => {
                let isSelected = false;
                if (value && Array.isArray(value) && value.length >= 0) {
                    isSelected = value[level] === index;
                }
                return (
                    <li key={'LEVEL'+level+'index'+index} onClick={() => {handleItemClick(val, index)}} className={csx(styles.cascaderMenuItem, styles.cascaderMenuItemExpand, (isSelected ? styles.cascaderMenuItemSelected : ''))}
                        title=""
                        role="menuitem">{val.label}</li>
                );
            });
            items.unshift(<li key={'LVEL'+level+'menu'}  className={csx(styles.cascaderMenuItem, styles.cascaderMenuItemExpand)}
                              title={label}
                              role="menuitem"><b>{label}</b></li>);
            return (
                <ul className={styles.cascaderMenu}>
                    {items}
                </ul>
            )
        }
    }, [options, label, value, level]);
    return (
        <>
            {items}
        </>
    );
};

export default CascaderItem;
/*
    <span className={styles.cascaderMenuItemExpandIcon}>
                                         <i aria-label="icon: right" className={csx(styles.icon, styles.iconRight)}>
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false" className="" data-icon="right" width="1em" height="1em"
                                        fill="currentColor" aria-hidden="true">
                                        <path
                                            d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z">
                                        </path>
                                    </svg>
                                    </i>
                                        </span>
     */
