# ListingPal

Generate a full real-estate listing campaign in 90 seconds.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
1. **For local development:** Create `.env.local` file in project root:
```
ML_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYzExYjM5MGI0MzRmOTc3MGM0YWI2OGYzZTEyZTk4MDM2MjBjMjJkNTAyZDM1MDlhY2Q4Njk4MzViYTJjOWM0ZWFlYWEzYmMwYWUzYTllZmUiLCJpYXQiOjE3NTEzOTkxOTQuMzk5NDY3LCJuYmYiOjE3NTEzOTkxOTQuMzk5NDcsImV4cCI6NDkwNzA3Mjc5NC4zOTQ3MzMsInN1YiI6IjE2NDEyODMiLCJzY29wZXMiOltdfQ.exWqiwHaaZSohBkrmGDcewm3SCQAESEX0FKwR9CtqSvJIRSjNpCE3cx72coq7JHfI0t-UmvKjCfl28-0mCkugh7B2ElJLzFiqrl_bZaGspZ63xn_WrTMctlZ4O7EDEJwov-UaZyqYLjXfk1XLMsOcRJPfTKOFJtOlUTzP-Dh5iE56WzGRYfCQQSSvmmUsvbifVa6DPbQq1_U-VxlKVqaTqTRu5Pw95eZ0iVM-ZyRRpAJ-HnKDb-vrHIk7dc4dQBynDuTLJ1QPVemCbl2-YDeLlY4-TzRoVAbBIUxIJbMPF_3rjqi9bOsB5t752lBvhbCL-2tBR2ziKMZ_I7yHpZbwBEAX4yIKPkJ2MGbJDLzbDHk5jE7hiZKd9ns1ojEdRcA5J8mpDUvLUIEK7gC3EcQmZS2HFB88B4X341uEJeuQngvyOzokuqey4cnr9SEb0_-Xn4OGotXPoYTDXYObzgty9Mwg03mTq1JsHklpd1RV6rXpMBv2CykF-ICtFevzMPhRDAGIJjNC89K0CU51stk0Kcf6uLCDOU2VMRVc0RiNuQ1uIY_vXJFZ0j9Z2tKQ4iSn13vd4QdTKgj6j5yqndeRtl6dbVElVL8l15s2oYQIRtigkCb4vGYwgcps7rBJoE6PfjfqTVPJBug39kH7YP0QVFFYzFFkadluCelCXBAN6U
ML_GROUP_ID=
```

2. **For Netlify deployment:** Add environment variables in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add `ML_API_KEY` with the API key value above
   - Leave `ML_GROUP_ID` empty (groups are optional)

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