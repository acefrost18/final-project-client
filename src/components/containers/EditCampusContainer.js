import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import EditCampusView from '../views/EditCampusView';
import { editCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        address: '',
        description: '',
        campusImage: '',
        redirect: false,
    };
  }

  // Handle changes in input fields
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
 

  // Handle form submission
  handleSubmit = async (event) => {
    

    // Dispatch the thunk action
    await this.props.editCampus(updatedCampus);
    const updatedCampus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        campusImage: this.state.campusImage,
      };

    // Log the Redux state after dispatch
    console.log('Redux State:', this.props.student); // Adjust this based on your Redux state structure

    // Set state to trigger redirect or any other actions
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.campusId}`} />;
    }

    return (
      <div>
        <Header />
        {}
        <EditCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          // Include other props as needed
        />
      </div>
    );
  }
}

// Map the Redux state to props
const mapStateToProps = (state) => ({
  campus: state.campus, // Adjust this based on your Redux state structure
});

// Map the dispatch to props
const mapDispatch = (dispatch) => ({
  editCampus: (campus) => dispatch(editCampusThunk(campus)),
});

export default connect(mapStateToProps, mapDispatch)(EditCampusContainer);