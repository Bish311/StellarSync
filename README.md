# StellarSync

[![Netlify Status](https://api.netlify.com/api/v1/badges/593f9b54-8f2d-46fe-a3f0-afa06c62c4d3/deploy-status)](https://app.netlify.com/sites/stellarsync/deploys)

[Click here to visit the live site](https://stellarsync.netlify.app/)

StellarSync is a modern, interactive web application that provides comprehensive information about current and upcoming space missions. Built with React and Vite, this platform aims to make space exploration data accessible to enthusiasts, students, and curious minds.

## Features

- **Mission Tracking**: View detailed information about current and upcoming space missions from various agencies around the world.
- **Mission Details**: Explore in-depth information about each mission including launch dates, agencies, rocket specifications, and mission status.
- **Astronomy Picture of the Day**: Discover NASA's Astronomy Picture of the Day directly on the homepage.
- **Theme Toggling**: Enjoy both light and dark mode themes for comfortable viewing.
- **Responsive Design**: Access the application seamlessly on any device - desktop, tablet, or mobile.
- **Real-time Data**: Fetch data from NASA API and The Space Devs' Launch Library API.

## Technologies Used

- **Frontend**: React.js, React Router, CSS3, JavaScript ES6+
- **Build Tool**: Vite
- **APIs**: 
  - NASA API (APOD, Image Library, EPIC)
  - Launch Library API (Space missions data)
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js (version 16.x or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Bish311/StellarSync.git
   cd StellarSync
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with your API keys (optional):
   ```
   VITE_NASA_API_KEY=your_nasa_api_key
   VITE_LAUNCH_LIBRARY_API_URL=https://lldev.thespacedevs.com/2.2.0
   ```
   
   Note: The app will work with demo keys if you don't provide your own.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

The application is configured for easy deployment to Netlify:

1. Connect your GitHub repository to Netlify
2. Use the following build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables in the Netlify dashboard

### Important for Deployment
For proper routing in production, make sure a `_redirects` file exists in the `public` directory with the following content:
```
/*    /index.html   200
```

## Project Structure

```
space-mission-tracker/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── pages/          # Page components
│   ├── services/       # API service functions
│   ├── styles/         # CSS stylesheets
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── .env                # Environment variables
└── package.json        # Project dependencies
```

## Features in Development

- Launch schedule calendar view
- User notifications for upcoming launches
- Detailed agency profiles
- Additional space data visualizations

## Acknowledgements

- [NASA API](https://api.nasa.gov/) for space imagery and data
- [The Space Devs' Launch Library API](https://thespacedevs.com/llapi) for space mission data
- [Vite](https://vitejs.dev/) for the build tool and development environment

---

Created with 💙 for space exploration
