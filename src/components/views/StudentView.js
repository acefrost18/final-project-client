import React from 'react';
import { Link } from 'react-router-dom';

const StudentView = (props) => {
  const { student } = props;

  // Check if the imageUrl is a valid URL
  const isImageUrlValid = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Render a single Student view
  return (
    <div>
      <h1>{student.firstname + ' ' + student.lastname}</h1>

      {student.campus ? (
        <>
          <h3>Enrolled at: {student.campus.name}</h3>
          {/* Add more details about the student, e.g., email, image, GPA, etc. */}
          <p>Email: {student.email}</p>

          {isImageUrlValid(student.imageUrl) ? (
            <img src={student.imageUrl} alt={`${student.firstname} ${student.lastname}`} style={{ maxWidth: '100%' }} />
          ) : (
            <p>Image is unavailable</p>
          )}

          <p>GPA: {student.GPA}</p>

          {/* Navigation links */}
          <Link to={`/campus/${student.campus.id}`}>
            <button>View Campus</button>
          </Link>
          <Link to={`/student/edit/${student.campus.id}`}>
            <button>Edit Student</button>
          </Link>
        </>
      ) : (
        <p>This student is not enrolled at any campus.</p>
      )}
    </div>
  );
};
export default StudentView;