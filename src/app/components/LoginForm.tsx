"use client";

import { FormEvent, useState } from "react";
import { validateLoginForm } from "./functions/authfunctions";


type FormData = {
    username: string,
    password: string
}

type FormStatus = {
    type: "success" | "neutral" | "failed"
    statusMsg: string
}


export default function LoginForm() {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: ""
    })

    const [formStatus, setFormStatus] = useState<FormStatus>({
        type: "neutral",
        statusMsg: ""
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // if (!formData.username) {
        //     setFormStatus({ type: "failed", statusMsg: "Username is required" });
        //     return;
        // }

        // if (!formData.password) {
        //     setFormStatus({ type: "failed", statusMsg: "Password is required" });
        //     return;
        // }

        // if (formData.username !== "frederick" || formData.password !== "frederickpassword") {
        //     setFormStatus({ type: "failed", statusMsg: "Incorrect Credentials" });
        //     return;
        // }

        // setFormStatus({ type: "success", statusMsg: "Login successful!" });

        
        const result = validateLoginForm(formData.username.trim(), formData.password);

        if (!result.isValid && result.status) {
            console.log(result.status);
            setFormStatus(result.status);
            return;
        } else {
            setFormStatus(result.status!);
        }

        // Reset form
        setFormData({ username: '', password: '' });
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
                        Login
                    </button>
                </div>
            </form>

        </>
    );
}