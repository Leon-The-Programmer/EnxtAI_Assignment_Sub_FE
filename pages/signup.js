// pages/signup.js
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        pan: '',
        idFile: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'idFile') setFormData({ ...formData, idFile: files[0] });
        else setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('pan', formData.pan);
        data.append('idFile', formData.idFile);

        try {
        const response = await fetch('https://enxtai-assignment-sub.onrender.com/api/v1/users/signup', {
            method: 'POST',
            body: data,
        });

        const jsonRes = await response.json();

        if (response.ok) {
            alert(jsonRes.message);
            setFormData({
                name: '',
                email: '',
                password: '',
                pan: '',
                idFile: null,
            });
            router.push('/login');
        } else {
            alert(jsonRes.message);
        }
        } catch (err) {
        console.error(err);
        alert('Error submitting form');
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>EnxtAI Assignment</h1>
            <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
                <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                        <input type="text" name="name" onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                        <input type="email" name="email" onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                        <input type="password" name="password" onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>PAN Number:</label>
                        <input type="text" name="pan" onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Upload ID:</label>
                        <input type="file" name="idFile" onChange={handleChange} required style={{ width: '100%', padding: '10px' }} />
                    </div>
                    <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>Sign Up</button>

                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <p>Already have an account? <a href="/login" style={{ color: 'blue', textDecoration: 'underline' }}>Login here</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
