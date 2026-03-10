import ContactForm from '../../components/ContactForm'
import { Headphones, MessageCircle, Mail, Clock } from 'lucide-react'

export default function SupportPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Headphones className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Support Center
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
            We&apos;re here to help! Get in touch with our support team for any questions, 
            feedback, or assistance you might need.
          </p>
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
              <MessageCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Chat with our support team in real-time
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Get help via email within 24 hours
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Round-the-clock assistance available
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Send us a Message
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
        <ContactForm />
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Quick answers to common questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                How do I upgrade my plan?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Navigate to the Billing page and select the plan you&apos;d like to upgrade to.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Yes, you can cancel your subscription at any time from your account settings.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                How do I add team members?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Go to the Team page and click the invite button to add new members.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Is my data secure?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Yes, we use industry-standard encryption to protect your data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
