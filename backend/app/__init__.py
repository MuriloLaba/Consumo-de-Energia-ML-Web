from flask import Flask
from flask_cors import CORS
from .config import Config

def create_app():
    # Criação da aplicação Flask
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configuração de CORS
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    # Registro do blueprint das rotas
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
