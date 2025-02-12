# Community Impact Platform

A transparent platform for community-driven projects that enables users to create, fund, and track local initiatives. Built with React and Firebase, this platform focuses on real-time fund tracking and impact visualization.

## Features

### Project Creation
- Create detailed project proposals with multimedia support
- Set funding goals and deadlines
- Add photos and videos to communicate project vision
- Define project categories and locations

### Project Contribution
- Browse projects by location, category, or urgency
- Secure payment processing via Stripe/PayPal
- Anonymous or public donation options
- Real-time contribution tracking

### Fund Tracking
- Live updates on funds raised
- Contribution visualization through graphs
- Milestone alerts (50%, 75%, 100% funded)
- Detailed fund allocation breakdowns

### Impact Visualization
- Project progress documentation
- Live impact map of completed projects
- Photo and video progress updates
- Fund allocation transparency

### Community Features
- Contributor recognition system
- Project comments and updates
- Achievement badges
- Community leaderboard

## Tech Stack

- **Frontend**: React.js
- **Backend**: Firebase
- **Database**: Cloud Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Payment Processing**: Stripe/PayPal

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Stripe/PayPal developer account

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/community-impact-platform.git
cd community-impact-platform
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root directory
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_key
```

4. Start the development server
```
npm start
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── services/          # Firebase and API services
├── contexts/          # React contexts
├── hooks/             # Custom hooks
├── utils/             # Helper functions
├── assets/            # Static assets
└── styles/            # Global styles
```
