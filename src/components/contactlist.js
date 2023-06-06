import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Courses from './Courses';
import AddCourses from './AddCourses';

export default function ContactList() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [course, setCourse] = useState([]);
  
  useEffect(() => {
    getAllCoursesFromServer();
  }, []);

  const getAllCoursesFromServer = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/allcourses`,
     
    })
    
      .then((response) => {
        console.log(response.data);
        setCourse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateData = (Id) => {
    const newCourse = course.filter((c) => c._id !== Id);
    setCourse(newCourse);
  };

  const updateCourse = (Id) => {
    setId(Id);
  };

  return (
    <div className="container">
      <div className="courses">
        <h4 className="con">Contact Details</h4>
        {course.length === 0 ? (
          <h4 style={{ backgroundColor: '#FAECD6' }}>No Courses Available</h4>
        ) : (
          course.map((item, index) => (
            <div className="items" key={index.toString()}>
              <Courses
                id={item._id}
                Id={id}
                setCourse={setCourse}
                setId={setId}
                course={course}
                index={index}
                updateData={updateData}
                subject={item.title}
                updateCourse={updateCourse}
                description={item.description}
              />
            </div>
          ))
        )}
      </div>
      <div className="addCourses">
        <AddCourses course={course} setCourse={setCourse} />
      </div>
    </div>
  );
}
