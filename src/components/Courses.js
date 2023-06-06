import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Courses = (props) => {
  const navigate = useNavigate();

  const [data, setData] = useState({ title: props.subject, description: props.description });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const saveData = () => {
    const updateC = [...props.course];
    updateC[props.index] = data;
    props.setCourse(updateC);
    props.setId(null);
    update(props.id);
    toast.success("Course Updated successfully");
  };

  const update = (Id) => {
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/coursesupdate/${Id}`,
      data: data,
    })
    .then((response) => {
      console.log("update Successful");
      toast.success("update Successful");
    })
    .catch((error) => {
      // Handle the error as needed
      console.log(error)
      console.log("Error in deleting");
    });
  };

  const deleteCourse = (Id) => {
    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API}/courses/${Id}`,
    })
    .then((response) => {
      console.log(Id);
      console.log("Delete Successful");
      toast.success("Delete Successful");
    })
    .catch((error) => {
      console.log("Error in deleting");
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="container" style={{ backgroundColor: "#FAECD6" }}>
        {props.id !== props.Id &&
          <div className="element">
            <h5 className="">{props.subject}</h5>
            <p className="">{props.description}</p>
            <div className="button">
              <a href="#" className="btn btn-primary" onClick={() => { props.updateCourse(props.id) }} style={{ backgroundColor: "#4E6C50" }}>Update</a>
              <a href="#" className="btn btn-primary" onClick={() => { props.updateData(props.id); deleteCourse(props.id) }} style={{ backgroundColor: "#4E6C50" }}>Delete</a>
            </div>
          </div>
        }
        {props.id === props.Id &&
          <div className='editContent'>
            <input type="text" value={data.title} name="title" onChange={(e) => handleChange(e)} />
            <input type="text" value={data.description} name="description" onChange={(e) => handleChange(e)} />
            <a className='btn btn-primary' style={{ backgroundColor: "#4E6C50" }} onClick={saveData}>Save</a>
          </div>
        }
      </div>
    </>
  );
};

export default Courses;
