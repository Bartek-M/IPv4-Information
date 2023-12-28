from flask import Flask, render_template

ADDR = "127.0.0.1"
PORT = 5000

app = Flask("main", template_folder="./static/html")


@app.route("/")
def main():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(ADDR, PORT)
