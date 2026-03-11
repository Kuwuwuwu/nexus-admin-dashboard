import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

// Log API key status (without revealing the key)
console.log('API Key Status:', process.env.GOOGLE_GENERATIVE_AI_API_KEY ? 'Present' : 'Missing')

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

export async function POST(req: Request) {
  try {
    console.log('Chat API called')
    
    const { messages } = await req.json()
    console.log('Received messages:', messages?.length || 0, 'messages')

    if (!messages || messages.length === 0) {
      console.error('No messages provided')
      return new Response('No messages provided', { status: 400 })
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, 
          threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE
        }
      ]
    })
    
    console.log('Model initialized successfully')
    
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

    console.log('Sending prompt to Gemini...')
    const result = await model.generateContentStream(prompt)
    const stream = result.stream

    console.log('Stream received from Gemini')

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
          console.error('Stream processing error:', error)
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
  } catch (error: any) {
    console.error('Chat API error:', error)
    console.error('Error details:', {
      message: error?.message || 'Unknown error',
      stack: error?.stack || 'No stack trace',
      name: error?.name || 'Unknown error type'
    })
    return new Response('Internal Server Error', { status: 500 })
  }
}