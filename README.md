# 🚀 Online Code Editor & Execution Platform

A modern, web-based **online IDE** built for developers who want a fast, customizable, and community-driven coding experience — directly in the browser.

Built with a production-ready stack and designed for scalability, performance, and usability.

---

## ✨ Features

- 💻 Online IDE with multi-language support (10 languages)
- 🎨 5 VS Code–style themes for a familiar coding experience
- ⚙️ Customizable font size controls
- ✨ Smart execution output with clear Success & Error states
- 🤝 Community-driven code sharing
- 🔍 Advanced filtering & search
- 👤 User profiles with execution history tracking
- 📊 Statistics dashboard with usage insights
- 🔗 Webhook integration support
- 💎 Flexible pricing with Free & Pro plans

---

## 🧱 Tech Stack

- **Frontend**: Next.js, TypeScript
- **Backend**: Convex
- **Authentication**: Clerk
- **Code Execution**: Piston API
- **Payments**: LemonSqueezy
- **Styling & UI**: Tailwind CSS

---

## 🧠 How It Works

1. Users write code directly in the browser  
2. Code is securely executed via **Piston API**  
3. Execution results are processed and displayed with structured output  
4. Authentication and user data are handled by **Clerk**  
5. App state, data, and real-time updates are powered by **Convex**  
6. Pro subscriptions and billing are managed through **LemonSqueezy**

---

## 💳 Pricing

### Free Plan
- Limited executions
- Access to core editor features

### Pro Plan
- Increased execution limits
- Full access to advanced features
---

## 📦 Environment Setup

```bash
npm install
npm run dev
```
Environment Variables

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

PISTON_API_URL=
CLERK_JWT_ISSUER_DOMAIN=
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_WEBHOOK_SECRET=
```

