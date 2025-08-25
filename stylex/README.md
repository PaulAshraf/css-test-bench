# StyleX Todo App

A feature-rich todo application built with React, Vite, and StyleX for CSS framework comparison.

## 🌟 Features

### Core Functionality

- ✅ Create, edit, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Categorize todos (Work, Personal, Shopping, Health)
- ✅ Priority levels (High, Medium, Low)
- ✅ Search and filter functionality

### Advanced Features

- 🎯 Drag & drop reordering with @dnd-kit
- 💾 Automatic local storage persistence
- 🔍 Real-time search across todo text
- 🏷️ Category and status filtering
- ✨ Bulk operations (select multiple, bulk delete/toggle)
- 📊 Live statistics dashboard
- 📥📤 Export/Import todo data as JSON
- 🎨 Smooth animations and transitions

### UI/UX Highlights

- 🎨 Modern gradient backgrounds
- ⚡ Smooth hover effects and animations
- 🎯 Drag handles with visual feedback
- 📱 Fully responsive design
- ♿ Accessibility features (ARIA labels, keyboard navigation)
- 🌈 Color-coded categories and priorities
- 📈 Real-time completion statistics

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Todo/           # Todo-specific components
│   ├── UI/            # Reusable UI components
│   └── Layout/        # Layout components
├── contexts/          # React contexts
├── hooks/            # Custom React hooks
├── utils/           # Utility functions
└── index.css       # Base CSS (Tailwind removed, StyleX used)
```

## 🎨 StyleX Implementation

This implementation showcases StyleX features:

- **Co-located styles** - Styles defined next to components
- **Atomic CSS generation** - Deterministic, minimal CSS
- **Custom animations** - Keyframes written inline via StyleX
- **Component styling** - Consistent design system using StyleX
- **Performance** - Compile-time extraction, tiny runtime

## 📊 Key Metrics

- **Bundle Size**: Optimized by StyleX extraction
- **Performance**: Smooth 60fps animations
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Mobile First**: Responsive across all device sizes
- **Load Time**: Fast initial load with Vite's optimizations

## 🛠️ Technologies Used

- **React 19** - Latest React with hooks
- **Vite** - Fast build tool and dev server
- **StyleX** - Atomic CSS-in-JS framework
- **@dnd-kit** - Modern drag and drop for React
- **Local Storage** - Persistent data storage
- **ESLint** - Code linting and quality

## 📋 Todo App Features Comparison

This implementation will be compared against other CSS frameworks to evaluate:

- Development speed and DX
- Bundle size and performance
- Maintainability and scalability
- Design flexibility and customization
- Responsive design capabilities

---

**Part of CSS Framework Comparison Project**  
This app demonstrates StyleX capabilities for building modern, interactive web applications.
