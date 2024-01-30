import React, {useCallback, useEffect, useMemo, useState, useRef} from 'react';
import styles from './Style.module.css';
import csx from 'classnames';
import constants from "../../../config/constants";
import CascaderItem from "./CascaderItem";
import CustomTextField from "../TextField/TextField.component";
import LogUtils from "../../../libs/LogUtils";

const Cascader = ({label, isError, defaultValue, options, handleChange, value, itemLabels, ...rest}) => {
    const [pos, setPos] = useState([0,0]);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [stringValue, setValue] = useState('');
    const divRef = useRef(null);
    const lastValue = useRef("");

    useEffect(() => {
        if (lastValue.current === "" && Array.isArray(value)) {
            lastValue.current = value;
            value && setSelected(getSelectedValues(value, options));
        }
    }, [value]);


    useEffect(() => {
        value && setSelected(getSelectedValues(value, options));
    }, [options]);


    const getSelectedValues = useCallback((arr, options, level = 0, res = []) => {
        if (arr.length == res.length) {
            return res;
        }
        const tempIndex = options.findIndex(val => val.value === arr[level].value);
        if (tempIndex < 0) {
            return [];
        }
        res.push(tempIndex);
        return getSelectedValues(arr, options[tempIndex]?.children, level + 1, res);
    }, [])

    const calcLevels = (opt) => {
        if (!opt) {
            return 0;
        }
        return 1 + calcLevels(opt[0]?.children);
    }

    const totalLevels = useMemo(() => {
        return calcLevels(options);
    }, [options]);


    useEffect(() => {
        if (selected.length === totalLevels) {
            setIsOpen(false);
            const dataArr = getSelectedArr(selected);
            handleChange && handleChange(dataArr, selected);
            setValue(makeStringValue(dataArr));
        } else {
            setValue('');
        }
    }, [totalLevels, selected]);


    useEffect(() => {
        document.addEventListener("click", handleOutsideClick, false);
        return () => {
            document.removeEventListener("click", handleOutsideClick, false);
        }
    }, [isOpen]);


    const handleOutsideClick = useCallback((e) => {
        if (divRef.current) {
            if (!divRef.current.contains(e.target) && isOpen) {
                setIsOpen(false);
            }
        }
    }, [isOpen, setIsOpen]);

    const makeStringValue = useCallback((arr) => {
        let str = ''
        arr.forEach((val, index) => {
            str += val.label;
            if (totalLevels - 1 > index) {
                str += '/';
            }
        });
        return str;
    }, [totalLevels]);

    const getSelectedArr = useCallback((selected) => {
        const arr = [];
        let temp = JSON.parse(JSON.stringify(options));
        selected.forEach((val) => {
            const t = temp[val];
          arr.push({value: t.value, label: t.label });
          temp = t.children;
        });
        return arr;
    }, [options]);


    const handleItemClick = useCallback((data, index, level) => {
        const arr = [...selected];
        arr.splice(level+1);
        arr[level] = index;
        setSelected(arr);
    }, [setSelected, selected, getSelectedArr]);

    const handleBtnClick = useCallback((e) => {
        e.stopPropagation();
        const rec = e.currentTarget.getBoundingClientRect();
        const width = e.currentTarget.offsetWidth;
        const height = e.currentTarget.offsetHeight;
        setPos([rec.left + window.scrollX, rec.top + height + window.scrollY]);
        console.log(rec.left + window.scrollX, rec.top  + window.scrollY, window.scrollX, window.scrollY, width, height);
        setIsOpen(e => !e);
    }, [setIsOpen, setPos]);

    const renderItems = useMemo(() => {
        const arr = [];
        arr.push(<CascaderItem value={selected} handleClick={handleItemClick} label={Array.isArray(itemLabels) ? itemLabels[0] : ''} level={0} options={options} />);
        let cascader = JSON.parse(JSON.stringify(options));
        selected.forEach((val, index) => {
            const temp = cascader[val];
            if (temp?.children) {
                arr.push(<CascaderItem value={selected} handleClick={handleItemClick} label={Array.isArray(itemLabels)  ? itemLabels[index+1] : ''} level={index + 1} options={temp.children}/>);
                cascader = temp.children;
            }
        });
        return arr;
    }, [selected, handleItemClick, options, itemLabels]);

    const renderMenu = useMemo(() => {
        if (isOpen) {
            return (
                <div className={styles.cascaderCont} ref={ref => {divRef.current = ref; }}>
                    <div>
                        <div className={csx(styles.antCascaderMenus, styles.cascaderMenusPlacementBottomLeft)} style={ isOpen ?  {left: `${pos[0]}px`, top: `${pos[1]}px`} : {}}>
                            <div>
                                {renderItems}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } return null;
    }, [pos, isOpen, renderItems]);

    return (
        <div className={'darkColor'}>
            <CustomTextField
                label={label}
                inputProps={{ readOnly: true }}
                isError={isError}
                onClick={handleBtnClick}
                errorText={''}
                disabled={true}
                value={stringValue}
                {...rest}
            />
            {renderMenu}
        </div>
    )
};

export default Cascader;
