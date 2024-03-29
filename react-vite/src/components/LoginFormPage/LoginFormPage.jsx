import { useEffect, useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        credential,
        password,
      })
      );

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        navigate("/");
      }
    };

  useEffect(() => {
      const err = {};
      if (credential.length < 4) err.credential = 'It must be 4 or more characters';
      if (password.length < 6) err.password = 'Password must be 6 or more characters';
      setErrors(err);

  }, [credential, password])

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const DemoUserLogin1 = () => {
    setCredential("roberty@downton.com");
    setPassword("RobertCrawley");
    setErrors({});
  }

  const DemoUserLogin2 = () => {
    setCredential("matthew@lawyer.org");
    setPassword("MatthewCrawley");
    setErrors({});
  }

  return (
    <>
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit}>
        <label>
          Email or username <p>{errors.credential &&
          (<><FaCircleExclamation color="#f15e6c" />
            {" " + errors.credential} </>)}</p>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>

        <label>
          Password <p>{errors.password && (<>{errors.password}</>)}</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Log In</button>
        <button className="Demouser-login" onClick={DemoUserLogin1} type="submit">
          Log in as Robert Crawley
        </button>
        <button className="Demouser-login" onClick={DemoUserLogin2} type="submit">
          Log in as Matthew Crawley
        </button>
      </form>
    </>
  );
}

export default LoginFormPage;
