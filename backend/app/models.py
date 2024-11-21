import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import joblib

# Caminhos para os dados e modelos
DATA_PATH = './database/'
MODEL_PATH = './app/models/'

def load_data(region):
    """
    Carrega os dados CSV de uma região específica.
    """
    file_path = os.path.join(DATA_PATH, f"{region}_hourly.csv")
    try:
        df = pd.read_csv(file_path, parse_dates=['Datetime'])
        df = df.dropna()  # Remove valores nulos
        return df
    except FileNotFoundError:
        raise FileNotFoundError("Arquivo de dados não encontrado")

def load_model(region):
    """
    Carrega o modelo salvo para uma região específica.
    """
    model_filename = os.path.join(MODEL_PATH, f"{region}_model.joblib")
    try:
        model = joblib.load(model_filename)
        return model
    except FileNotFoundError:
        raise FileNotFoundError("Modelo não encontrado")
    
def predict_consumption(model, hour, day, month, weekday, is_weekend):
    """
    Faz uma previsão de consumo com base nas features temporais.
    """
    try:
        import numpy as np
        # Crie o array de entrada com 5 features
        features = np.array([[hour, day, month, weekday, is_weekend]])
        prediction = model.predict(features)
        return prediction[0]
    except Exception as e:
        print(f"Erro durante a predição: {e}")
        raise