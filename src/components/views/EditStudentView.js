import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
  formContainer: {
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none',
  },
  customizeAppBar: {
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle: {
    backgroundColor: '#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px',
  },
}));

const EditStudentView = (props) => {
  const { handleChange, handleSubmit } = props;
  const classes = useStyles();
  const history = useHistory();

  // State to track form validation errors
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    imageUrl: '', // with a default value
    GPA: '',
  });

  const [errors, setErrors] = useState({});

  // Define the validateForm function
  const validateForm = () => {
    const newErrors = {};

    // Validate first name
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    }

    // Validate last name
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    }

    // Validate GPA
    const gpaValue = parseFloat(formData.GPA);
    if (formData.GPA.trim() === '' || isNaN(gpaValue) || gpaValue < 0.0 || gpaValue > 4.0) {
      newErrors.GPA = 'GPA must be a decimal between 0.0 and 4.0';
    }

    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    if (e) {
      e.preventDefault(); // Ensure that the event is defined before calling preventDefault
    }
    

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // No errors, proceed with form submission
      await handleSubmit(formData);
      // Redirect to the student's page after form submission
      history.push('/students'); // Update the route as needed
    } else {
      // Update state to display errors
      setErrors(formErrors);
    }
  };

  const handleChangeLocal = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to:`, value);
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value !== undefined ? value : '', // Handle undefined values
    }));
    console.log('Updated formData:', formData);
  };

  return (
    <div>
      <h1>Edit Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{ fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e' }}>
              Edit Current Student
            </Typography>
          </div>
          <form style={{ textAlign: 'center' }} onSubmit={handleFormSubmit}>
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>First Name: </label>
            <input type="text" name="firstname" onChange={(e) => handleChangeLocal(e)} />
            {errors.firstname && <p style={{ color: 'red' }}>{errors.firstname}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Last Name: </label>
            <input type="text" name="lastname" onChange={(e) => handleChangeLocal(e)} />
            {errors.lastname && <p style={{ color: 'red' }}>{errors.lastname}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Email: </label>
            <input type="text" name="email" onChange={(e) => handleChangeLocal(e)} />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>GPA: </label>
            <input type="text" name="GPA" onChange={(e) => handleChangeLocal(e)} />
            {errors.GPA && <p style={{ color: 'red' }}>{errors.GPA}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Image: </label>
            <input type="text" name="imageUrl" onChange={(e) => handleChangeLocal(e)} />
            {errors.imageUrl && <p style={{ color: 'red' }}>{errors.imageUrl}</p>}
            <br />
            <br />

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudentView;