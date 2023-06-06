import React,{ useState } from 'react'
import axios from 'axios';
import { Link, Navigate  } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuth } from './helpers';

export default function Signup() {
    const [values, setValues] = useState({
        name: 'harsh',
        email: 'harshitchugh3125@gmail.com',
        password: 'hhhhhh',
        buttonText: 'Submit'
    });

    const { name, email, password, buttonText } = values;

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: { name, email, password }
        })
            .then(response => {
                console.log('SIGNUP SUCCESS', response);
                setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('SIGNUP ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>

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
    <div className="col-md-6 offset-md-3">
        {isAuth() ? <Navigate to="/" /> : null}
        <h1 className="p-5 text-center">Signup</h1>
        <ToastContainer />
        {signupForm()}
       
    </div>
  )
}
