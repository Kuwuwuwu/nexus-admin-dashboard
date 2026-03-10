import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      invoices: {
        Row: {
          id: string
          date: string
          description: string
          amount: string
          status: 'paid' | 'pending' | 'failed'
          download_url: string
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          description: string
          amount: string
          status?: 'paid' | 'pending' | 'failed'
          download_url?: string
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          description?: string
          amount?: string
          status?: 'paid' | 'pending' | 'failed'
          download_url?: string
          created_at?: string
        }
      }
      team: {
        Row: {
          id: string
          name: string
          email: string
          role: string
          avatar: string
          status: 'active' | 'inactive'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role: string
          avatar?: string
          status?: 'active' | 'inactive'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: string
          avatar?: string
          status?: 'active' | 'inactive'
          created_at?: string
        }
      }
    }
  }
}
