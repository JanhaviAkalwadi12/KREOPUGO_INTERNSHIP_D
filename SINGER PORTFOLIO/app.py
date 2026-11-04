import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder='static', static_url_path='/static')


# ── Explicit static file serving (required for Vercel) ──────────────────────
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(app.root_path, 'static'), filename)


# ── Page routes ─────────────────────────────────────────────────────────────
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/explore')
def explore():
    return render_template('explore.html')


@app.route('/learn')
def learn():
    return render_template('learn.html')


@app.route('/landing')
def landing():
    return render_template('landing.html')


if __name__ == '__main__':
    app.run(debug=True)
