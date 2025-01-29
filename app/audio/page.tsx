'use client';
import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import AudioRecorder from '../../component/audio';

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
      setError(null);
      toast.success('Audio file selected successfully!');
    }
  };

  const handleRecordingComplete = (audioFile: File) => {
    setFile(audioFile);
    setError(null);
    toast.success('Recording saved and selected!');
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error('Please select a file or record audio.');
      return;
    }

    const promise = () => new Promise((resolve, reject) => {
      setLoading(true);
      setError(null);
      setResult(null);

      const formData = new FormData();
      formData.append('audio', file);

      axios.post('/api/processaudio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          setResult(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error('Error processing audio:', error);
          setError('Failed to process the audio. Please try again.');
          reject(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });

    toast.promise(promise(), {
      loading: 'Processing your audio...',
      success: 'Audio processed successfully!',
      error: 'Failed to process audio',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" expand={true} richColors />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-center text-gray-800 mb-6"
          >
            Audio to Text, Summary, and Mood Analysis
          </motion.h1>

          <div className="space-y-6">
            <div className="flex flex-col items-center gap-6">
              <div className="w-full space-y-4">
                <p className="text-center text-gray-600">Choose an option:</p>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                />
                <div className="text-center text-gray-600">or</div>
                <AudioRecorder onRecordingComplete={handleRecordingComplete} />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !file}
                className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  'Process Audio'
                )}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-red-500 font-medium"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 space-y-6"
                >
                  {['transcription', 'summary', 'mood'].map((key, index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <h2 className="text-xl font-bold text-gray-800 mb-2 capitalize">{key}:</h2>
                      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{result[key]}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}