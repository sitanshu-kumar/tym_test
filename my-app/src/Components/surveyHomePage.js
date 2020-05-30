import React from 'react';

import SurveyList from './surveyList'
import AssignedSurvey from './assignedSurvey'
import "react-notifications/lib/notifications.css";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import EmployeeList from './employeeList'
import axios from "axios";

import { Redirect } from "react-router";
class SurveyHomePage extends React.Component {
    state = {
        redirectToFinalPage: false
    }

    handleSubmit = () => {
        var employeeToAdd = this.props.employeeToAdd;
        var assignedSurvey = this.props.assignedSurvey;

        if (assignedSurvey.length < 1) {
            NotificationManager.error("Please assign Survey*");
        }
        else {
            axios({
                method: "post",
                url: "http://localhost:8000/survey_assigned",
                data: {
                    employee: employeeToAdd,
                    surveyAssigned: assignedSurvey,
                },
            }).then((response) => {
                NotificationManager.info("Survey Assigned Successfully");
                console.log(response)
                setTimeout(() => {
                    this.setState(() => ({ redirectToFinalPage: true }));
                }, 1000);
            });
        }
    }
    render() {
        if (this.state.redirectToFinalPage) {
            return <Redirect to="/assigned" />;
        }
        return (
            <>
                <div class="block">
                    <div class="columns is-mobile">
                        <div class="column  is-offset-5">
                            <EmployeeList />
                        </div>
                    </div>
                </div>

                <div class="block">
                    <div class="columns">
                        <div class="column">
                            <SurveyList />
                        </div>
                        <div class="column">
                            <AssignedSurvey />
                        </div>
                    </div>
                </div>

                <div class="block">
                    <div class="columns is-mobile">

                        <div class="column is-half is-offset-5">
                            <button class="button is-focused" onClick={this.handleSubmit}>Assign</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        employeeToAdd: state.app.selectedEmployee,
        assignedSurvey: state.app.assignedSurvey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SurveyHomePage);