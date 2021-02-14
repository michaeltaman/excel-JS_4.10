import {storage} from "@core/utils";
import {defaultStyles, defaultTitle} from "@/constants";

const defaultState = {
    title: defaultTitle,
    colState: {},
    rowState: {},
    dataState: {}, //{ '0:1', 'text'} //cell- id, text
    stylesState: {}, //{'0:1' : {textAlign: 'left', fontWeight: 'normal', textDecoration: 'none', fontStyle: 'normal'}
    currentText: '',
    currentStyles: defaultStyles
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state'))
    : defaultState