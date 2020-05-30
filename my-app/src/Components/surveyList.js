import React from 'react';
import { connect } from "react-redux";

class SurveyList extends React.Component {
    state = {
        searchTerm: ''
    }
    componentDidMount = async () => {
        await fetch("http://localhost:8000/survey_data").then((res) => {
            res.json().then((data) => {

                this.props.dispatch({
                    type: "add_survey",
                    payload: data.surveyData,
                });
            });
        });
    }

    handleChange = (value) => {
        this.props.dispatch({
            type: "survey_assign",
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
                    <div class="notification is-warning">

                        <button class="delete" onClick={() => this.props.dispatch({
                            type: "survey_filter_format"
                        })} ></button>

                        <div class="columns">
                            <div class="column">  <h4 class="title is-4">Survey List</h4></div>
                            <div class="column"> <div class="field has-addons">
                                <p class="control">
                                    <input type="text" class="input"
                                        placeholder="Enter survey id or name..."
                                        name="searchTerm"
                                        value={this.state.searchTerm}
                                        onChange={this.handleInput}
                                    />
                                </p>
                                <p class="control">
                                    <button class="button is-black" onClick={() => this.props.dispatch({
                                        type: "survey_filter",
                                        payload: this.state.searchTerm,
                                    })}>Search</button>
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Survey Id</th>
                                <th>Language</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.surveyData &&
                                this.props.surveyData.map((item, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{item.survey_id}</td>
                                            <td>{item.survey_language}</td>
                                            <td> <button class="button is-black" onClick={() => { this.handleChange(item) }}>Add</button></td>
                                        </tr>
                                    );
                                })}

                        </tbody>
                    </table>
                </div>
            </>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        surveyData: state.app.surveyList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);
