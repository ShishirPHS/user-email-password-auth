import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");

  const emailRef = useRef(null);

  const handleLogIn = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);

    // reset error
    setRegisterError("");
    setSuccess("");

    // create user
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);

        if (result.user.emailVerified) {
          setSuccess("User logged in successfully");
        } else {
          alert("Please verify our email address.");
        }
      })
      .catch((err) => {
        console.log(err);
        setRegisterError(err.message);
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide an email.");
      console.log("Please provide an email", email);
      return;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      alert("Please provide a valid email.");
      console.log("send valid email");
      return;
    }

    // send validation error
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-center text-3xl py-4">Please login</h2>
      <div className="w-1/2 mx-auto">
        <div className="shadow-2xl bg-base-100 rounded-3xl">
          <div className="card-body">
            <form onSubmit={handleLogIn}>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a
                    onClick={handleForgotPassword}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
              <p className="mt-2">
                New to this website? Please{" "}
                <Link className="text-blue-600 hover:underline" to="/register">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="mt-5">
          {registerError && <p className="text-red-600">{registerError}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
