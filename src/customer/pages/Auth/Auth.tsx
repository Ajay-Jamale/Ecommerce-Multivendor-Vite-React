import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Alert, Snackbar } from '@mui/material';
import { useAppSelector } from '../../../Redux Toolkit/Store';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { auth } = useAppSelector((store) => store);
  const navigate = useNavigate();

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  useEffect(() => {
    if (auth.otpSent || auth.error) {
      setSnackbarOpen(true);
    }
  }, [auth.otpSent, auth.error]);

  return (
    <div className="auth-horizontal-container">
   
      {/* Right Side - Form */}
      <div className="auth-form-section-horizontal">
        <div className="auth-form-header">
          <h2>{isLoginPage ? 'Sign In' : 'Sign Up'}</h2>
          <p>
            {isLoginPage
              ? 'Enter your credentials to access your account'
              : 'Fill in your details to create an account'}
          </p>
        </div>

        {isLoginPage ? <LoginForm /> : <SignupForm />}

        <div className="auth-toggle-horizontal">
          <span>
            {isLoginPage ? "Don't have an account?" : 'Already have an account?'}
          </span>
          <button
            onClick={() => setIsLoginPage(!isLoginPage)}
            className="auth-toggle-button-horizontal"
          >
            {isLoginPage ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={auth.error ? 'error' : 'success'}
          variant="filled"
          sx={{
            borderRadius: 0,
            border: '2px solid #000000',
            backgroundColor: auth.error ? '#dc2626' : '#000000',
            color: '#ffffff',
            fontWeight: 500,
            '& .MuiAlert-icon': {
              color: '#ffffff',
            },
          }}
        >
          {auth.error ? auth.error : 'OTP sent to your email!'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Auth;