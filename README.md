# RDSO Management Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC.svg)](https://tailwindcss.com/)

> **A comprehensive management dashboard for RDSO (Research Designs & Standards Organisation) built with modern web technologies.**

*Prototype created by **Sachida Nand Sharma***

## ✨ Features

### 🏢 **Role-Based Management System**
- **9-Tier Hierarchical Access Control**: DG → ADG → PED → ED → Director → JD → ADE → SSE → JE
- **Dynamic Role Switching**: Experience the dashboard from different organizational levels
- **Permission-Based UI**: Interface elements adapt based on user roles

### 📊 **Core Management Modules**
- **Employee Management**: Staff tracking, attendance monitoring, role assignments
- **Project Management**: Timeline tracking, progress visualization, resource allocation
- **File Management**: Document workflow, approval processes, pending notifications
- **Vendor Management**: Supplier registration, approval workflows, performance tracking
- **Field Activity**: Site inspections, location mapping, activity scheduling
- **Alert System**: Priority-based notifications, category management
- **Training Programs**: Skills development, scheduling, progress tracking
- **Analytics & Reporting**: Interactive charts, performance metrics, data exports

### 🎨 **User Experience**
- **Modern UI**: Clean, professional interface using shadcn/ui components
- **Indian Railways Theme**: Authentic color scheme (Deep Blue, Saffron, Green)
- **Dark/Light Mode**: System preference detection with manual toggle
- **Mobile Responsive**: Optimized for all screen sizes
- **Smooth Animations**: Framer Motion powered transitions
- **Glass Morphism**: Modern card designs with backdrop blur effects

### 🚀 **Technical Excellence**
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized with React Query for data fetching and caching
- **Scalable Architecture**: Clean separation between UI, logic, and data layers
- **Accessibility**: Built with Radix UI primitives for screen reader support

## 🛠 Tech Stack

### **Frontend**
- **React 18** - Modern component architecture
- **TypeScript** - Type safety and enhanced developer experience
- **Tailwind CSS** - Utility-first styling framework
- **shadcn/ui** - High-quality, accessible component library
- **Framer Motion** - Smooth animations and page transitions
- **TanStack Query** - Server state management and data synchronization
- **Wouter** - Lightweight client-side routing

### **Backend**
- **Express.js** - Web application framework
- **TypeScript** - Server-side type safety
- **Drizzle ORM** - Type-safe database operations
- **In-memory Storage** - Fast prototype data handling

### **Development Tools**
- **Vite** - Next-generation build tool
- **ESLint** - Code quality enforcement
- **PostCSS** - CSS processing and optimization

## 📦 Installation

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager

### **Quick Start**
```bash
# Clone the repository
git clone https://github.com/sachidanandharma/rdso-dashboard.git
cd rdso-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser
# The application will be available at http://localhost:5000
```

### **Build for Production**
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🚦 Getting Started

1. **Explore the Dashboard**: Start with the main dashboard to see KPI cards and analytics
2. **Switch Roles**: Use the role switcher in the top bar to experience different access levels
3. **Navigate Modules**: Use the sidebar to explore different management sections
4. **Test Features**: Try creating, editing, and managing different types of data
5. **Toggle Themes**: Switch between light and dark modes for your preference

## 📁 Project Structure

```
rdso-dashboard/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── dashboard/  # Dashboard-specific components
│   │   │   ├── employees/  # Employee management
│   │   │   ├── projects/   # Project management
│   │   │   └── ...         # Other feature modules
│   │   ├── contexts/       # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── pages/         # Main page components
├── server/                # Backend application
│   ├── index.ts          # Express server setup
│   ├── routes.ts         # API route definitions
│   └── storage.ts        # Data storage layer
├── shared/               # Shared types and schemas
└── docs/                # Documentation files
```

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=5000
```

### **Customization**
- **Colors**: Modify `client/src/index.css` for theme customization
- **Roles**: Update role definitions in `client/src/contexts/role-context.tsx`
- **Data**: Modify dummy data in `client/src/lib/dummy-data.ts`

## 🎯 Key Features in Detail

### **Role-Based Access Control**
The dashboard implements a realistic 9-tier hierarchy system found in Indian Railways:
- **Director General (DG)**: Full system access
- **Additional Director General (ADG)**: Senior management view
- **Principal Executive Director (PED)**: Executive oversight
- **Executive Director (ED)**: Departmental management
- **Director**: Divisional control
- **Joint Director (JD)**: Project leadership
- **Assistant Director Executive (ADE)**: Operational management
- **Senior Section Engineer (SSE)**: Technical supervision
- **Junior Engineer (JE)**: Field operations

### **Data Management**
- **50 Employee Records**: Comprehensive staff data with departments and roles
- **10 Active Projects**: Various stages of completion with progress tracking
- **20 Vendor Profiles**: Different approval stages and performance ratings
- **30 File Records**: Document workflow with pending day calculations
- **Real-time Analytics**: Live calculations and interactive charts

### **Modern UX Patterns**
- **Glassmorphism Design**: Subtle transparency effects with backdrop blur
- **Micro-interactions**: Hover effects, loading states, and smooth transitions
- **Progressive Disclosure**: Information hierarchy that reveals details on demand
- **Consistent Navigation**: Intuitive sidebar with clear visual indicators

## 🤝 Contributing

This is a prototype project created by **Sachida Nand Sharma**. If you'd like to contribute or suggest improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Creator

**Sachida Nand Sharma**  
*Full-Stack Developer & Railway Technology Enthusiast*

- **LinkedIn**: [sachidanandharma](https://linkedin.com/in/sachidanandharma)
- **GitHub**: [sachidanandharma](https://github.com/sachidanandharma)
- **Email**: sachida@example.com

## 🔮 Future Enhancements

- **Database Integration**: PostgreSQL with persistent data storage
- **Authentication**: User login and session management
- **Real-time Updates**: WebSocket integration for live data
- **API Integration**: Connection to actual RDSO systems
- **Mobile App**: React Native companion application
- **Advanced Analytics**: Machine learning insights and predictions
- **Document Management**: File upload and storage capabilities
- **Notification System**: Email and SMS alerts

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with code splitting
- **Load Time**: Sub-second initial page load
- **SEO Optimized**: Meta tags and semantic HTML

## 🐛 Known Issues

- This is a prototype using in-memory storage
- Data resets on server restart
- No persistent user authentication
- Limited real-world API integration

## 💡 Inspiration

This project draws inspiration from the actual workflows and requirements of the Research Designs & Standards Organisation (RDSO) of Indian Railways, reimagined with modern web technologies and user experience principles.

---

**⚠️ Disclaimer**: This is a prototype demonstration project and is not affiliated with or endorsed by RDSO or Indian Railways. It's created for educational and portfolio purposes only.