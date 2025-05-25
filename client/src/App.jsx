import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showTutors, setShowTutors] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    year: '',
    bio: '',
    email: '',
  });

  const [filterSubject, setFilterSubject] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://conexxa-backend.onrender.com/api/tutors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      alert('Tutor submitted!');
      setFormData({ name: '', subject: '', year: '', bio: '', email: '' });
      setShowForm(false);
      fetchTutors();
    } catch (err) {
      alert('Error submitting tutor info');
      console.error(err);
    }
  };

  const fetchTutors = async () => {
    try {
      const res = await fetch('https://conexa-backend.onrender.com/api/tutors');
      const data = await res.json();
      setTutors(data);
    } catch (err) {
      console.error('Error fetching tutors:', err);
    }
  };

  useEffect(() => {
    if (showTutors) {
      fetchTutors();
    }
  }, [showTutors]);

  const filteredTutors = tutors.filter((tutor) => {
    return (
      (!filterSubject || tutor.subject.toLowerCase().includes(filterSubject.toLowerCase())) &&
      (!filterYear || tutor.year.toLowerCase().includes(filterYear.toLowerCase()))
    );
  });

  return (
    <div style={pageStyle}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓 Welcome to Conexa</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2rem' }}>
        Helping students connect through <strong>tutoring</strong> and <strong>relationships</strong>.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button style={buttonStyle} onClick={() => { setShowForm(false); setShowTutors(true); }}>📘 Find a Tutor</button>
        <button style={buttonStyle} onClick={() => { setShowForm(true); setShowTutors(false); }}>🧠 Offer Tutoring</button>
        <button style={buttonStyle}>💖 Explore Relationships</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={{ marginBottom: '1rem' }}>🧠 Offer Tutoring</h2>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
          <input type="text" name="year" placeholder="Year of Study" value={formData.year} onChange={handleChange} required />
          <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <button type="submit" style={{ ...buttonStyle, marginTop: '1rem' }}>Submit</button>
        </form>
      )}

      {showTutors && (
        <div style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '600px', width: '100%' }}>
          <h2>📘 Available Tutors</h2>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Filter by subject"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Filter by year"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              style={inputStyle}
            />
          </div>

          {filteredTutors.length === 0 ? (
            <p>No matching tutors found.</p>
          ) : (
            filteredTutors.map((tutor, index) => (
              <div key={index} style={tutorCard}>
                <h3>{tutor.name} — {tutor.subject}</h3>
                <p><strong>Year:</strong> {tutor.year}</p>
                <p><strong>Bio:</strong> {tutor.bio}</p>
                <p><strong>Contact:</strong> {tutor.email}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(to right, #5C258D, #4389A2)',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'sans-serif',
  padding: '2rem',
  textAlign: 'center'
};

const buttonStyle = {
  padding: '1rem 1.5rem',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '12px',
  background: 'white',
  color: '#333',
  cursor: 'pointer',
  transition: '0.3s',
};

const formStyle = {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  width: '100%',
  maxWidth: '400px',
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '16px',
  color: '#333'
};

const tutorCard = {
  backgroundColor: '#ffffffcc',
  color: '#333',
  borderRadius: '12px',
  padding: '1rem',
  marginBottom: '1rem',
};

const inputStyle = {
  padding: '0.5rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  flex: 1,
};

export default App;
