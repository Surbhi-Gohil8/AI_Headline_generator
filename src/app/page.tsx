'use client'

import { useState } from 'react'
import axios from 'axios'
import InputForm from '@/components/InputForm'
import GenerateButton from '@/components/GenerateButton'
import HeadlineOutput from '@/components/HeadlineOutput'

export default function Home() {
  const [form, setForm] = useState({ role: '', skills: '', goal: '', tone: 'Professional' }) // Restored tone default
  const [headlines, setHeadlines] = useState<string[]>([]) // Changed to array

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const generateHeadline = async () => {
    const res = await axios.post('/api/generate', form)
    setHeadlines(res.data.headlines) // Changed to setHeadlines and res.data.headlines
  }

  const handleUpdateHeadline = (index: number, newText: string) => {
    const updatedHeadlines = [...headlines];
    updatedHeadlines[index] = newText;
    setHeadlines(updatedHeadlines);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 pt-12 sm:pt-16">
      <div className="w-full max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl">
        <header className="text-center mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 mb-3">
            LinkedIn Headline Generator
          </h1>
          <p className="text-lg text-gray-300">
            Craft compelling headlines that get you noticed!
          </p>
        </header>

        <main className="space-y-8">
          <section className="bg-gray-700/60 p-6 rounded-lg shadow-lg">
            <InputForm form={form} onChange={handleChange} />
            <div className="mt-6 flex justify-center">
              <GenerateButton onClick={generateHeadline} />
            </div>
          </section>

          {headlines.length > 0 && (
            <section className="mt-10">
              <HeadlineOutput headlines={headlines} onUpdateHeadline={handleUpdateHeadline} />
            </section>
          )}
        </main>
      </div>
      <footer className="text-center py-8 mt-auto text-gray-500 text-sm">
        created by surbhi 
      </footer>
    </div>
  )
}
