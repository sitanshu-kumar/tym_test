import React from 'react';
import { connect } from "react-redux";

class EmployeeList extends React.Component {
    state = {
        employeeSelected: ''
    }
    componentDidMount = async () => {

        await fetch("http://localhost:8000/emp_data").then((res) => {
            res.json().then((data) => {

                this.props.dispatch({
                    type: "add_employee",
                    payload: data.empData,
                });

            });
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log()
        this.props.dispatch({
            type: "selected_emp",
            payload: e.target.value,
        });
    }

    render() {

        return (
            <>
                <div class="field">
                    <label class="label">Employee List</label>
                    <p class="control">
                        <span class="select">
                            <select name="employeeSelected"
                                value={this.state.employeeSelected}
                                onChange={this.handleChange}>
                                {this.props.empData &&
                                    this.props.empData.map((item, index) => {

                                        return (
                                            <option key={index}>{item.Emp_name}</option>
                                        );
                                    })}
                            </select>
                        </span>
                    </p>
                </div>

            </>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        empData: state.app.employeeList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
