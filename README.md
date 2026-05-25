
# LibaryApp

A full-stack web application for managing a library system. Browse books, manage user accounts, and access book information with an intuitive React frontend and Express/MongoDB backend.

## Features

- **Book Browsing**: Search and filter books by title, author, genre, and rating
- **Popular Books**: View trending and frequently borrowed books
- **User Authentication**: Sign up and login functionality
- **Book Management**: View detailed book information including ISBN, author, and cover images
- **Responsive Design**: Bootstrap-powered responsive UI
- **Book Ratings**: Rate and review books
- **User Profiles**: Personalized user information and management

## Tech Stack

### Frontend
- **React 18.3** - UI library
- **React Router DOM 6** - Client-side routing
- **React Bootstrap 2** - Bootstrap components for React
- **Axios** - HTTP client for API calls
- **React Hot Toast & React Toastify** - Notification system
- **Floating UI & Popper.js** - Tooltip and positioning

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-Origin Resource Sharing support

## Project Structure

```
LibaryApp/
├── Backend/
│   ├── index.js              # Main Express server
│   ├── models/               # MongoDB schemas
│   │   ├── BookModel.js
│   │   ├── UserInfomationModel.js
│   │   └── ImageModel.js
│   └── Data/                 # Database data files
├── frontend/
│   └── libary_frontend/      # React application
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── README.md
├── Book covers/              # Book cover images
└── package.json             # Root dependencies
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local instance running on `mongodb://127.0.0.1:27017`)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd LibaryApp
```

2. Install root dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend/libary_frontend
npm install
cd ../..
```

### Running the Application

#### Start MongoDB
```bash
# Ensure MongoDB is running on localhost:27017
mongod
```

#### Start Backend Server
```bash
node Backend/index.js
```
The backend will run on `http://localhost:3001`

#### Start Frontend Development Server
```bash
cd frontend/libary_frontend
npm start
```
The frontend will run on `http://localhost:3000`

## API Endpoints

### Book Information
- `GET /BookInfo/` - Get all books
- `GET /BookInfo/Popular` - Get 4 most popular books
- `GET /BookInfo/:ISBN` - Get book by ISBN
- `GET /BookInfo/ISBN/:NameOfBook` - Get ISBN by book name
- `POST /AddBook` - Add a new book (requires book data in request body)

### Book Covers/Images
- `GET /BookCover/Images` - Get book covers with filtering
  - Query parameters: `title`, `author`, `genre`, `rating`
- `GET /BookCover/Images/Popular` - Get top 4 popular book covers
- `GET /BookCover/Images/:Title` - Get cover image by title
- `GET /BookCover/Images/Single/:ISBN` - Get image by ISBN

### User Information
- `GET /UserInfo/Role/:email` - Get user role
- `GET /UserInfo/Name/:email` - Get user first and last name
- `POST /Login` - User login (email, password)
- `POST /SignUp` - User registration (username, password, firstname, lastname)

## Database Schema

### Book Collection
- ISBN (unique identifier)
- Title
- Author
- Genre
- Rating
- TimesTakenOut (popularity metric)

### User Information Collection
- Email
- Password
- FirstName
- LastName
- UserID (auto-generated)
- Role

### Book Images Collection
- ISBN
- Title
- Author
- EncodedString (image data)

## Configuration

### Backend Configuration
Edit `Backend/index.js` to modify:
- Port: `const port = 3001`
- MongoDB URI: `'mongodb://127.0.0.1:27017/Amari_Libary_Database'`
- CORS origin: `'http://localhost:3000'`

## Development

### Available Scripts

#### Backend
```bash
node Backend/index.js    # Start the server
```

#### Frontend
```bash
cd frontend/libary_frontend
npm start                # Start development server
npm test                 # Run tests
npm build                # Build for production
```

## CORS Configuration

The backend is configured to accept requests from `http://localhost:3000` with the following headers:
- GET, POST, PUT, DELETE, OPTIONS methods
- Content-Type, Authorization headers
- Credentials support enabled

## Security Notes

⚠️ **Important**: 
- Passwords are stored in plain text in the current implementation. Consider implementing bcrypt or similar for production.
- This application is designed for local development. For production deployment, implement:
  - HTTPS
  - Environment variables for sensitive data
  - Proper authentication/authorization
  - Input validation and sanitization
  - Rate limiting

## Future Enhancements

- [ ] Password encryption/hashing
- [ ] JWT token-based authentication
- [ ] Book checkout/return functionality
- [ ] User review and rating system
- [ ] Search optimization
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Deployment configuration (Docker, cloud platforms)

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection URI in `Backend/index.js`

### CORS Errors
- Verify frontend is running on `http://localhost:3000`
- Check CORS configuration in backend

### Port Already in Use
- Change the port in `Backend/index.js` or kill the process using the port

## License

ISC

## Author

Malcom Maynard

---

**Steps to upload to GitHub:**
1. Go to your repository on GitHub
2. Click the pencil icon next to README.md (or click "Add file" if none exists)
3. Delete any existing content
4. Paste the content above
5. Click "Commit changes"
6. Add a commit message like "Add comprehensive README"
7. Commit! ✅
