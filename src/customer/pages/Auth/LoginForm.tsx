import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { sendLoginSignupOtp, signin } from '../../../Redux Toolkit/Customer/AuthSlice';
import OTPInput from '../../components/OtpFild/OTPInput';
import './Auth.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);
  
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: () => {},
  });

  const handleOtpChange = (value: string) => setOtp(value);

  const handleSendOtp = async () => {
    if (formik.isValid && formik.values.email) {
      await dispatch(sendLoginSignupOtp({ email: formik.values.email }));
      setIsTimerActive(true);
      setTimer(30);
    }
  };

  const handleResendOtp = async () => {
    await dispatch(sendLoginSignupOtp({ email: formik.values.email }));
    setIsTimerActive(true);
    setTimer(30);
  };

  const handleSignIn = () => {
    if (otp.length === 6) {
      dispatch(signin({ email: formik.values.email, otp, navigate }));
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  return (
    <div className="auth-form-horizontal">
      <div className="auth-form-group-horizontal">
        <label className="auth-label-horizontal">Email Address</label>
        <div className="auth-input-wrapper-horizontal">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email address"
            className={`auth-input-horizontal ${
              formik.touched.email && formik.errors.email ? 'error' : ''
            }`}
            disabled={auth.otpSent}
          />
          {formik.values.email && !formik.errors.email && (
            <span className="auth-input-valid-horizontal">✓</span>
          )}
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="auth-error-horizontal">{formik.errors.email}</p>
        )}
      </div>

      {auth.otpSent && (
        <div className="auth-otp-section-horizontal">
          <div className="auth-otp-box-horizontal">
            <p className="auth-otp-title-horizontal">Verification Code</p>
            <p className="auth-otp-subtitle-horizontal">
              Enter the 6-digit code sent to <strong>{formik.values.email}</strong>
            </p>

            <div className="auth-otp-container-horizontal">
              <OTPInput length={6} onChange={handleOtpChange} error={false} />
            </div>

            <div className="auth-timer-container-horizontal">
              {isTimerActive ? (
                <p className="auth-timer-text-horizontal">
                  <span>⏱️</span>
                  Resend code in <span className="auth-timer-bold-horizontal">{timer}s</span>
                </p>
              ) : (
                <p className="auth-timer-text-horizontal">
                  <span>📧</span>
                  Didn't receive the code?{' '}
                  <button onClick={handleResendOtp} className="auth-resend-button-horizontal">
                    Resend
                  </button>
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleSignIn}
            disabled={auth.loading || otp.length !== 6}
            className="auth-button-horizontal auth-button-primary-horizontal"
          >
            {auth.loading ? (
              <span className="auth-loading-container-horizontal">
                <span className="auth-loading-horizontal"></span>
                Verifying...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </div>
      )}

      {!auth.otpSent && (
        <>
          <button
            onClick={handleSendOtp}
            disabled={auth.loading || !formik.values.email || !!formik.errors.email}
            className="auth-button-horizontal auth-button-primary-horizontal"
          >
            {auth.loading ? (
              <span className="auth-loading-container-horizontal">
                <span className="auth-loading-horizontal"></span>
                Sending code...
              </span>
            ) : (
              'Continue with Email'
            )}
          </button>

           
        </>
      )}
    </div>
  );
};

export default LoginForm;