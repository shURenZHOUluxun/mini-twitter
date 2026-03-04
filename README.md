# Mini Twitter Clone

A lightweight Twitter-style social feed built with **Next.js and React**, supporting threaded conversations, image posts, and inline replies.

🌐 **Live Demo**  
https://mini-twitter-umber.vercel.app/

---

# Overview

This project recreates the core interaction patterns of Twitter:

- Posting tweets with text and images
- Threaded conversations
- Inline replies
- Tweet detail pages
- Relative timestamps (e.g., `3m`, `2h`, `1d`)
- Real-time UI updates via React state

The goal of the project is to demonstrate **frontend architecture, component design, and state management** in a modern React application.

---

# Features

## Tweet Feed
- Scrollable timeline
- Like interaction
- Avatar and author display
- Relative time formatting

## Threaded Conversations
- Each tweet has its own **Post Page**
- Full **ancestor chain rendering**
- Nested replies
- Visual thread line connecting conversations

## Inline Replies
Users can reply directly within a thread without opening a modal.

## Image Upload
- Upload images directly in the tweet composer
- Instant preview using `FileReader`
- Remove uploaded images before posting

## Tweet Composer
- Text input with character support
- Image attachments
- Post / Reply button behavior

---

# Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **TypeScript**
- **CSS Modules**

### State Management
- **React Context API**

### Deployment
- **Vercel**

---

# Key Design Decisions

## Client-side State
Tweets are stored in a **global React Context**, allowing:

- tweet creation
- replies
- likes
- UI updates across pages

## Thread Rendering
Each tweet stores a `parentId`, allowing the system to reconstruct:

- ancestor chains
- reply threads

## Image Handling
Images are read using:

```javascript
FileReader.readAsDataURL()
```
This enables instant preview without requiring a backend storage service.

## Relative Time

Timestamps are formatted dynamically using a custom utility:
```
3m
2h
1d
May 20
```

## Security Notes

Because this project is a frontend demo:

- React automatically escapes user input to prevent XSS.

- No dangerouslySetInnerHTML is used.

- Image uploads are restricted to image/* file types.

Future improvements could include:

- File size limits

- Image count limits

- Backend validation

## Local Development

Clone the repository:

```
git clone https://github.com/yourusername/mini-twitter

cd mini-twitter
```

Install dependencies:
```
npm install
```
Run development server:
```
npm run dev
```
Open:

http://localhost:3000

## Deployment

This project is deployed on Vercel.

To deploy your own version:

- Fork this repository

- Connect it to Vercel

- Deploy

Vercel automatically builds and deploys the project on every push.
---
## Future Improvements

Possible extensions for a full-stack version:

- Authentication

- Persistent database (PostgreSQL)

- Cloud image storage

- Notifications

- Real-time updates

- User profiles

- Retweets

## Author

Built by **Fabe Jiayi Zeng**

GitHub: https://github.com/shURenZHOUluxun
