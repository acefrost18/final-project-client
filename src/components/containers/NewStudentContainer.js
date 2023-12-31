import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      GPA: '',
      email: '',
      imageUrl: '',
      redirect: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (formData) => {
    // Dispatch your addCampusThunk action here
    await this.props.addStudentThunk(formData);
  }

  componentWillUnmount() {
    this.setState({ redirect: false });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/students" />;
    }

    return (
      <div>
        <Header />
        <NewStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addStudentThunk: (campus) => dispatch(addStudentThunk(campus)),
  };
};

export default connect(null, mapDispatch)(NewStudentContainer);