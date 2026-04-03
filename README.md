# SocialApp

A mini social media application where users can create accounts, post text or images, like and comment on posts.

## Features

- User Authentication (Signup / Login)
- Create Posts (Text + Image)
- Public Feed
- Like / Unlike Posts
- Comment on Posts
- state manage by ContextApi

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
MONGO_URL=mongodb+srv://abdulrazzak1835_db_user:lR8TJCpAvf0jd3bI@cluster0.8qyld6b.mongodb.net/?appName=Cluster0
JWT_SECRET=akdnswlkfdnb
CLOUDINARY_CLOUD_NAME=daqdnenup
CLOUDINARY_API_KEY=921722777435372
CLOUDINARY_API_SECRET=VfMtR_0Lf-b1076tIv-2gRAPxTk