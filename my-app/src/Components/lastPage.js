import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AssignedResult extends React.Component {

    render() {
        return (
            <div class="block">
                <div class="card">
                    <div class="card-content">
                        <p class="title">
                            Emplyoee Name-<strong>{this.props.employeeToAdd}</strong>
                        </p>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Survey Id</th>
                                    <th>Language</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.props.assignedSurvey &&
                                    this.props.assignedSurvey.map((item, index) => {

                                        return (
                                            <tr key={index} class="is-selected">
                                                <td>{item.survey_id}</td>
                                                <td>{item.survey_language}</td>

                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                    <footer class="card-footer">
                        <p class="card-footer-item">
                            <span>

                            </span>
                        </p>
                        <p class="card-footer-item">
                            <span>
                                <Link to='/'> <button class="button is-black">Assign Anothers</button></Link>
                            </span>
                        </p>
                    </footer>
                </div>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(AssignedResult);