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
# Clone the repository
git clone https://github.com/vednarvekar001/learnfast-ai.git

# Navigate into the project directory
cd learnfast-ai

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

### .env setup in 
