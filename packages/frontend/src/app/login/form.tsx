'use client';
import React, { useState } from "react";

interface Account {
  user: string;
  password: string;
}

interface FormProps {
  handleSubmit: (account: Account) => void;
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

    function submitForm() {
        handleSubmit(account);
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={account.password}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3 mb-3 leading-tight"
                />

                <button
                    type="button"
                    onClick={submitForm}
                    className="bg-white text-black p-3 rounded-lg"
                >
                    Sign In
                </button>
        </form>
    );
}

export default Form;