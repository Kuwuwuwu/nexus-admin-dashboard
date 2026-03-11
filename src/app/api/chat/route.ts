import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || messages.length === 0) {
      return new Response('No messages provided', { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    // Convert messages to the format Gemini expects
    const lastMessage = messages[messages.length - 1]
    const prompt = `You are a helpful admin assistant for this dashboard. You help users manage your team and analyze data. 
    You are knowledgeable about:
    - Team management and member permissions
    - Billing and subscription management
    - Analytics and data analysis
    - Dashboard navigation and features
    - General SaaS platform usage
    
    Be concise, helpful, and professional. If you don't know something, admit it and suggest where you might find the information.
    
    User: ${lastMessage.content}`

    const result = await model.generateContentStream(prompt)
    const stream = result.stream

    // Convert the stream to a ReadableStream
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text()
            controller.enqueue(encoder.encode(text))
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      }
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}