from app.main import app

config = {'DEBUG': True}

app.config.update(config)

if __name__ == "__main__":
    app.run()
