# TaskFlow - Full-Stack Task Manager

A modern, full-featured task management application built with React, TypeScript, and Tailwind CSS. Features include user authentication, project management, and a beautiful Kanban board with drag-and-drop functionality.

## ✨ Features

- **User Authentication**: Secure signup/login system with JWT-style tokens
- **Project Management**: Create, organize, and delete projects
- **Kanban Board**: Interactive drag-and-drop task management across three columns (To Do, In Progress, Done)
- **Task Management**: Full CRUD operations with priorities, due dates, and descriptions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean design with smooth animations and micro-interactions
- **Local Data Persistence**: Uses localStorage for data storage (easily replaceable with backend API)

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Beautiful DND** for drag-and-drop functionality
- **React Router DOM** for navigation
- **Lucide React** for icons
- **date-fns** for date formatting

### Data Management
- **Context API** for state management
- **localStorage** for data persistence
- **JWT-style authentication** simulation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔧 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddTaskModal.tsx
│   ├── KanbanBoard.tsx
│   ├── Navbar.tsx
│   ├── ProjectList.tsx
│   ├── ProtectedRoute.tsx
│   └── TaskCard.tsx
├── contexts/           # React Context providers
│   ├── AuthContext.tsx
│   └── DataContext.tsx
├── pages/             # Main application pages
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── ProjectBoard.tsx
│   └── Signup.tsx
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## 🎯 Usage

### Getting Started
1. **Sign Up**: Create a new account with your name, email, and password
2. **Login**: Access your dashboard with your credentials
3. **Create Projects**: Add new projects from the dashboard
4. **Manage Tasks**: Click on a project to access the Kanban board

### Kanban Board Features
- **Drag & Drop**: Move tasks between columns (To Do, In Progress, Done)
- **Add Tasks**: Click the + button in any column to create new tasks
- **Edit Tasks**: Click the edit icon on any task card
- **Delete Tasks**: Click the trash icon to remove tasks
- **Task Properties**: Set priority levels, due dates, and descriptions

### Task Management
- **Priorities**: Low (gray), Medium (yellow), High (red)
- **Due Dates**: Optional date tracking with visual indicators
- **Status Updates**: Automatic status changes when dragging between columns
- **Real-time Updates**: Changes are immediately saved and reflected

## 🎨 Design Features

- **Modern Glassmorphism**: Subtle transparency effects and backdrop blur
- **Color-coded Priorities**: Visual priority system with consistent theming
- **Smooth Animations**: Hover states, transitions, and drag-and-drop feedback
- **Responsive Layout**: Optimized for all screen sizes
- **Professional Typography**: Clean hierarchy with proper spacing
- **Accessibility**: Keyboard navigation and screen reader support

## 🔒 Authentication System

The app includes a complete authentication system that simulates JWT token-based authentication:

- **Secure Registration**: Password validation and duplicate email prevention
- **Session Management**: Persistent login sessions with localStorage
- **Protected Routes**: Automatic redirection for unauthenticated users
- **User Context**: Global user state management

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices with touch-friendly interactions
- **Tablet Support**: Adapted layouts for medium-screen devices
- **Desktop Experience**: Full-featured interface for large screens
- **Flexible Layouts**: CSS Grid and Flexbox for responsive components

## 🚀 Deployment Ready

### Frontend Deployment (Netlify/Vercel)
1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service

### Converting to Full-Stack

To convert this to a traditional full-stack application:

1. **Backend Setup**: Create Express.js server with MongoDB
2. **API Integration**: Replace localStorage calls with HTTP requests
3. **Environment Variables**: Add `.env` file with database credentials
4. **Authentication**: Implement proper JWT token handling
5. **Database Models**: Create User, Project, and Task schemas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- **React Beautiful DND** for excellent drag-and-drop functionality
- **Tailwind CSS** for rapid UI development
- **Lucide** for beautiful, consistent icons
- **Vite** for lightning-fast development experience

---

**TaskFlow** - Streamline your project management with style! 🎯