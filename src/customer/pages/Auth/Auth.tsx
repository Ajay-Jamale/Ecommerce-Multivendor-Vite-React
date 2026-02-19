import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Alert, Button, Snackbar } from '@mui/material';
import { useAppSelector } from '../../../Redux Toolkit/Store';

const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { auth } = useAppSelector((store) => store);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  useEffect(() => {
    if (auth.otpSent || auth.error) {
      setSnackbarOpen(true);
    }
  }, [auth.otpSent, auth.error]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-50 px-4">
      <div className="w-full max-w-md bg-white p-8 flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">
            {isLoginPage ? 'Sign In' : 'Sign Up'}
          </h1>
          <p className="text-indigo-500 text-sm">
            {isLoginPage
              ? 'Welcome back! Please login to your account.'
              : 'Create your account to get started.'}
          </p>
        </div>

        {/* Forms */}
        <div>{isLoginPage ? <LoginForm /> : <SignupForm />}</div>

        {/* Toggle Section */}
        <div className="flex justify-center items-center gap-2 text-sm text-indigo-600 mt-4">
          <span>{isLoginPage ? "Don't have an account?" : 'Already have an account?'}</span>
          <Button
            onClick={() => setIsLoginPage(!isLoginPage)}
            size="small"
            variant="contained"
            sx={{
              textTransform: 'none',
              backgroundColor: '#4F46E5',
              '&:hover': { backgroundColor: '#4338CA' },
              fontWeight: 600,
              borderRadius: 0,
              py: 0.5,
              px: 2,
            }}
          >
            {isLoginPage ? 'Sign Up' : 'Login'}
          </Button>
        </div>
      </div>

      {/* Snackbar Notifications */}
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
          sx={{ width: '100%' }}
        >
          {auth.error ? auth.error : 'OTP sent to your email!'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Auth;
