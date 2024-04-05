import { ALL_DEPT_FAIL, ALL_DEPT_REQUEST, ALL_DEPT_SUCCESS, CREATE_DEPT_REQUEST, DELETE_DEPT_FAIL, UPDATE_DEPT_REQUEST } from "../constants/deptConstants";


export const deptReducer = (state = { dept: {} }, action) => {
    switch (action.type) {
        case CREATE_DEPT_REQUEST:
        case ALL_DEPT_REQUEST:
        return {
            loading: true,
            dept : []
        };

        case ALL_DEPT_SUCCESS:
        return {
            loading: false,
            dept: action.payload
        };

        case ALL_DEPT_FAIL:
            return {
              loading: false,
              error: action.payload,
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };

          default:
            return state;

    }
}