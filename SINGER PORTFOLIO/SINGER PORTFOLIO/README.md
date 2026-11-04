# Sujata Gurav Singer Portfolio

This is a Flask website configured for deployment on Vercel.

## Project files

- `app.py` — Flask application and page routes
- `templates/` — the four site pages
- `static/` — styles, JavaScript, and images used by the pages
- `requirements.txt` — Python dependencies used by Vercel
- `vercel.json` — Vercel Python build and routing configuration

Keep the project files together in this folder when deploying. The `static/` and `templates/` folders are required by Flask.

## Run locally

```bash
python -m pip install -r requirements.txt
python app.py
```

Open `http://127.0.0.1:5000`.

## Deploy to Vercel

1. Import this project folder into a Vercel project, or run `vercel` from this folder.
2. Vercel detects the Python build from `vercel.json` and installs `requirements.txt`.
3. Deploy with `vercel --prod` when ready to publish.

The homepage is `/`; the other pages are `/explore`, `/learn`, and `/landing`.
