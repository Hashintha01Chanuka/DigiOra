# DigiOra Media Backend

A Node.js/Express backend API for DigiOra Media website.

## Features

- Contact form submissions handling
- MongoDB database integration
- RESTful API endpoints
- CORS enabled for frontend integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/digiora
JWT_SECRET=your-secret-key-here
```

3. Start the development server:
```bash
npm run dev
```

4. For production:
```bash
npm start
```

## API Endpoints

### Contact Form
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts (for admin)
- `GET /api/contacts/:id` - Get single contact
- `PATCH /api/contacts/:id/status` - Update contact status
- `DELETE /api/contacts/:id` - Delete contact

### Health Check
- `GET /api/health` - Server health status

### Root
- `GET /` - API welcome message

## Database Schema

### Contact Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required),
  phone: String,
  company: String,
  service: String,
  budget: String,
  message: String (required),
  status: String (enum: ['new', 'contacted', 'qualified', 'closed']),
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret for authentication

## Dependencies

- express - Web framework
- cors - Cross-origin resource sharing
- dotenv - Environment variables
- mongoose - MongoDB ODM
- nodemon - Development server 