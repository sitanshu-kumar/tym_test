import React from 'react';
import { connect } from "react-redux";

class AssignedSurvey extends React.Component {
    state = {
        searchTerm: '',
        resultLength: false
    }

    handleChange = (value) => {
        this.props.dispatch({
            type: "survey_delete",
            payload: value,
        });
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }


    render() {


        return (
            <>
                <div class="block">
                    <div class="notification is-danger">

                        <button class="delete" onClick={() => this.props.dispatch({
                            type: "assignedSurvey_filter_format"
                        })} ></button>

                        <div class="columns">
                            <div class="column">  <h4 class="title is-4">Assigned Survey</h4></div>
                            <div class="column"> <div class="field has-addons">
                                <p class="control">
                                    <input type="text" class="input" placeholder="Enter survey id or name..."
                                        name="searchTerm"
                                        value={this.state.searchTerm}
                                        onChange={this.handleInput} />
                                </p>
                                <p class="control">
                                    <button class="button is-black" onClick={() => this.props.dispatch({
                                        type: "assigned_survey_filter",
                                        payload: this.state.searchTerm,
                                    })}>Search</button>
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
                    {this.props.assignedSurvey.length > 0 && <table class="table">
                        <thead>
                            <tr>
                                <th>Survey Id</th>
                                <th>Language</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.assignedSurvey &&
                                this.props.assignedSurvey.map((item, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{item.survey_id}</td>
                                            <td>{item.survey_language}</td>
                                            <td> <button class="button is-black" onClick={() => { this.handleChange(item) }}> Delete  <i class="fa fa-trash"></i></button></td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>}
                    {this.props.assignedSurvey.length < 1 &&
                        <h3 class="title is-3">No Survey Assigned !!</h3>}
                </div>
            </>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        assignedSurvey: state.app.assignedSurvey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssignedSurvey);
