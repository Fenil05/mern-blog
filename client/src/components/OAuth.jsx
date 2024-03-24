import React from 'react'
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import {app} from "../firebase.js"
import newRequest from '../utils/newRequest.js';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = getAuth(app)

    const handleGoogleClick = async()=>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:"select_account"})
        try {
            const resultsFromGoogle = await signInWithPopup(auth,provider)
            const res = await newRequest.post("auth/google",{
                name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email,
                googlePhotoUrl:resultsFromGoogle.user.photoURL
            })
            dispatch(signInSuccess(res.data))
            navigate("/")

        } catch (err) {
            dispatch(signInFailure(err.response.data.message))
        }
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}

export default OAuth