from flask import Blueprint, jsonify, request
from .models import load_data, load_model, predict_consumption 

main = Blueprint('main', __name__)


@main.route('/load-data/<region>', methods=['GET'])
def load_data_route(region):
    try:
        df = load_data(region)
        return jsonify(df.head(500).to_dict(orient='records'))
    except FileNotFoundError:
        return jsonify({"error": "Arquivo não encontrado"}), 404

@main.route('/predict/<region>', methods=['POST'])
def predict_route(region):
    try:
        model = load_model(region)
        data = request.get_json()
        hour = data.get("hour")
        day = data.get("day")
        month = data.get("month")
        weekday = data.get("weekday")
        isWeekend = data.get("isWeekend")
        prediction = predict_consumption(model, hour, day, month, weekday, isWeekend)
        return jsonify({"predicted_consumption": prediction})
    except FileNotFoundError:
        return jsonify({"error": "Modelo não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
