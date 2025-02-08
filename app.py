from flask import Flask, render_template
app = Flask(__name__)

# TODO: Zet applicatie op om web applicatie te worden, het is nu alleen een website

# Root, laat camera zien
@app.route('/')
def index():
    return render_template('index.html') 

# Laat test vraag zien
@app.route('/test-vraag')
def new_directory():
    return render_template("vraag.html")

# Laad app in op netwerk en in debug mode
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
