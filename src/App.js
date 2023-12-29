import React, { useState } from 'react';
import './App.css'

const FormWithValidation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // name validation
    if (!formData.name.match(/^[A-Za-z]+$/)) {
      newErrors.name = 'Name should contain only alphabets';
      isValid = false;
    } else if (formData.name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailPattern)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    } else if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    // password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!formData.password.match(passwordPattern)) {
      newErrors.password =
        'Password should contain at least 8 characters, one uppercase letter, one lowercase letter, and one number';
      isValid = false;
    } else if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setSubmitted(true);
      console.log('Form data:', formData);
    }
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h2>Form submitted successfully!</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default FormWithValidation;
