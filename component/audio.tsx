import React, { useState, useRef } from 'react';
import { Mic, Square, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';


const AudioRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
        clearInterval(timerRef.current);
        toast.success('Recording completed!');
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingDuration(0);
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
      toast.success('Recording started!');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleUpload = () => {
    if (audioBlob) {
      const file = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
      onRecordingComplete(file);
      setAudioBlob(null);
      toast.success('Recording ready for processing!');
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-recorder-container">
      <AnimatePresence mode="wait">
        {!isRecording && !audioBlob && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={startRecording}
            className="record-button"
          >
            <Mic />
            Start Recording
          </motion.button>
        )}

        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="recording-container"
          >
            <div className="recording-indicator">
              <Mic />
            </div>
            <p className="duration-text">{formatDuration(recordingDuration)}</p>
            <button onClick={stopRecording} className="stop-button">
              <Square />
              Stop Recording
            </button>
          </motion.div>
        )}

        {audioBlob && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="audio-controls"
          >
            <audio 
              src={URL.createObjectURL(audioBlob)} 
              controls 
              className="audio-player"
            />
            <button onClick={handleUpload} className="upload-button">
              <Upload />
              Use Recording
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {isRecording && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="recording-status"
        >
          Recording in progress...
        </motion.div>
      )}
    </div>
  );
};

export default AudioRecorder;