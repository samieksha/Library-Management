import { useState } from 'react';
import './LoginSignup.css';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { getUsers, saveUsers } from '../../api/userService';
import { Modal } from '../UI/Modal';
import { useNavigate } from 'react-router-dom';

export const ChangePassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    
    const handleUpdate = () => {
        
        const users = getUsers();
        if (users.some(u=> u.email === email))
            {
              if(password1===password2){
                const userIndex = users.findIndex(u => u.email === email);
                users[userIndex].password = password1;
                saveUsers(users);
                setModalMessage('Password updated! LogIn.');
                setShowModal(true);
              }
              else{
                setModalMessage('Passwords do not match!');
                setShowModal(true);
              }
            }
        else{
            setModalMessage('Not an existing user!');
            setShowModal(true);
        }
        setEmail('');
        setPassword1('');
        setPassword2('');
        
    };
    
    return (
        <div className='container-auth'>
            <div className='header'>
                <div className='text'>Enter New Password</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
            <div className='input'>
                    <MdEmail className='icon' />
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        required
                        autoComplete="off"
                        placeholder='Email Id'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <RiLockPasswordFill className='icon' />
                    <input 
                        type="password"
                        name="Enter password"
                        id="Enter password"
                        required
                        autoComplete="off"
                        placeholder='Enter New Password'
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <RiLockPasswordFill className='icon' />
                    <input 
                    type="password"
                    name="Re-enter password"
                    id="Re-enter password"
                    required
                    autoComplete="off"
                    placeholder='Re-enter New Password' 
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    />
                </div>
                    <div className='submit-container'>
                        <div className="submit" onClick={handleUpdate}>Update</div>
                    </div>
            </div>
            {showModal && (
                <Modal 
                message={modalMessage} 
                onModalSubmit={() => {
                    setShowModal(false);
                    if (modalMessage.includes("updated")) {
                      navigate("/LoginSignup");
                    }
                  }} />
            )}    
        </div>
    );
};
