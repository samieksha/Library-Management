import { useState } from 'react';
import './LoginSignup.css';
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';

export const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = () => {
        if (action === "Sign Up") {
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userPassword", password);
          setAction("Login");
        } 
        else 
        {
          const storedEmail = localStorage.getItem("userEmail");
          const storedPassword = localStorage.getItem("userPassword");
      
          if (email === storedEmail && password === storedPassword) {
            alert("Login successful!");
            
            navigate('/UserProfile');
          } else {
            alert("Invalid email or password");
          }
        }
        setEmail('');
        setPassword('');
      };

    return (
        <div className='container-auth'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <MdEmail className='icon' />
                    <input 
                        placeholder='Email Id' 
                        type='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <RiLockPasswordFill className='icon' />
                    <input 
                        placeholder='Password' 
                        type='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {action === "Login" && ( <div className="forgot-password"> Forgot Password?{" "} <span> <NavLink to="ChangePassword">Click Here.</NavLink></span></div>)}
                <div className='submit-container'>
                  <div className='submit' onClick={handleSubmit}>
                    {action}
                  </div>
                <div className='toggle-action' onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}>
                    {action === "Login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </div>
              </div>
            </div>
      </div>
    );
};
