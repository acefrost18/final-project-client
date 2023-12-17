import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import EditStudentView from '../views/EditStudentView';
import { editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      firstname: '',
      lastname: '',
      email: '',
      GPA: '',
      campusId: '',
      imageUrl: '',
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
  handleSubmit = async () => {
    console.log('Handling form submission');
    const { studentId, ...formData } = this.state;
    console.log('Form Data:', formData); 
  
    try {
      // Pass the student ID along with the form data
      await this.props.editStudentThunk({
        id: studentId,
        ...formData,
      });
      // Set state to trigger redirect or any other actions
      this.setState({ redirect: true });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.studentId}`} />;
    }

    return (
      <div>
        <Header />
        {/* Pass necessary props to the EditStudentView */}
        <EditStudentView
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
  student: state.student, // Adjust this based on your Redux state structure
});

// Map the dispatch to props
const mapDispatch = (dispatch) => ({
  editStudentThunk: (student) => dispatch(editStudentThunk(student)),
});

export default connect(mapStateToProps, mapDispatch)(EditStudentContainer);