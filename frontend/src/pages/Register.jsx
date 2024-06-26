import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";

import Logo from "../components/Logo";
import registerSchema from "../validationSchemas/registerSchema";
import { useEffect, useState } from "react";
import submitAction from "../actions/submitAction";

export default function Register() {
    const navigate = useNavigate();
    const [cookies, setCookie]= useCookies(['authToken']);
    const [backendError, setBackendError] = useState()
    const [passwordType, setPasswordType] = useState("password");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });

    async function onSubmit(data) {
        setBackendError()
       const response =  await submitAction(data);
       const {success, token, error} =  await response.json()
       if(error) {
        setBackendError(error.messages.join(', '))
       }
       else if(success) {
        console.log(success.message)
        setCookie('authToken', token)
       }
    }

    function togglePasswordType() {
        let newPasswordType = 'text';
        if (passwordType === 'text') {
            newPasswordType = 'password';
        }
        setPasswordType(newPasswordType);
    }


    useEffect(() => {
        if(cookies.authToken) {
          navigate('/dashboard');
        }
      }, [cookies, navigate])

      

    return (
        <>
            <div className="flex min-h-full h-screen flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <Logo width="150px" />
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Register using your personal details!
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Already a member?{' '}

                                <Link className="font-semibold text-indigo-600 hover:text-indigo-500" to="/login">
                                    Log in to your account
                                </Link>

                            </p>
                        </div>

                        {
                            backendError && <p className="text-red-500 text-sm mt-4">{backendError}</p> 
                        }

                        <div className="mt-10">
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="flex gap-10">
                                        <div className="w-full">
                                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                                First name*
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="firstName"
                                                    {...register("firstName")}
                                                    type="text"
                                                    className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}
                                        </div>

                                        <div className="w-full">
                                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                                Last name*
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="lastName"
                                                    {...register("lastName")}
                                                    type="text"
                                                    className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {errors.lastName && <span className="text-xs text-red-500">{errors.lastName.message}</span>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                                            Mobile
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="mobile"
                                                {...register("mobile")}
                                                type="tel"
                                                className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.mobile && <span className="text-xs text-red-500">{errors.mobile.message}</span>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email*
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                {...register("email")}
                                                type="text"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password*
                                        </label>

                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <input
                                                type={passwordType}
                                                {...register("password")}
                                                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <div onClick={togglePasswordType} className="absolute inset-y-0 right-2 flex items-center">
                                               {
                                                passwordType === 'password' ? 
                                                <i className="fa-regular fa-eye"></i> :
                                                <i className="fa-solid fa-eye-slash"></i>
                                               } 
                                            </div>
                                        </div>

                                        {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}

                                    </div>

                                    <div>
                                        <label htmlFor="verifyPassword" className="block text-sm  font-medium leading-6 text-gray-900">
                                            Verify password*
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="verifyPassword"
                                                {...register("verifyPassword")}
                                                type={passwordType}
                                                className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.verifyPassword && <span className="text-xs text-red-500">{errors.verifyPassword.message}</span>}
                                    </div>



                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Register
                                        </button>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="text-sm leading-6">
                                            <Link to="/" className="font-semibold text-indigo-600  hover:text-indigo-500">
                                                Back to Home
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}
