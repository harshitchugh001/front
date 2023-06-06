import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { authenticate, isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Signin() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: 'harshitchugh3125@gmail.com',
    password: 'hhhhhh',
    buttonText: 'Submit',
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log('SIGNIN SUCCESS', response);
        authenticate(response, () => {
          setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
          toast.success(`Hey ${response.data.user.name}, Welcome back!`);
          isAuth() && isAuth().role === 'admin' ? navigate('/contactlist') : navigate('/signin');
        });
      })
      .catch((error) => {
        console.log('SIGNIN ERROR', error.response.data);
        setValues({ ...values, buttonText: 'Submit' });
        toast.error(error.response.data.error);
      });
  };

  const signinForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
      </div>

      <div>
        <button className="btn btn-primary my-3" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <div>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {isAuth() ? navigate('/') : null}
        <h1 className="p-5 text-center">Signin</h1>

        {signinForm()}
        <br />
        <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
          Forgot Password
        </Link>
      </div>
    </div>
  );
}
