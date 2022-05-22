import React from 'react';
import {useSignInWithGithub, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useLocation, useNavigate} from 'react-router-dom';
import auth from "../../firebase.init";
import {FaGoogle} from "@react-icons/all-files/fa/FaGoogle";
import {FaGithub} from "@react-icons/all-files/fa/FaGithub";
import Loading from "../Common/Loading";

const SocialLogin = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    const location = useLocation();

    let socialError, errorMessage;
    if (googleError || githubError) {
        switch (googleError?.code || githubError?.code) {
            case 'auth/account-exists-with-different-credential':
                errorMessage = 'You have already signed up with a different provider';
                break;
            case 'auth/popup-blocked':
                errorMessage = 'Please enable popups for this website';
                break;
            case 'auth/popup-closed-by-user':
                errorMessage = 'The popup was closed by the user before finalizing the sign in';
                break;
            default:
                errorMessage = googleError?.message || githubError?.message;
        }
        socialError = <small className='text-danger'>{errorMessage}</small>
    }

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
            {socialError}
        </div>
    );
};

export default SocialLogin;