import { NextResponse } from 'next/server';
import fs from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { AssemblyAI } from 'assemblyai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize AssemblyAI client
const aai = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_API_KEY, // Replace with your AssemblyAI API key
});

// Initialize Google Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Replace with your Gemini API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: Request) {
  try {
    // Read the uploaded file
    const formData = await request.formData();
    const file = formData.get('audio');

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // @ts-ignore
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFilePath = join(tmpdir(), `uploaded-audio-${Date.now()}.wav`);
    fs.writeFileSync(tempFilePath, buffer);

    // Step 1: Transcribe audio using AssemblyAI
    const transcript = await aai.transcripts.transcribe({
      audio: tempFilePath,
    });
    const transcriptionText = transcript.text as string;

    // Step 2: Summarize text using Gemini
    const summary = await summarizeText(transcriptionText);

    // Step 3: Analyze mood using Gemini
    const mood = await analyzeMood(transcriptionText);

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    // Return results
    return NextResponse.json({
      transcription: transcriptionText,
      summary,
      mood,
    });
  } catch (error) {
    console.error('Error processing audio:', error);
    return NextResponse.json(
      { message: 'Error processing audio' },
      { status: 500 }
    );
  }
}

// Summarize text using Gemini
async function summarizeText(text: string) {
  const prompt = `Summarize the following text in one or two sentences:\n\n${text}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Analyze mood using Gemini
async function analyzeMood(text: string) {
  const prompt = `Analyze the mood of the following text and return one of the following: Positive, Negative, or Neutral:\n\n${text}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}