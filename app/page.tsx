'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router=useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-20 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Transform Audio into Insights
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload any audio file and get instant transcription, summarization, and mood analysis.
            Perfect for professionals, students, and creators.
          </p>
          <button onClick={()=>router.push('/audio')} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Try It Now
          </button>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎙️',
                title: 'Audio Transcription',
                description: 'Convert audio files into accurate text transcripts in seconds.',
              },
              {
                icon: '📝',
                title: 'Smart Summarization',
                description: 'Get concise summaries of long audio files for quick insights.',
              },
              {
                icon: '😊',
                title: 'Mood Analysis',
                description: 'Analyze the emotional tone of the audio to understand sentiment.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 bg-gray-50 rounded-lg shadow-sm text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="space-y-12">
            {[
              {
                step: '1',
                title: 'Upload Your Audio',
                description: 'Select an audio file from your device or drag and drop it into the upload area.',
              },
              {
                step: '2',
                title: 'Processing',
                description: 'Our advanced AI processes the audio to generate transcription, summary, and mood analysis.',
              },
              {
                step: '3',
                title: 'Get Results',
                description: 'View and download the results in a clean, easy-to-read format.',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white text-2xl font-bold rounded-full">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'John Doe',
                role: 'Content Creator',
                testimonial: 'This tool has saved me hours of work! The transcription is accurate, and the mood analysis is a game-changer.',
              },
              {
                name: 'Jane Smith',
                role: 'Student',
                testimonial: 'I use this to summarize my lecture recordings. It’s incredibly helpful for studying.',
              },
              {
                name: 'Alex Johnson',
                role: 'Podcaster',
                testimonial: 'The summarization feature is a lifesaver for creating show notes quickly.',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 bg-gray-50 rounded-lg shadow-sm"
              >
                <p className="text-gray-600 mb-4">"{testimonial.testimonial}"</p>
                <div className="font-semibold text-gray-800">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call-to-Action Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Audio?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who are already saving time and gaining insights with our tool.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Get Started Now
          </button>
        </div>
      </motion.section>
    </div>
  );
}