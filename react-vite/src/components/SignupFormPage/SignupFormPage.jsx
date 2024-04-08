import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import { createPortfolioThunk } from "../../redux/portfolio";
import { createPortfolioJSONThunk } from "../../redux/portfolio";

import './SignupForm.css'
import { FaCircleExclamation } from "react-icons/fa6";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (Object.values(errors).length) {
      return null;
    }

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password must be the same as the Password",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        first_name,
        last_name,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      let portfolio = {title: "Investing", is_retirement: false};
      dispatch(createPortfolioThunk(portfolio))
      .then(async(res) => {return await dispatch(createPortfolioJSONThunk(res))})
      .then(() => alert(`As a new user, an regular investing account is automatically created for you with 0 balance. You need to transfer money into your new account to start invest.
        You can still create a retirement plan account, and later delete it. `))
      .then(navigate("/"))
      .catch((e)=>{
        console.log(e);
        setErrors(e)
      })
    }
  };

  useEffect(() => {
    const err = {};
    setHasSubmitted(false);
    if (email.length === 0) err.email = 'Email is required';
    if (username.length < 4) err.username = 'It must be 4 or more characters';
    if (first_name.length === 0) err.first_name = 'First name is required';
    if (last_name.length === 0) err.last_name = 'Last name is required';
    if (password.length < 6) err.password = "Password must be 6 or more characters";
    if (confirmPassword.length < 6) err.confirmPassword = "Confirmed password must be 6 or more characters"
    setErrors(err);
  }, [email, username, first_name, last_name, password, confirmPassword])

  if (sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <div className='signup-container'>
      <h1>Sign Up</h1>
      {hasSubmitted && errors.server && <p>{errors.server}</p>}
      <form className='signup-form-container' onSubmit={handleSubmit}>
        <label>
          Email
        </label>
        <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
        />
        {hasSubmitted && errors.email && <p><FaCircleExclamation color="#f15e6c" />{" " + errors.email}</p>}

        <label>
          Username
        </label>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username (min: 4 characters)"
            required
        />
        {hasSubmitted && errors.username && <p><FaCircleExclamation color="#f15e6c" />{" " + errors.username}</p>}

        <label>
          First name
        </label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirst_Name(e.target.value)}
          placeholder="First name"
          required
        />
        {hasSubmitted && errors.first_name && <p><FaCircleExclamation color="#f15e6c" />{" " + errors.first_name}</p>}

        <label>
          Last name
        </label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLast_Name(e.target.value)}
          placeholder="Last name"
          required
        />
        {hasSubmitted && errors.last_name && <p><FaCircleExclamation color="#f15e6c" />{" " + errors.last_name}</p>}

        <label>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min: 6 characters)"
          required
        />
        {hasSubmitted && errors.password && <p><FaCircleExclamation color="#f15e6c" />{" " + errors.password}</p>}

        <label>
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmed password (min: 6 characters)"
          required
        />
        {hasSubmitted && errors.confirmPassword && <p><FaCircleExclamation color="#f15e6c" />{" " + errors.confirmPassword}</p>}

        <button className="signup-form-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
