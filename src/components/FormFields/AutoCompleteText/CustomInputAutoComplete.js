import Autocomplete from '@material-ui/lab/Autocomplete';

const CustomInputAutocomplete = ({...rest}) => {
    return (
        <Autocomplete
            id={"custom-input-demo"+Date.now()}
            {...rest}
            renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                    <input style={{ width: 200 }} type="text" {...params.inputProps} />
                </div>
            )}
        />
    );
}

export default CustomInputAutocomplete;
