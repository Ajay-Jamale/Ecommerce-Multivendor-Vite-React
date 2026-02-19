import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OTPInput from '../../components/OtpFild/OTPInput';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { sendLoginSignupOtp, signin } from '../../../Redux Toolkit/Customer/AuthSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState<number>(30);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);

  const formik = useFormik({
    initialValues: { email: '', otp: '' },
    onSubmit: (values: any) => {
      dispatch(signin({ email: values.email, otp, navigate }));
    },
  });

  const handleOtpChange = (otp: any) => setOtp(otp);
  const handleResendOTP = () => {
    dispatch(sendLoginSignupOtp({ email: 'signing_' + formik.values.email }));
    setTimer(30);
    setIsTimerActive(true);
  };
  const handleSentOtp = () => handleResendOTP();
  const handleLogin = () => formik.handleSubmit();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  return (
    <div className="flex flex-col gap-5 w-full">
      <TextField
        fullWidth
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email ? (formik.errors.email as string) : undefined}
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
      />

      {auth.otpSent && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-600">* Enter OTP sent to your email</p>
          <OTPInput length={6} onChange={handleOtpChange} error={false} />
          <p className="text-xs text-gray-500">
            {isTimerActive ? (
              <>Resend OTP in {timer} seconds</>
            ) : (
              <>
                Didn’t receive OTP?{' '}
                <span
                  onClick={handleResendOTP}
                  className="text-indigo-600 cursor-pointer hover:text-indigo-800 font-semibold"
                >
                  Resend OTP
                </span>
              </>
            )}
          </p>
        </div>
      )}

      <Button
        fullWidth
        variant="contained"
        onClick={auth.otpSent ? handleLogin : handleSentOtp}
        disabled={auth.loading}
        sx={{
          py: '11px',
          borderRadius: 0,
          backgroundColor: '#4F46E5',
          '&:hover': { backgroundColor: '#4338CA' },
        }}
      >
        {auth.loading ? <CircularProgress size={24} color="inherit" /> : auth.otpSent ? 'Login' : 'Send OTP'}
      </Button>
    </div>
  );
};

export default LoginForm;
