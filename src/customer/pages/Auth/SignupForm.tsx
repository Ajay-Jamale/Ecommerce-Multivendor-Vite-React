import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { sendLoginSignupOtp, signup } from '../../../Redux Toolkit/Customer/AuthSlice';
import OTPInput from '../../components/OtpFild/OTPInput';
import './Auth.css';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
});

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);
  
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
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

  const handleSignUp = () => {
    if (otp.length === 6) {
      dispatch(
        signup({
          fullName: formik.values.fullName,
          email: formik.values.email,
          phoneNumber: formik.values.phoneNumber,
          otp,
          navigate,
        })
      );
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
        <label className="auth-label-horizontal">Full Name</label>
        <div className="auth-input-wrapper-horizontal">
          <input
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your full name"
            className={`auth-input-horizontal ${
              formik.touched.fullName && formik.errors.fullName ? 'error' : ''
            }`}
            disabled={auth.otpSent}
          />
          {formik.values.fullName && !formik.errors.fullName && (
            <span className="auth-input-valid-horizontal">✓</span>
          )}
        </div>
        {formik.touched.fullName && formik.errors.fullName && (
          <p className="auth-error-horizontal">{formik.errors.fullName}</p>
        )}
      </div>

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

      <div className="auth-form-group-horizontal">
        <label className="auth-label-horizontal">Phone Number</label>
        <div className="auth-input-wrapper-horizontal">
          <input
            type="tel"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter 10-digit mobile number"
            maxLength={10}
            className={`auth-input-horizontal ${
              formik.touched.phoneNumber && formik.errors.phoneNumber ? 'error' : ''
            }`}
            disabled={auth.otpSent}
          />
          {formik.values.phoneNumber && !formik.errors.phoneNumber && (
            <span className="auth-input-valid-horizontal">✓</span>
          )}
        </div>
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <p className="auth-error-horizontal">{formik.errors.phoneNumber}</p>
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
            onClick={handleSignUp}
            disabled={auth.loading || otp.length !== 6}
            className="auth-button-horizontal auth-button-primary-horizontal"
          >
            {auth.loading ? (
              <span className="auth-loading-container-horizontal">
                <span className="auth-loading-horizontal"></span>
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </div>
      )}

      {!auth.otpSent && (
        <>
          <button
            onClick={handleSendOtp}
            disabled={
              auth.loading ||
              !formik.isValid ||
              !formik.values.fullName ||
              !formik.values.email ||
              !formik.values.phoneNumber
            }
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
          <p className="auth-footer-horizontal">
            By signing up, you agree to our{' '}
            <a href="/terms">Terms</a> and{' '}
            <a href="/privacy">Privacy Policy</a>
          </p>
        </>
      )}
    </div>
  );
};

export default SignupForm;