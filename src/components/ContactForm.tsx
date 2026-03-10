'use client'

import { useState } from 'react'
import { Mail, Send, User, MessageSquare } from 'lucide-react'
import { Button } from '../app/components/ui/button'
import { Input } from '../app/components/ui/input'
import { Textarea } from '../app/components/ui/textarea'
import { Card, CardContent, CardHeader } from '../app/components/ui/card'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      console.log('Contact form submission:', formData)

      // Show success message
      alert('Thank you for your message! We&apos;ll get back to you within 24 hours.')

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Oops! Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Get in Touch
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center gap-2">
                <User className="h-4 w-4" />
                Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Subject
            </label>
            <Input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help you?"
              required
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Message
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your question or feedback..."
              required
              rows={5}
              className="rounded-xl resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
