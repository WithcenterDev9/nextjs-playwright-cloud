"use client";

import { FormEvent, useState } from "react";
import { validateRegisterForm } from "./functions/authfunctions";


type FormData = {
    username: string,
    email: string,
    password: string
}

type FormStatus = {
    type: "success" | "neutral" | "failed"
    statusMsg: string
}


export default function RegisterForm() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: ''
    });

    const [formStatus, setFormStatus] = useState<FormStatus>({
        type: "neutral",
        statusMsg: ""
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Reset form status
        setFormStatus({ type: "neutral", statusMsg: "" });

        // Validate username
        // if (!formData.username) {
        //     setFormStatus({ type: "failed", statusMsg: "Username is required" });
        //     return;
        // }
        // if (formData.username.length < 3) {
        //     setFormStatus({ type: "failed", statusMsg: "Username must be at least 3 characters" });
        //     return;
        // }

        // Validate email
        // if (!formData.email) {
        //     setFormStatus({ type: "failed", statusMsg: "Email is required" });
        //     return;
        // }
        // if (!/\S+@\S+\.\S+/.test(formData.email)) {
        //     setFormStatus({ type: "failed", statusMsg: "Please enter a valid email address" });
        //     return;
        // }

        // Validate password
        // if (!formData.password) {
        //     setFormStatus({ type: "failed", statusMsg: "Password is required" });
        //     return;
        // }
        // if (formData.password.length < 6) {
        //     setFormStatus({ type: "failed", statusMsg: "Password must be at least 6 characters" });
        //     return;
        // }

        const result = validateRegisterForm(formData.username, formData.email, formData.password);

        if (!result.isValid && result.status) {
            console.log(result.status);
            setFormStatus(result.status);
            return;
        } else {
            setFormStatus(result.status!);
        }


        // If all validations pass
        // Reset form
        setFormData({ username: '', email: '', password: '' });
    }

    return (
        <>
            {formStatus.type !== "neutral" && (
                <div className={`mb-4 p-4 rounded-md ${formStatus.type === "failed"
                    ? "bg-red-50 border-red-500"
                    : "bg-green-50 border-green-500"
                    } border`}
                    role="alert"
                >
                    <div className="flex">
                        <div className="flex-shrink-0">
                            {formStatus.type === "failed" ? (
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <div className="ml-3">
                            <h3 className={`text-sm font-medium ${formStatus.type === "failed" ? "text-red-800" : "text-green-800"
                                }`}>
                                {formStatus.statusMsg}
                            </h3>
                        </div>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}

                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}

                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        value={formData.password}

                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit"
                        className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Register
                    </button>
                </div>
            </form>
        </>
    )
}