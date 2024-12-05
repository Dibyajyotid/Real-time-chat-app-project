import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Mail, MessageSquare } from 'lucide-react'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { login, isLoggingIn}  = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(formData)
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
            <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>
        </div>
        
        {/*FORM */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          

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
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className='size-5 animate-spin text-white' />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
      
        </form>

        <div className='text-center'>
          <p className='text-base-content/60'>
            Don&apos;t have an account?{" "}
            <Link to={"/signup"} className='link link-primary'>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>

  )
}

export default LoginPage