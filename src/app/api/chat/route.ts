import { GoogleGenerativeAI } from '@google/generative-ai'
import { streamText } from 'ai'
import { google } from '@ai-sdk/google'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system: `You are a helpful admin assistant for this dashboard. You help users manage their team and analyze data. 
    You are knowledgeable about:
    - Team management and member permissions
    - Billing and subscription management
    - Analytics and data analysis
    - Dashboard navigation and features
    - General SaaS platform usage
    
    Be concise, helpful, and professional. If you don't know something, admit it and suggest where the user might find the information.`,
    messages,
  })

  return result.toTextStreamResponse()
}