import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/products'); // Redirect to products if already logged in
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const jsonRes = await response.json();
      alert(jsonRes.message);

      if (response.ok) {
        localStorage.setItem('token', jsonRes.token);
        router.push('/products'); // Redirect to products after login
      }

    } catch (err) {
      console.error(err);
      alert('Error logging in');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>EnxtAI Assignment</h1>
      <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>Login</button>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <p>Don't have an account? <a href="/signup" style={{ color: 'blue', textDecoration: 'underline' }}>Create an account</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}