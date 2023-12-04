// import React from 'react'
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"; // Corrected import statement
import {  useNavigate } from 'react-router-dom'
import { app } from "./firebase";
import{ useDispatch } from 'react-redux';
import {updateUserFailure,updateUserSuccess,updateUserStart, deleteUserFailure, deleteUserStart,deleteUserSuccess, signOut} from './redux/user/userSlice.js'

const Profile = () => {
  const { currentUser ,loading,error} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formdata, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    if (image) {
      handleFileUpload();
    }
  }, [image]);


  //handle delete
const handleDeleteAccount = async () =>{
  try{
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method:"DELETE",
    });
    const data = await res.json();

    if(data.success===false){
      dispatch(deleteUserFailure(data))
      return;
    }
  dispatch(deleteUserSuccess());
  navigate('/sign-in')
  
  }

  catch(error){
    dispatch(deleteUserFailure(error))
  }

}
  const handleFileUpload = () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' +Math.floor(progress) + '% done');
        setImagePercent(Math.floor(progress));
      },
      (error) => {

        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formdata, profilePicture: downloadUrl });
        });
      }
    );
  };
  // console.log(formdata)
  const handlechange = (e)=>{
    setFormData({...formdata , [e.target.id]:e.target.value});

  }

  const  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      // Corrected content-type spelling and added await for the fetch request
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json', // Corrected spelling
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  //signout
  const handleSignout = async () =>{
    try{
      
    await fetch('/app/auth/signout');
    
    dispatch(signOut());
    }
    catch(error){
      console.log(error);
    }

  }


  // console.log(formdata)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <img
          src={formdata.profilePicture || currentUser.profilePicture}
          alt="profile"
          onClick={() => fileRef.current.click()}
          className="h-24 mt-2 w-24 self-center cursor-pointer rounded-full object-cover"
        />
        <p className="text-sm  self-center">
          {imageError ? (
            <span className="text-red-700">Error Uploading image (file size must be less than 3MB)</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-green-700">{`Uploading image... ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className=" text-green-700">Image uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>

        {/* <div>{imagePercent}</div> */}
        <input
          type="text"
          defaultValue={currentUser.username}
          id="username"
          placeholder="Username"
          className="uppercase bg-slate-100 rounded-lg p-3"
          onChange={handlechange}
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          id="email"
          placeholder="Email"
          className="uppercase bg-slate-100 rounded-lg p-3"
          onChange={handlechange}        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="uppercase bg-slate-100 rounded-lg p-3"
          onChange={handlechange}        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
          {loading? 'Loading....':'Update User'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-600 cursor-pointer" onClick={handleDeleteAccount}>Delete account</span>
        <span className="text-red-600 cursor-pointer" onClick={handleSignout}> Sign Out</span>
      </div>
      <p className=" text-red-700 mt-5 ">{error && "Somthing Went Wrong !"}</p>
      <p className=" text-green-700 mt-5  self-center">{updateSuccess && "User is Updated Successfully !"}</p>
    </div>
  );
};

export default Profile;
