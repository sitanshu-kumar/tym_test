import { createStore, combineReducers } from "redux";

let appState = {
    employeeList: [],
    surveyList: [],
    copySurveyList: [],
    assignedSurvey: [],
    copyAssignedSurvey: [],
    selectedEmployee: ''
}

function appReducer(state = appState, action) {
    let stateCopy = JSON.parse(JSON.stringify(state));
    console.log(action)
    switch (action.type) {
        case "add_employee":
            stateCopy.selectedEmployee = action.payload[0].Emp_name
            stateCopy.employeeList = [...action.payload];
            return stateCopy;

        case "add_survey":
            stateCopy.surveyList = [...action.payload];
            stateCopy.copySurveyList = [...action.payload];
            return stateCopy;

        case "selected_emp":
            stateCopy.selectedEmployee = action.payload;
            return stateCopy;


        case "survey_assign":
            for (var i = stateCopy.surveyList.length - 1; i >= 0; --i) {
                if (stateCopy.surveyList[i].survey_id === action.payload.survey_id) {
                    stateCopy.surveyList.splice(i, 1);
                }
            }
            stateCopy.assignedSurvey = [...stateCopy.assignedSurvey, action.payload];
            stateCopy.copyAssignedSurvey = [...stateCopy.copyAssignedSurvey, action.payload];
            return stateCopy;

        case "survey_delete":
            for (var i = stateCopy.assignedSurvey.length - 1; i >= 0; --i) {
                if (stateCopy.assignedSurvey[i].survey_id === action.payload.survey_id) {
                    stateCopy.assignedSurvey.splice(i, 1);
                }
            }
            stateCopy.surveyList = [action.payload, ...stateCopy.surveyList];
            return stateCopy;


        case "survey_filter":
            var surveyFiltered = stateCopy.copySurveyList.filter(value => {
                return value.survey_id === action.payload || value.survey_language === action.payload;
            });

            stateCopy.surveyList = surveyFiltered;
            return stateCopy;

        case "assigned_survey_filter":
            var surveyFiltered = stateCopy.copyAssignedSurvey.filter(value => {
                return value.survey_id === action.payload || value.survey_language === action.payload;
            });

            stateCopy.assignedSurvey = surveyFiltered;
            return stateCopy;

        case "survey_filter_format":
            stateCopy.surveyList = [...stateCopy.copySurveyList]
            return stateCopy;

        case "assignedSurvey_filter_format":
            stateCopy.assignedSurvey = [...stateCopy.copyAssignedSurvey]
            return stateCopy;

        default:
            return state;
    }
}



const rootReducers = combineReducers({
    app: appReducer
});

const store = createStore(rootReducers);

export default store;