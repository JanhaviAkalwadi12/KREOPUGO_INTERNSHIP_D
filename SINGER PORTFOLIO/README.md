# Sujata Gurav – Singer Portfolio

## Project Structure
```
SINGER PORTFOLIO/
├── app.py                  # Flask application (main entry)
├── requirements.txt        # Python dependencies
├── vercel.json             # Vercel deployment config
├── .env.example            # Environment variable template
├── static/
│   ├── style.css           # All styles (enhanced)
│   ├── script.js           # All interactivity
│   ├── logo.jpeg
│   ├── about.jpeg
│   ├── image1.jpeg
│   └── gal1–13.jpeg
└── templates/
    ├── index.html          # Main portfolio page
    ├── explore.html        # Biography / Explore More page
    ├── learn.html          # Achievements detail page
    └── landing.html        # Landing splash page
```

## Features
- Intro animation with Skip Intro button + 3D floating elements
- Responsive navigation with working menu toggle
- Artist Booking form → opens Outlook/email client with all details pre-filled
- Leave a Message form → opens email client
- Automatic PDF download after booking (jsPDF, no backend)
- Interactive booking calendar with time slot selection
- AI Chatbot (floating, FAQ-based, no API key needed)
- YouTube playlist cards in Albums section
- Enhanced footer with glass/3D effects
- Back-to-top button

## Running Locally
```bash
pip install -r requirements.txt
python app.py
# Visit http://localhost:5000
```

## Deploying to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. From the project folder: `vercel`
3. Set environment variables in Vercel dashboard (see `.env.example`)
4. Deploy: `vercel --prod`
