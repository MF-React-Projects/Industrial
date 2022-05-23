import React, {useEffect, useState} from 'react';
import {useSignInWithGithub, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useLocation, useNavigate} from 'react-router-dom';
import auth from "../../firebase.init";
import {FaGoogle} from "@react-icons/all-files/fa/FaGoogle";
import {FaGithub} from "@react-icons/all-files/fa/FaGithub";
import Loading from "../Common/Loading";

const SocialLogin = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() =>{
        if (googleError || githubError) {
            switch (googleError?.code || githubError?.code) {
                case 'auth/account-exists-with-different-credential':
                    setError('You have already signed up with a different provider');
                    break;
                case 'auth/popup-blocked':
                    setError('Please enable popups for this website');
                    break;
                case 'auth/popup-closed-by-user':
                    setError('The popup was closed by the user before finalizing the sign in');
                    break;
                default:
                    setError(googleError?.message || githubError?.message);
            }
        }
    }, [googleError, githubError])

    //redirect user to previous page
    let from = location.state?.from?.pathname || "/";

    if (googleUser || githubUser) {
        navigate(from, {replace: true});
    }

    if (googleLoading || githubLoading) {
        return <Loading/>
    }

    return (
        <div className="social-login">
            <h4>Or</h4>
            <ul className='list-unstyled d-flex p-0 m-0'>
                <li>
                    <button onClick={() => signInWithGoogle()} className='social-google'>
                        <FaGoogle/>
                        <span className='px-2'>Google Sign In</span>
                    </button>
                </li>
                <li>
                    <button onClick={() => signInWithGithub()} className='social-github'>
                        <FaGithub/>
                        <span className='px-2'>Github Sign In</span>
                    </button>
                </li>
            </ul>
            <small className='text-danger'>{error}</small>
        </div>
    );
};

export default SocialLogin;