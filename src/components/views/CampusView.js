import React from 'react';
import { Link } from 'react-router-dom';

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus } = props;

  // Render a single Campus view with a list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      {campus.students.length > 0 ? (
        <div>
          <h2>Students:</h2>
          {campus.students.map((student) => {
            let name = student.firstname + ' ' + student.lastname;
            return (
              <div key={student.id}>
                <Link to={`/student/${student.id}`}>
                  <h3>{name}</h3>
                </Link>
                <Link to={`/campus/edit/${campus.id}`}>
                  <button>Edit Campus</button>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No students associated with this campus.</p>
      )}

      {/* Add Student button linking to the new student page with the campus ID as a query parameter */}
      <Link to={`/new-student?campusId=${campus.id}`}>
        <button>Add Student</button>
      </Link>
    </div>
  );
};

export default CampusView;