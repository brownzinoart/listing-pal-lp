# ListingPal

Generate a full real-estate listing campaign in 90 seconds.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
1. Copy `.env` to your project root (already created)
2. Get your MailerLite API key from: https://app.mailerlite.com/integrations/api
3. Get your Group ID from your MailerLite groups section
4. Update the `.env` file with your actual values:
```
ML_API_KEY=your_actual_api_key
ML_GROUP_ID=your_actual_group_id
```

### 3. Deploy to Netlify
- Connect your repository to Netlify
- Add the environment variables in Netlify dashboard under Site settings > Environment variables
- The site will automatically build and deploy

## Fixes Applied

### ✅ 502 Bad Gateway Error
- Added missing `node-fetch` dependency
- Created `.env` template for MailerLite API credentials
- Added Netlify configuration

### ✅ Content Security Policy (CSP) Violations  
- Removed all inline `style` attributes
- Moved styles to CSS classes
- Added proper CSP meta tag and Netlify headers

### ✅ Cross-origin Frame Issues
- Configured CSP to allow YouTube and Calendly embeds
- Added proper frame-src directives

### ✅ Permissions Policy Violation
- Added restrictive permissions policy to block unwanted features
- Configured payment permissions properly

## Development

```bash
npm run dev
```

## Production

Deploy to Netlify with the provided `netlify.toml` configuration. 