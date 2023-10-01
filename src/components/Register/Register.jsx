import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkbox = e.target.checkbox.checked;
    console.log(email, password, checkbox);

    // reset error
    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should have at least one upper case character."
      );
      return;
    } else if (!checkbox) {
      setRegisterError("Please accept you terms and conditions!");
      return;
    }

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User created successfully");
      })
      .catch((err) => {
        setRegisterError(err.message);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="w-1/2 mx-auto">
        <h2 className="text-center mb-5">Please Register</h2>
        <form
          onSubmit={handleFormSubmit}
          className="bg-gray-300 px-6 py-10 rounded-lg"
        >
          <input
            className="px-4 py-2 rounded-lg w-full"
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <br />
          <br />
          <div className="relative">
            <input
              className="px-4 py-2 rounded-lg w-full"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
            />
            <span
              onMouseDown={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-[50%] -translate-y-[50%] cursor-pointer"
            >
              {showPassword ? <BiSolidHide /> : <BiSolidShow />}
            </span>
          </div>
          <div className="py-4">
            <input
              className="mr-2 cursor-pointer"
              type="checkbox"
              name="checkbox"
              id="terms"
            />
            <label htmlFor="terms">Accept our Terms and Conditions</label>
          </div>
          <input className="btn w-full" type="submit" value="Register" />
          <p className="mt-5">
            Already have an account? Please{" "}
            <Link className="text-blue-800 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </form>
        {registerError && <p className="text-red-600">{registerError}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
