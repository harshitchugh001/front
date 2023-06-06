import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const AddCourses = ({ Course, setCourse }) => {

  useEffect(() => {
    document.title = "Add Courses";
  }, []);
  const [Course1, setCourse1] = useState({ title: "", description: "" });



  const handleForm = (e) => {
    e.preventDefault();
    console.log(Course);
    setCourse(Course => [...Course, Course1])
    postDataToServer(Course1);
    setCourse1({ title: "", description: "" });
    // console.log(Course);
  }

  const postDataToServer = (data) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/courses`,
      data: data,
    })
   .then(
      (response) => {
        console.log(response);
        toast.success("Course added sucessfully");
      },
      (error) => {
        toast.error(error.response.data);
      }
    )
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setCourse1({ ...Course1, [e.target.name]: value });
  }

  return <>
    <ToastContainer />
    <div className="maincon">
      <div className="box1">
        <h4 className="">AddCourses</h4>

        <form onSubmit={handleForm}>

          <div className="">
            <label for="title" className="form-label">Enter Subject Title:</label>
            <input type="text" className="form-control" id="title" name="title" value={Course1.title} onChange={(e) => handleChange(e)} aria-describedby="name" />
          </div>

          <div class="">
            <label for="desc" class="form-label">Enter Subject Description</label>
            <textarea class="form-control" id="desc" rows="3" name="description" value={Course1.description} onChange={(e) => handleChange(e)}></textarea>
          </div>

          <button type="submit" className="btn btn-primary mt-2" style={{ backgroundColor: "#4E6C50" }}>Submit</button>
          <button type="button" className="btn btn-primary ms-5 mt-2" onClick={() => { setCourse1({ id: "", title: "", description: "" }) }} style={{ backgroundColor: "#4E6C50" }}>Clear</button>
        </form>

      </div> </div>
  </>;
}

export default AddCourses;