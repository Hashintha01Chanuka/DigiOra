# DigiOra Admin Panel

A comprehensive content management system for the DigiOra Media website. This admin panel allows you to manage all aspects of your website content including pages, navigation, branding, and settings.

## Features

### 🏠 Page Management
- **Home Page Editor**: Edit hero sections, about content, services, and contact information
- **About Page Editor**: Manage company story, team information, features, and statistics
- **Services Page Editor**: Configure service offerings, pricing plans, and features
- **Contact Page Editor**: Update contact information, form fields, and social media links

### 🧭 Navigation Management
- **Navbar Editor**: Customize navigation menu, branding, call-to-action buttons, and settings
- **Footer Editor**: Manage footer content, links, contact information, and legal details

### ⚙️ System Settings
- **General Settings**: Site information, admin email, timezone, and language
- **Appearance**: Color schemes, fonts, dark mode, and animations
- **Notifications**: Email, browser, and system notifications
- **Security**: Two-factor authentication, session management, and access controls
- **Backup**: Automated backups, retention policies, and cloud storage

### 🔐 Authentication
- Secure login system with demo credentials
- Session management and logout functionality
- Protected routes and user authentication

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the admin directory:**
   ```bash
   cd Admin/admin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

### Demo Login Credentials
- **Email**: admin@digiora.com
- **Password**: admin123

## Project Structure

```
Admin/admin/
├── src/
│   ├── components/
│   │   ├── editors/
│   │   │   ├── HomePageEditor.jsx
│   │   │   ├── AboutPageEditor.jsx
│   │   │   ├── ServicesPageEditor.jsx
│   │   │   ├── ContactPageEditor.jsx
│   │   │   ├── NavbarEditor.jsx
│   │   │   └── FooterEditor.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Header.jsx
│   │   ├── Login.jsx
│   │   ├── Settings.jsx
│   │   └── Sidebar.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Features Overview

### Dashboard
- Overview of all website pages
- Quick access to content editors
- Statistics and recent activity
- Quick actions for common tasks

### Content Editors
Each editor provides:
- **Real-time editing**: See changes as you type
- **Tabbed interface**: Organize content by sections
- **Save/Reset functionality**: Manage changes safely
- **Preview mode**: See how content will appear
- **Validation**: Ensure content meets requirements

### Settings Management
- **General**: Site configuration and basic settings
- **Appearance**: Visual customization options
- **Notifications**: Communication preferences
- **Security**: Access control and authentication
- **Backup**: Data protection and recovery

## Technology Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Build Tool**: Vite

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. **Create new editor components** in `src/components/editors/`
2. **Add routes** in `src/App.jsx`
3. **Update navigation** in `src/components/Sidebar.jsx`
4. **Add to dashboard** in `src/components/Dashboard.jsx`

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Follow the established color scheme (red-600 primary)
- Maintain consistent spacing and typography
- Ensure responsive design for all screen sizes

## Security Considerations

- Demo authentication is for development only
- Implement proper authentication for production
- Add environment variables for sensitive data
- Consider adding rate limiting and CSRF protection

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect GitHub repository for automatic deployment
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Upload build files to S3 bucket
- **Custom Server**: Serve static files from your server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues:
- Check the documentation
- Review the code comments
- Create an issue in the repository

## License

This project is part of the DigiOra Media website management system.

---

**Note**: This is a demo version. For production use, implement proper authentication, data persistence, and security measures.
