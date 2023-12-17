import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (formData) => {
    // Dispatch your addCampusThunk action here
    await this.props.addCampusThunk(formData);
  }

  componentWillUnmount() {
    this.setState({ redirect: false });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/campuses" />;
    }

    return (
      <div>
        <Header />
        <NewCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addCampusThunk: (campus) => dispatch(addCampusThunk(campus)),
  };
};

export default connect(null, mapDispatch)(NewCampusContainer);