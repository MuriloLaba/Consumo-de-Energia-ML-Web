import pandas as pd
import os
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import lightgbm as lgb
from joblib import dump

# Caminhos para os dados e para salvar os modelos
DATA_PATH = './database/'
MODEL_PATH = './app/models/'

# Função para carregar dados
def load_data(region):
    file_path = os.path.join(DATA_PATH, f"{region}_hourly.csv")
    
    if not os.path.exists(file_path):
        print(f"Arquivo para {region} não encontrado em {file_path}. Pulando essa região.")
        return None, None
    
    df = pd.read_csv(file_path)
    if 'Datetime' not in df.columns:
        print(f"Coluna 'Datetime' ausente no arquivo {region}_hourly.csv. Pulando essa região.")
        return None, None

    df['Datetime'] = pd.to_datetime(df['Datetime'], errors='coerce')
    df = df.dropna()
    
    consumo_coluna = [col for col in df.columns if col != 'Datetime'][0]
    return df, consumo_coluna

# Função para treinar e salvar modelo
def train_and_save_model(region):
    df, consumo_coluna = load_data(region)
    
    if df is None or consumo_coluna is None:
        print(f"Modelo para {region} não foi treinado devido a problemas no arquivo.")
        return

    # Criar features adicionais
    df['hour'] = df['Datetime'].dt.hour
    df['day'] = df['Datetime'].dt.day
    df['month'] = df['Datetime'].dt.month
    df['weekday'] = df['Datetime'].dt.weekday  # Segunda = 0, Domingo = 6
    df['is_weekend'] = df['weekday'].apply(lambda x: 1 if x >= 5 else 0)  # Fim de semana
    
    X = df[['hour', 'day', 'month', 'weekday', 'is_weekend']]
    y = df[consumo_coluna]

    # Dividir os dados
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Modelo LightGBM
    model = lgb.LGBMRegressor(random_state=42)
    
    # Hiperparâmetros para ajuste (opcional)
    param_grid = {
        'n_estimators': [100, 200, 500],
        'learning_rate': [0.01, 0.1, 0.2],
        'max_depth': [3, 5, 7]
    }
    
    # Grid Search para encontrar os melhores parâmetros
    grid_search = GridSearchCV(model, param_grid, cv=5, scoring='r2', n_jobs=-1)
    grid_search.fit(X_train, y_train)
    
    # Melhor modelo encontrado
    best_model = grid_search.best_estimator_
    print(f"Melhores parâmetros para {region}: {grid_search.best_params_}")
    
    # Avaliar modelo no conjunto de teste
    y_pred = best_model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print(f"Resultados para {region}:")
    print(f"  - MSE: {mse:.4f}")
    print(f"  - MAE: {mae:.4f}")
    print(f"  - R²: {r2:.4f}")

    # Salvar modelo
    if not os.path.exists(MODEL_PATH):
        os.makedirs(MODEL_PATH)

    model_filename = os.path.join(MODEL_PATH, f"{region}_model.joblib")
    dump(best_model, model_filename)
    print(f"Modelo para {region} salvo com sucesso em {model_filename}")

# Lista das regiões para treinar e salvar modelos
regions = ['AEP', 'COMED', 'DAYTON', 'DEOK', 'DOM', 'DUQ', 'EKPC', 'FE', 'NI', 'PJM_Load']

for region in regions:
    train_and_save_model(region)
