import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_dk_cycle_shop.png';
import { useAuth } from '../../context/useAuth.jsx';

export const Signup = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '').trim();

    if (!name || !email || !password) {
      setError('Please complete every field to create your account.');
      return;
    }

    signup({ name, email });
    setSubmitted(true);
    navigate('/', { replace: true });
  };

  return (
    <div className="flex items-center bg-gray-dark p-4 font-[sans-serif] md:min-h-screen">
      <div className="mx-auto w-full max-w-4xl max-md:max-w-xl">
        <Link to="/" className="mb-6 flex justify-center">
          <img className="h-auto w-28 sm:w-36" src={logo} alt="DK Cycle Shop" />
        </Link>
        <div className="grid w-full gap-16 overflow-hidden rounded-md bg-white p-6 shadow-md sm:p-8 md:grid-cols-2">
          <div className="space-y-6 max-md:order-1">
            <div className="mb-8 md:mb-16">
              <h2 className="text-2xl font-bold text-gray-800">Instant access</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Create an account to save bikes, track orders and return to your
                favorite models faster.
              </p>
            </div>

            <div className="space-y-6">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-base font-semibold tracking-wider text-white hover:bg-blue-700"
              >
                Continue with Facebook
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md bg-gray-100 px-5 py-2.5 text-base font-semibold tracking-wider text-gray-800 hover:bg-gray-200"
              >
                Continue with Google
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md bg-black px-5 py-2.5 text-base font-semibold tracking-wider text-white hover:bg-[#333]"
              >
                Continue with Apple
              </button>
            </div>
          </div>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Register</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-gray-800">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-blue-500"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-gray-800">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm text-gray-800"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-blue-500"
                  placeholder="Enter password"
                />
              </div>
              <label className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                  required
                />
                <span className="ml-3 block text-sm text-gray-800">
                  I accept the{' '}
                  <Link
                    to="/Terms-and-Conditions"
                    className="font-semibold text-[#FF6347] hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                </span>
              </label>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full rounded-md bg-[#FF6347] px-4 py-2.5 text-sm font-semibold tracking-wider text-white hover:bg-[#FF7F50]"
              >
                Create Account
              </button>
            </div>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {submitted && (
              <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                Account created successfully.
              </p>
            )}

            <p className="mt-6 text-center text-sm text-gray-800">
              Already have an account?{' '}
              <Link
                to="/Login"
                className="font-semibold text-[#FF6347] hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
