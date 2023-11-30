// import React from 'react'

import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <div>
      <h1  className=" text-3xl text-center font-semibold my-7">Sign-up</h1>
      <form className="flex flex-col gap-4 pd-3
       m-2" >
        <input type="text" className=" bg-slate-100 p-3 rounded-lg" placeholder="Username" required id="username" />
        <input type="email" className=" bg-slate-100 p-3 rounded-lg" placeholder="Email" required id="email" />
        <input type="password" className=" bg-slate-100 p-3 rounded-lg" placeholder="Password" required id="Password" />
        <button className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign Up</button>
        
      </form>
      <div className="flex gap-2 mt-5 ml-2">
        <p> Have a account ?
        <Link to='/sign-in'><span className="text-blue-500">Sign in</span></Link>
        </p>
      </div>
    </div>
  )
}

export default Signup