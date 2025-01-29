'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{
    transcription: string;
    summary: string;
    mood: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null); // Clear any previous errors
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await axios.post('/api/processaudio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error processing audio:', error);
      setError('Failed to process the audio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Audio to Text, Summary, and Mood Analysis</h1>
      <div style={styles.uploadSection}>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={styles.button}
        >
          {loading ? 'Processing...' : 'Upload'}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {result && (
        <div style={styles.resultSection}>
          <h2 style={styles.resultHeading}>Transcription:</h2>
          <p style={styles.resultText}>{result.transcription}</p>

          <h2 style={styles.resultHeading}>Summary:</h2>
          <p style={styles.resultText}>{result.summary}</p>

          <h2 style={styles.resultHeading}>Mood:</h2>
          <p style={styles.resultText}>{result.mood}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
  uploadSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  fileInput: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '300px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  error: {
    color: '#ff0000',
    textAlign: 'center' as const,
    margin: '10px 0',
  },
  resultSection: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  resultHeading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  resultText: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333',
  },
};