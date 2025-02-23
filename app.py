from flask import Flask, render_template, redirect
app = Flask(__name__)

# TODO: Zet applicatie op om web applicatie te worden, het is nu alleen een website
# TODO: Maak QR Scan process lokaal
# TODO: Maak unique users
# TODO: Maak punten systeem voor goede antwoorden
# TODO: Voeg echte inhoud toe (vragen, ui, etc.)
# TODO: Maak kaart voor alle bord locaties

# TODO (optioneel): Maak systeem om via een UI bord locaties/vragen toe te voegen, misschien met een QR Code generator erbij (Zodat dit in meerdere locaties toegepast kan worden)
# TODO (optioneel): Room systeem, groep van 4-6 kan dan via een code in een room gaan en tegen elkaar gaan door middel van score systeem

# NOTE: Beargumenteer in de documentatie waarom/of flask de beste keuze is

# Root, laat camera zien
@app.route('/')
def index():
    return render_template('index.html') 

# Laat test vraag zien
@app.route('/test-vraag-1')
def test_vraag_1():
    return render_template("vraag1.html")

@app.route('/test-vraag-2')
def test_vraag_2():
    return render_template("vraag2.html")

# Redirect elke ongeldige directory naar de root
@app.errorhandler(404)
def redirect_to_root(e):
    return redirect("/")

# Laad app in op netwerk en in debug mode
# host='0.0.0.0' maakt de app toegangkelijk voor iedereen op het netwerk, gebruik niet in openbare ruimtes
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
