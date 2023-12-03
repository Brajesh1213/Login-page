// import React from 'react'
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"; // Corrected import statement
import { app } from "./firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formdata, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload();
    }
  }, [image]);

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
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
          src={currentUser.profilePicture}
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
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          id="email"
          placeholder="Email"
          className="uppercase bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="uppercase bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-600 cursor-pointer">Delete account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
