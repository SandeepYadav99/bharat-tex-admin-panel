class GoogleMapsUtils {
    _extractLocalityTags(searchFor, data) {
        const temp = [];
        data.forEach((result) => {
            searchFor.forEach((text) => {
                result.address_components.some((val) => {
                    val.types.forEach((type) => {
                        if (type.match(new RegExp(text, 'i'))) {
                            const tempLoc = val.long_name.toLowerCase();
                            if (temp.indexOf(tempLoc) < 0) {
                                temp.push(tempLoc);
                            }
                        }
                    });
                });
            });
        });
        return temp;
    }

    _extractMapData(searchFor, data) {
        let temp = null;
        data.forEach((result) => {
            if (temp == null) {
                searchFor.forEach((text) => {
                    if (temp == null) {
                        result.address_components.some((val) => {
                            val.types.forEach((type) => {
                                if (type.match(new RegExp(text, 'i'))) {
                                    temp = val.long_name;
                                    return true
                                }
                            });
                            if (temp != null) {
                                return true;
                            }
                        });
                    } else {
                        return true;
                    }
                });
            } else {
                return true;
            }
        });
        return temp;
    }


    _extractCity(searchFor, data) {
        let temp = null;
        data.forEach((result) => {
            if (temp == null) {
                searchFor.forEach((text) => {
                    if (temp == null) {
                        result.address_components.some((val) => {
                            if (val.types.indexOf('locality') >= 0 && val.types.indexOf('political') >= 0) {
                                temp = val.long_name;
                                return true;
                            } else {
                                val.types.forEach((type) => {
                                    if (type.match(new RegExp(text, 'i'))) {
                                        temp = val.long_name;
                                        return true
                                    }
                                });
                                if (temp != null) {
                                    return true;
                                }
                            }
                        });
                    } else {
                        return true;
                    }
                });
            } else {
                return true;
            }
        });
        return temp;
    }


    getCityCountryFromAddress(address) {
        console.log('address', address);
        // const tempLocality = this._extractMapData(['sublocality_level_1', 'sublocality_level_2', 'sublocality_level_3', 'sublocality_level_4', 'sublocality_level_5', 'sublocality', 'locality'], data);

        const city = this._extractCity(['administrative_area_level_2'], [address]);
        const country = this._extractMapData(['country'], [address]);
        const state = this._extractMapData(['administrative_area_level_1'], [address]);
        const pincode = this._extractMapData(['postal_code'], [address]);
        // const tempLocalityTags = this._extractLocalityTags(['sublocality_level_1', 'sublocality_level_2', 'sublocality_level_3', 'sublocality_level_4', 'sublocality_level_5', 'sublocality',
        //     'locality'], data);

        return {
            city, country,
            state,
            pincode
        }
    }


}

export default new GoogleMapsUtils();
