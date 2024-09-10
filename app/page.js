'use client'
import React from "react";
import { API_URL } from "@/utils/Config";

export default function Home() {

  const [State, setState] = React.useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));

    setError({
      ...error,
      [id]: []
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/Auths`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: State.email,
          password: State.password
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        window.location.href = '/test';
      } else {
        setError(data.errors);
        setLoading(false);
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error("Error Server Internal");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={onSubmit} className="max-w-sm w-full">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            type="text"
            placeholder="m@example.com"
            value={State.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-black"
          />
          {error?.email && error.email.map((err, index) => (
            <p key={index} className="text-red-500 text-sm">{err}</p>
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={State.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-black"
          />
          {error?.password && error.password.map((err, index) => (
            <p key={index} className="text-red-500 text-sm">{err}</p>
          ))}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
