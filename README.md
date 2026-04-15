# Nexus Admin Dashboard

A modern, production-ready SaaS Admin Dashboard built with Next.js 15, featuring Role-Based Access Control (RBAC), AI-powered chat assistance, real-time analytics, and secure authentication. Designed for multi-tenant SaaS applications with seamless dark/light theme support.

## ✨ Key Features

### 🔐 Authentication & Authorization
* **Secure Authentication** powered by [Clerk](https://clerk.com/) with social login support
* **Role-Based Access Control (RBAC)** with three permission levels: USER, MODERATOR, ADMIN
* **Route Protection** via middleware for public and admin-only routes
* **Optimistic UI Updates** for role changes with loading states

### 📊 Analytics & Activity
* **Interactive Charts** powered by Recharts for revenue and user activity visualization
* **Activity Logging** system tracking admin actions with timestamps
* **Real-time Data** using React Server Actions and on-demand revalidation

### 🤖 AI-Powered Assistant
* **Smart Chat Interface** using Google Generative AI and OpenAI
* **Real-time Streaming** responses with AI SDK integration
* **Context-aware Assistance** for admin operations

### 🎨 UI/UX
* **Dynamic Theming** - Seamless Light/Dark/System mode switching
* **Fully Responsive** - Mobile-first design for all screen sizes
* **Optimistic Updates** - Instant UI feedback with `useOptimistic` hook
* **Loading States** - Skeleton screens and animated transitions

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Authentication** | [Clerk](https://clerk.com/) |
| **Database** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **Payments** | [Stripe](https://stripe.com/) |
| **AI** | [AI SDK](https://sdk.vercel.ai/) + Google Generative AI / OpenAI |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) |
| **Components** | [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Theming** | [Next-Themes](https://github.com/pacocoursey/next-themes) |

## 🚀 Architecture

### Server Actions
All data mutations use React Server Actions for:
- **User role management** (`updateUserRole`)
- **Activity logging** (`logActivity`)
- **Analytics data fetching** (revenue, user stats)
- **Stripe integration** (payments, webhooks)

### RBAC System
```
USER       → Access to dashboard, personal profile
MODERATOR  → + User management, content moderation
ADMIN      → + Full system access, role assignment, settings
```

### Route Structure
| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/sign-in`, `/sign-up` | Public | Authentication |
| `/dashboard` | Authenticated | User dashboard |
| `/admin` | ADMIN only | Admin dashboard with analytics |
| `/admin/users` | ADMIN only | User management with role assignment |
| `/api/chat` | Public | AI assistant endpoint |

## 📝 Environment Setup

### 1. Clone the repository
```bash
git clone https://github.com/Kuwuwuwu/nexus-admin-dashboard.git
cd nexus-admin-dashboard
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file by copying from the example:

```bash
cp .env.local.example .env.local
```

Add the following variables:

```env
# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# AI Services (choose one or both)
OPENAI_API_KEY=your_openai_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_generative_ai_api_key

# Stripe Payments (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Database Setup (Supabase)
1. Create a new project at [supabase.com](https://supabase.com)
2. Run the schema from `supabase-schema.sql`
3. Copy the project URL and anon key to `.env.local`

### 4. Clerk Setup
1. Create an application at [clerk.com](https://clerk.com)
2. Configure the webhook to sync user data to your database
3. Add custom attributes for `role` in public metadata

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign up to create your first admin user.

## 📸 Screenshots

### Dark Mode
![Dark Mode Dashboard](public/screenshots/dark-mode.jpg)

### Light Mode
![Light Mode Dashboard](public/screenshots/light-mode.jpg)

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── app/
│   ├── actions/          # Server Actions
│   ├── admin/            # Admin routes (protected)
│   ├── api/              # API routes (webhooks)
│   ├── components/       # Shared UI components
│   ├── (public)/         # Public routes
│   └── layout.tsx        # Root layout
├── components/           # Additional components
├── lib/                  # Utilities & auth helpers
├── middleware.ts         # Route protection
└── types/               # TypeScript types
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.