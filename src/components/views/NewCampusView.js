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

const NewCampusView = (props) => {
  const { handleChange, handleSubmit } = props;
  const classes = useStyles();
  const history = useHistory();

  // State to track form validation errors
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    campusImage: '',
  });

  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (e) => {
    if (e) {
      e.preventDefault(); // Ensure that the event is defined before calling preventDefault
    }

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // No errors, proceed with form submission
      await handleSubmit({ ...formData, imageUrl: formData.campusImage }); // Ensure formData is passed to handleSubmit
      // Redirect to the AllCampusesView after form submission
      history.push('/campuses');
    } else {
      // Update state to display errors
      setErrors(formErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate campus name
    if (!formData.name.trim()) {
      newErrors.name = 'Campus name is required';
    }

    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Add more validation rules as needed

    return newErrors;
  };

  const handleChangeLocal = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>New Campus</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{ fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e' }}>
              Add a Campus
            </Typography>
          </div>
          <form style={{ textAlign: 'center' }} onSubmit={handleFormSubmit}>
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Campus Name: </label>
            <input type="text" name="name" onChange={(e) => handleChangeLocal(e)} />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Address: </label>
            <input type="text" name="address" onChange={(e) => handleChangeLocal(e)} />
            {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Campus Description: </label>
            <input type="text" name="description" onChange={(e) => handleChangeLocal(e)} />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Campus Image: </label>
            <input type="text" name="campusImage" onChange={(e) => handleChangeLocal(e)} />
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

export default NewCampusView;