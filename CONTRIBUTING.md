# Contributing to RDSO Management Dashboard

Thank you for your interest in contributing to the RDSO Management Dashboard! This project was created by **Sachida Nand Sharma** as a prototype to demonstrate modern web development techniques applied to railway management systems.

## 🤝 How to Contribute

### **Getting Started**
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/rdso-dashboard.git
   cd rdso-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### **Development Workflow**
1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes following the project conventions
3. Test your changes thoroughly
4. Commit with a descriptive message:
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a Pull Request on GitHub

## 🎯 Types of Contributions

### **🐛 Bug Fixes**
- Fix UI/UX issues
- Resolve TypeScript errors
- Improve performance bottlenecks
- Fix responsive design issues

### **✨ Features**
- Add new management modules
- Enhance existing functionality
- Improve accessibility
- Add new chart types or visualizations

### **📖 Documentation**
- Improve README clarity
- Add code comments
- Create usage examples
- Write API documentation

### **🎨 Design**
- Enhance UI components
- Improve color schemes
- Add animations
- Optimize for mobile

## 📋 Coding Standards

### **TypeScript**
- Use strict TypeScript configuration
- Provide proper type definitions
- Use meaningful variable names
- Add JSDoc comments for complex functions

### **React**
- Use functional components with hooks
- Follow the existing component structure
- Implement proper error boundaries
- Use React.memo for performance optimization where appropriate

### **Styling**
- Use Tailwind CSS classes
- Follow the existing design system
- Maintain consistent spacing and typography
- Ensure dark mode compatibility

### **Code Organization**
```
client/src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components
│   └── [module]/     # Feature-specific components
├── contexts/         # React contexts
├── hooks/           # Custom hooks
├── lib/             # Utilities and configurations
└── pages/           # Main page components
```

## 🧪 Testing Guidelines

### **Manual Testing**
- Test all role switches work correctly
- Verify responsive design on different screen sizes
- Check dark/light mode transitions
- Ensure all interactive elements function properly

### **Code Quality**
- Run TypeScript checks: `npm run type-check`
- Ensure no ESLint errors
- Test in both Chrome and Firefox
- Verify accessibility with screen readers

## 🎨 Design Guidelines

### **Colors**
- **Primary Blue**: `#1e3a8a` (RDSO Deep Blue)
- **Saffron**: `#ff9933` (Indian Railways Orange)
- **Green**: `#138808` (Success/Approved states)
- **Red**: `#ef4444` (Error/Critical states)

### **Typography**
- Use consistent font sizes from Tailwind CSS
- Maintain proper heading hierarchy
- Ensure sufficient color contrast

### **Components**
- Follow the existing shadcn/ui component patterns
- Add proper data-testid attributes for testing
- Implement loading and error states
- Ensure keyboard navigation works

## 📝 Pull Request Guidelines

### **PR Title Format**
- `Add: New feature description`
- `Fix: Bug description`
- `Update: Change description`
- `Docs: Documentation changes`

### **PR Description Template**
```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested in dark mode
- [ ] All role switches work

## Screenshots (if applicable)
Add screenshots of UI changes

## Additional Notes
Any additional context or considerations
```

### **Review Process**
1. Automated checks must pass
2. Code review by maintainers
3. Testing in multiple browsers
4. Approval and merge

## 🚀 Development Tips

### **Local Development**
- Use the browser dev tools extensively
- Test with different user roles
- Check the console for any errors
- Use React DevTools for debugging

### **Performance**
- Optimize images and assets
- Use lazy loading where appropriate
- Minimize bundle size
- Test on slower devices

### **Accessibility**
- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers

## 🐛 Reporting Issues

### **Bug Reports**
When reporting bugs, please include:
- Browser and version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable

### **Feature Requests**
- Describe the feature clearly
- Explain the use case
- Consider the impact on existing functionality
- Suggest implementation approaches

## 🎉 Recognition

All contributors will be recognized in the project documentation. Thank you for helping make this prototype better!

## 📞 Questions?

If you have questions about contributing:
- Open a GitHub issue with the "question" label
- Check existing issues and discussions
- Review the main README for project context

---

**Created by Sachida Nand Sharma**  
*Full-Stack Developer & Railway Technology Enthusiast*