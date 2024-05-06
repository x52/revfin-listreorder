import React, { useState } from 'react';

import { loginUser, registerUser } from '../services/service';
import { MDBInput ,MDBIcon, MDBTypography,MDBTextArea,MDBCollapse, MDBBtn } from 'mdb-react-ui-kit';
import { Stack } from 'react-bootstrap';
// Import toastify css file

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '../../src/style.scss';
const LoginPage = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const [name, setName] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

 const showToastMessage = (message, type, ) => {
    toast[type](message);
};


  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form submission default behavior

    try {
     if(username.trim()==='' || username===undefined){
        showToastMessage('username not entered', 'warning');
      }
     else if(password.trim()===''|| password===undefined){
        showToastMessage('password not entered', 'warning');
      }
      else{
      const data = await loginUser(username, password);

      localStorage.setItem('token', data.token);
    
      showToastMessage('Login Success!', "success");
      
      history.push('/list');
      }
    } catch (error) {
      showToastMessage('Error Encountered during Login', "error");
      console.error('Login failed', error);
    }
  };

  const goToLogin = () => {
   setShowSignUp(!showSignUp);
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
   

    try {
      if(name.trim()==='' || name===undefined){
        showToastMessage('Name not entered', 'warning');
      }
      else if(username.trim()==='' || username===undefined){
        showToastMessage('username not entered', 'warning');
      }
     else if(password.trim()===''|| password===undefined){
        showToastMessage('password not entered', 'warning');
      }
      else{
        await registerUser(name, username, password);
        showToastMessage('Registeration Succesful!', "success");

      }
     
      //toast('User Registered');
    } catch (error) {
      //toast('Error signing up');
      showToastMessage('Error Encountered during registration', "error");
      console.error('Sign-up failed', error);
    }
  };

  return (
    <div className='login-container'>
       <MDBTypography tag='div' className='display-3 pb-3 mb-3 border-bottom'>
       &nbsp; &nbsp; Revfin. List Reorder
      </MDBTypography>
   
   <ToastContainer />
     
      {showSignUp ? (
        <div className='login-form'>
          <MDBTypography tag='div' className='display-3 pb-3 mb-3 border-bottom'>
       Signup
      </MDBTypography>
      <form onSubmit={handleSignUp}>
      <MDBInput label="Enter Name" id="form1" type="text"  placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
      <br />
      <MDBInput label="Enter Username" id="form1" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <br />
      <MDBInput label="Enter Password" id="form1" type="text"  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <br />
      <MDBBtn color='light' rippleColor='dark' type='submit'> Sign up </MDBBtn>

      <MDBBtn color='light' rippleColor='dark' onClick={goToLogin}> Back to Login</MDBBtn>
          
          </form>
         
        </div>
      ) : ( <div className='login-form'>
      <MDBTypography tag='div' className='display-3 pb-3 mb-3 border-bottom'>
       Login
      </MDBTypography>
      <form onSubmit={handleLogin}>
      <MDBInput label="Example label" id="form1" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <br />
      <MDBInput label="Example label" id="form1" type="text"  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <br />
      <Stack direction="horizontal" gap={2}>
      <MDBBtn color='light' rippleColor='dark' type='submit'>
      Login
      </MDBBtn>
      <MDBBtn color='light' rippleColor='dark'  onClick={() => setShowSignUp(!showSignUp)}>
      Sign Up
      </MDBBtn>
      </Stack>
       
      </form>
      </div>)}
    </div>
  );
};

export default LoginPage;
