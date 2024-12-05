import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    /* validating the inputs entered in the form and displaying notifications using toast */
    if (!formData.fullName.trim()) return toast.error("Full Name is required")
    if (!formData.email.trim()) return toast.error("Email is required")
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email")
    if (!formData.password) return toast.error("Password is required")
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters")

    return true
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const success = validateForm()

    if (success===true) signup(formData)
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-1'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/*LOGO*/}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-orangy flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-white' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p>Sign up to continue</p>
            </div>
          </div>
          
          {/*FORM */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            
            {/* Fullname input */}
            <div className="form-control" >
              {/* <label className="label">
                  <span className='label-text font-meduium'>Full Name</span>
              </label> */}
              <div className='relative'>
                <input
                  type="text"
                  className={`input hover:input-bordered w-full pl-5`}
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName:e.target.value })}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center justify-center pointer-events-none'>
                  <User className='size-5 text-base-content/40' />
                </div>
              </div>
              
            </div>

            {/* Email input */}
            <div className="form-control" >
              {/* <label className="label">
                  <span className='label-text font-meduium'>Email</span>
              </label> */}
              <div className='relative'>
                <input
                  type="text"
                  className={`input hover:input-bordered w-full pl-5`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center justify-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
              </div>
              
            </div>

            {/* Password input */}
            <div className="form-control" >
              {/* <label className="label">
                  <span className='label-text font-meduium'>Password</span>
              </label> */}
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input hover:input-bordered w-full pl-5`}
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button 
                  type='button' 
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='size-5 text-base-content/40' />
                  ) : (
                    <Eye className='size-5 text-base-content/40' />
                  )}
                </button>
              </div>
              
            </div>

            {/* Submit button */}
            
            <button
                className="bg-orangy btn w-full text-white"
                type="submit"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className='size-5 animate-spin text-white' />
                    Loading...
                  </>
                ) : (
                  "Sign up"
                )}
              </button>
        
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have an account?{" "}
              <Link to={"/login"} className='link link-primary'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage