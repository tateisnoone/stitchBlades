# StitchBlades

StitchBlades is a vibrant platform designed for unique fashion enthusiasts to share and discover inspiring outfit ideas. With features like user authentication, customizable profiles, and an interactive community, StitchBlades is your ultimate destination to express creativity and connect with like-minded individuals.

## Features

- **User Authentication**: Register and log in securely using Supabase as the backend.
- **Profile Customization**: Edit your profile information, including username and avatar.
- **Post Creation**: Upload and share outfit posts with a description, tags, and an image.
- **Community Interaction**: Like and comment on posts to engage with other users.
- **Dashboard with Filters**: Explore posts filtered by text or category tags (e.g., Gothic, Casual).
- **Responsive Design**: Optimized for all devices with light and dark mode options.

## Tech Stack

### Frontend

- **React**: Component-based library for building the UI.
- **Tailwind CSS**: For highly customizable and responsive styling.
- **ShadCN**: Prebuilt components for a seamless user experience.

### Backend

- **Supabase**: Backend-as-a-Service for authentication, database, and APIs.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/tateisnoone/stitchblades.git
   cd stitchblades
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:

   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```
   The app will run locally at `http://localhost:3000/`.

## Key Functionalities

### Authentication

- Supabase handles user registration and login securely.
- Protect routes to ensure only authenticated users can interact with posts.

### User Profiles

- Editable profile info (username, avatar).
- View your posts and favorited outfits on your profile page.

### Posts

- Upload outfits with a title, description, and tags.
- Interact with posts by liking ("stitching") and commenting.
- View detailed post pages with all interactions.

### Dashboard

- Filter posts by text search and tags.
- Dynamic light/dark mode support for improved accessibility.

## Deployment

1. **Build the Application**:

   ```bash
   npm run build
   ```

2. **Deploy to Your Hosting Platform**:
   - Platforms like Vercel, Netlify, or AWS Amplify work well.
   - Add your environment variables to the hosting platform's settings.

## Acknowledgments

- [Supabase](https://supabase.io/) for providing the backend infrastructure.
- [ShadCN](https://shadcn.dev/) for elegant prebuilt components.
- [Tailwind CSS](https://tailwindcss.com/) for the customizable styling framework.
- Special thanks to the fashion enthusiasts who inspired StitchBlades!
