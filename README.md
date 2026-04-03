# SocialApp

A mini social media application where users can create accounts, post text or images, like and comment on posts.

## Features

- User Authentication (Signup / Login)
- jwt auth
- Create Posts (Text + Image)
- Public Feed
- Like / Unlike Posts
- Comment on Posts

## Tech Stack

**Frontend:** React.js, Material UI, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas
**Image Upload:** Cloudinary

## Live Demo

- Frontend: https://social-app-s863.vercel.app
- Backend: https://socialapp-p6gg.onrender.com

## Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

**Backend `.env`:PORT=5001
MONGO_URL=""
JWT_SECRET=""
CLOUDINARY_CLOUD_NAME=daqdnenup
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
