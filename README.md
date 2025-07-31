# 🚀 LearnFast AI

**LearnFast AI** is your personal AI-powered study companion that helps students by:
- Extracting content from uploaded PDFs or images,
- Generating summaries, explanations, and questions using GPT-based AI,
- Saving chats and enabling easy history access,
- Providing a user-friendly, minimal UI with chat features.

---

## 🧠 Features

- ✨ Chat with AI about uploaded study material
- 📄 Upload PDFs or images (OCR + PDF parse supported)
- 📚 Extracted content used to generate likely exam questions
- 💬 Persistent chat history with titles and timestamps
- 📂 File preview & markdown-rendered AI replies
- 📸 Upload profile picture (via Cloudinary)
- ⚙️ Settings page for user info and profile image
- 🧼 Toast notifications (no `alert()`s)
- 🖥️ Resizable Left and Right Panels
- 🔐 JWT Auth Protected Routes (Register/Login)

---

## 🛠 Tech Stack

| Frontend     | Backend        | Other        |
|--------------|----------------|--------------|
| React (Vite) | Express.js     | MongoDB      |
| TailwindCSS  | JWT Auth       | Cloudinary   |
| React Router | Multer         | pdf-parse / Tesseract.js |
| Toastify     | Mongoose       | OpenRouter / OpenAI API |

---

## 📦 Getting Started

### 🔧 Setup Instructions
 Clone the repository
git clone https://github.com/vednarvekar001/learnfast-ai.git

 Navigate into the project directory
cd learnfast-ai

 Install frontend dependencies
cd client
npm install

 Install backend dependencies
cd ../server
npm install

# .env setup in Server folder
PORT=4004
MONGODB_URI= #Mongodb url
JWT_SECRET= #jwtsecret
NODE_ENV=development
OPENROUTER_API_KEY= #your openrouter api keys

# Start Both FrontEnd & Backend Server
by command "npm run dev"

### When Server Starts and Program oprogram opens, in URL add "/chat" to directly head to AI chat. Landing page is not developed !!! 

