/**
 * Action creators
 */

 // profile reducer actions
 export const setName = (value) => ({
     type: 'SET_NAME',
     value
 });

 export const setSurname = (value) => ({
    type: 'SET_SURNAME',
    value
});

export const setCompany = (value) => ({
    type: 'SET_COMPANY',
    value
});