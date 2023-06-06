import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Layout from '../core/Layout';
import axios from 'axios';
import { useJwt } from 'react-jwt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Activate = () => {
  const { token } = useParams();
  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true,
  });

  const { name, show } = values;

  const { decodedToken } = useJwt(token);
  const decodedName = decodedToken?.name;

  useEffect(() => {
    if (token) {
      setValues({ ...values, name: decodedName, token });
    }
  }, [token, decodedName, values]);

  const clickSubmit = async (event) => {
    event.preventDefault();

    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log('ACCOUNT ACTIVATION', response);
        setValues({ ...values, show: false });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <div className="text-center">
      <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );

  return (
    
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {activationLink()}
      </div>
  
  );
};

export default Activate;
