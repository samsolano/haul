'use client';
import React, { useState } from "react";

export interface Account {
  user: string;
  password: string;
}

interface FormProps {
  handleSubmit: (account: Account, purpose: "login" | "register") => void;
}

function Form({ handleSubmit }: FormProps) {
    // State for form data
    const [account, setAccount] = useState<Account>({
        user: "",
        password: ""
    });

    // Handle input changes more efficiently
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        // Update only the changed field using spread operator
        setAccount((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function submitForm(purpose: "login" | "register") {
        handleSubmit(account, purpose);
        setAccount({ user: "", password: "" });
    }

    return (
        <form>
                <label htmlFor="username">Username </label>
                <input
                    type="user"
                    name="user"
                    id="user"
                    placeholder="Enter your username"
                    value={account.user}
                    onChange={handleChange}
                    className="shadow appearance-none border text-black rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={account.password}
                    onChange={handleChange}
                    className="border rounded w-full py-2 text-black px-3 mb-3 leading-tight"
                />

                <div className="flex flex-row gap-2">
                    <button
                        type="button"
                        onClick={() => submitForm("login")}
                        className="bg-white text-black p-3 rounded-lg hover:cursor-pointer"
                    >
                        Sign In
                    </button>

                    <button
                        type="button"
                        onClick={() => submitForm("register")}
                        className="bg-white text-black p-3 rounded-lg hover:cursor-pointer"
                    >
                        Create Account
                    </button>
                </div>
        </form>
    );
}

export default Form;