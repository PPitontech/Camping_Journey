# Camping Journey Equipaments MX

Premium outdoor equipment dropshipping store for the Mexican market, focusing on minimalist camping gear with high margins and quality.

## Project Overview

Camping Journey is an international dropshipping business focused on outdoor and camping equipment, targeting the Mexican market initially. The project emphasizes advanced automation, robust digital security, creative branding, rapid scalability, and minimal initial investment.

### Key Features

- **Premium Outdoor Products**: Lightweight, compact, high-margin camping gear
- **Dark Mode Support**: Full dark mode implementation with user preference storage
- **Multilingual Ready**: Initially in English with planned expansion to Spanish
- **Modern UI/UX**: Cinematic homepage with emotional storytelling and short videos
- **Secure Transactions**: Integration with Stripe, PayPal, and Mercado Pago
- **Community Building**: Exclusive access platform via Discord/Telegram

## Technology Stack

- **Backend**: Node.js with Express and TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT with bcrypt for password hashing
- **Security**: Helmet for HTTP headers, CORS protection
- **Frontend**: HTML5, CSS3, JavaScript with responsive design
- **Deployment**: Prepared for cloud deployment with environment configuration

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas connection)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/camping_journey_equipaments_mx.git
cd camping_journey_equipaments_mx
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/camping_journey
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=90d
COOKIE_EXPIRES_IN=90
```

4. Build the TypeScript code:
```bash
npm run build
```

5. Start the development server:
```bash
npm run dev
```

The server will be running at http://localhost:3000

## Development Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build TypeScript to JavaScript
- `npm start`: Run the production server
- `npm run lint`: Run ESLint for code quality

## Business Strategy

- **Target Market**: Urban Mexican residents (25-45 years) interested in camping and minimalist outdoor activities
- **Initial Ad Budget**: 1,000 MXN/week focused on Instagram Reels, Stories, and TikTok
- **KPI Monitoring**: CPA, ROAS, average ticket, conversion rate via Wind Dashboard
- **Reinvestment Strategy**: Aggressive weekly profit reinvestment to reach US$1,000/day sales

## Project Structure

```
camping_journey_equipaments_mx/
├── dist/                   # Compiled TypeScript output
├── node_modules/           # Dependencies
├── public/                 # Static assets
│   ├── css/                # Stylesheets
│   ├── images/             # Image assets
│   ├── js/                 # Client-side JavaScript
│   └── videos/             # Video content
├── src/                    # Source code
│   ├── app.ts              # Express application setup
│   ├── server.ts           # Server entry point
│   ├── components/         # Reusable components
│   ├── data/               # Data models and schemas
│   └── messages/           # Internationalization files
├── .env                    # Environment variables
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## License

This project is licensed under the ISC License.

## Contact

For inquiries, please contact: info@campingjourney.mx
