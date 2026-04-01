import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { login } from '../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();
  console.log('Sending credentials:', { username: trimmedUsername, password: trimmedPassword });
  try {
    const response = await api.post('/admin/login', { username: trimmedUsername, password: trimmedPassword });
    console.log('Login success:', response.data);
    login(response.data.token);
    navigate('/');
  } catch (err) {
    console.error('Login error:', err);
    if (err.response && err.response.data && err.response.data.error) {
      setError(err.response.data.error);
    } else {
      setError('Invalid credentials');
    }
  }
};
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Admin Login</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Login
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;