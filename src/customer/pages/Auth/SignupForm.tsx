import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OTPInput from '../../components/OtpFild/OTPInput';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { sendLoginSignupOtp, signup } from '../../../Redux Toolkit/Customer/AuthSlice';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState<number>(30);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '', // ✅ ADDED
      otp: '',
    },
    onSubmit: (values: any) => {
      dispatch(
        signup({
          fullName: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber, // ✅ SEND TO BACKEND
          otp,
          navigate,
        })
      );
    },
  });

  const handleOtpChange = (otp: string) => setOtp(otp);

  const handleResendOTP = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
    setTimer(30);
    setIsTimerActive(true);
  };

  const handleSentOtp = () => handleResendOTP();
  const handleSignup = () => formik.handleSubmit();

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

      {/* Full Name */}
      <TextField
        fullWidth
        name="name"
        label="Full Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
      />

      {/* Email */}
      <TextField
        fullWidth
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
      />

      {/* Phone Number ✅ */}
      <TextField
        fullWidth
        name="phoneNumber"
        label="Phone Number"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
      />

      {/* OTP Section */}
      {auth.otpSent && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-600">
            * Enter OTP sent to your email
          </p>

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

          <Button
            fullWidth
            variant="contained"
            onClick={handleSignup}
            disabled={auth.loading}
            sx={{
              py: '11px',
              borderRadius: 0,
              backgroundColor: '#4F46E5',
              '&:hover': { backgroundColor: '#4338CA' },
            }}
          >
            {auth.loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign Up'
            )}
          </Button>
        </div>
      )}

      {/* Send OTP */}
      {!auth.otpSent && (
        <Button
          fullWidth
          variant="contained"
          onClick={handleSentOtp}
          disabled={
            auth.loading ||
            !formik.values.email ||
            !formik.values.name ||
            !formik.values.phoneNumber // ✅ REQUIRED
          }
          sx={{
            py: '11px',
            borderRadius: 0,
            backgroundColor: '#4F46E5',
            '&:hover': { backgroundColor: '#4338CA' },
          }}
        >
          {auth.loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Send OTP'
          )}
        </Button>
      )}
    </div>
  );
};

export default SignupForm;
