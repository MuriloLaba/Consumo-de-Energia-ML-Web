# Consumo-de-Energia-ML-Web

Predição de Consumo de Energia

Este projeto tem como objetivo prever o consumo de energia elétrica em diferentes regiões utilizando o dataset "PJM Hourly Energy Consumption Data". O sistema é dividido em um backend em Python para treinamento e predição de modelos, e um frontend em Electron para visualização de dados e interações.

Descrição do Dataset

PJM Hourly Energy Consumption Data:
Este dataset contém dados horários de consumo de energia em megawatts (MW) de várias regiões operadas pelo PJM Interconnection LLC. O PJM é uma organização regional que gerencia a transmissão de energia em partes dos Estados Unidos. As regiões incluem:

- Delaware
- Illinois
- Indiana
- Kentucky
- Maryland
- Michigan
- New Jersey
- Ohio
- Pennsylvania
- Tennessee
- Virginia
- West Virginia
- Distrito de Columbia

Os dados variam entre as regiões e podem não estar disponíveis para todas as datas.

Tecnologias Utilizadas

Backend

- Python
- Flask e Flask-CORS: Para criar a API REST.
- Scikit-learn: Para dividir os dados e realizar ajustes de hiperparâmetros.
- LightGBM: Modelo de aprendizado de máquina utilizado para predições.
- Joblib: Para salvar os modelos treinados.
- Pandas: Para manipulação de dados.

Frontend

- Electron e Vite: Para criar uma aplicação desktop interativa.
- JavaScript e HTML/CSS: Para desenvolvimento da interface do usuário.

Funcionalidades

Backend
- Treinamento de Modelos:
  - Realiza o pré-processamento dos dados de cada região.
  - Treina modelos de regressão com otimização de hiperparâmetros utilizando GridSearchCV.
  - Salva os modelos no formato `.joblib` para uso posterior.
- API REST:
  - Disponibiliza endpoints para o frontend consultar predições de consumo.

Frontend
- Dashboard Interativo:
  - Seleção de regiões para visualizar dados e realizar predições.
  - Suporte a três tipos de gráficos: linhas, barras e área.
- Exibição de Dados:
  - Mostra o dataset original da região selecionada.
- Predição:
  - Permite realizar previsões de consumo para a região escolhida.

Como Executar o Projeto

Pré-requisitos
1. Backend:
   - Python 3.x e pip instalados.
   - Bibliotecas necessárias:
    --pandas
    --scikit-learn 
    --lightgbm 
    --joblib 
    --flask
    --flask-cors
2. Frontend:
   - Node.js e npm instalados.
   - Dependências do frontend:
     npm install

Passos para Execução

1. Treinar os Modelos:
   Antes de iniciar a API, execute o script de treinamento:
   python train_models.py

   Este script carrega os dados de cada região, treina os modelos e os salva no diretório `./app/models/`.

2. Iniciar o Backend:
   Execute a API Flask para disponibilizar os modelos ao frontend:

   python app.py

3. Iniciar o Frontend:

   No diretório do frontend, execute:
   npm run dev

Próximos Passos

- Incorporar dados climáticos ou socioeconômicos como features adicionais.
- Otimizar o pipeline para lidar com grandes volumes de dados.

Autor

Projeto desenvolvido por Murilo Laba.  
