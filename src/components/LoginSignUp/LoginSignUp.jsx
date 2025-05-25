import { useContext, useState } from 'react';
import './LoginSignup.css';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import { getUsers, saveUsers, setLoggedInUser } from '../../api/userService';
import { Modal } from '../UI/Modal';
import { UserContext } from '../../context/UserContext';

export const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [navigateAfterClose, setNavigateAfterClose] = useState(false);

  const navigate = useNavigate();
  const { setLoggedUser } = useContext(UserContext);

  const handleSubmit = () => {
    const users = getUsers();

    if (action === "Sign Up") {
      if (users.some(u => u.email === email)) {
        setModalMessage("User already exists!");
        setShowModal(true);
        setEmail('');
        setPassword('');
        return;
      } else {
        const newUser = { email, password, borrowedBooks: [] };
        saveUsers([...users, newUser]);
        setModalMessage("Registration successful! Now log in.");
        setAction("Login");
        setShowModal(true);
      }
    } else {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setLoggedInUser(user);
        setLoggedUser(user); 
        setModalMessage("Login successful!");
        setShowModal(true);
        setNavigateAfterClose(true);
      } else {
        setModalMessage("Invalid credentials");
        setShowModal(true);
      }
    }

    setEmail('');
    setPassword('');
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (navigateAfterClose) {
      setNavigateAfterClose(false);
      navigate('/UserProfile');
    }
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
            name="email"
            id="email"
            required
            autoComplete="off"
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
        {action === "Login" && (
          <div className="forgot-password">
            Forgot Password?{" "}
            <span><NavLink to="/LoginSignup/ChangePassword">Click Here.</NavLink></span>
          </div>
        )}
        <div className='submit-container'>
          <div className='submit' onClick={handleSubmit}>
            {action}
          </div>
          <div className='toggle-action' onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}>
            {action === "Login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal message={modalMessage} onModalSubmit={handleModalClose} />
      )}
    </div>
  );
};
