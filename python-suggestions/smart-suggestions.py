from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # Allow frontend to call this API

@app.route("/suggestions", methods=["POST"])
def suggestions():
    """
    Expects JSON body: [{amount: number, category: string, date: string}]
    Returns smart suggestions based on last 30 days of expenses
    """
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    df = pd.DataFrame(data)
    if df.empty:
        return jsonify([])

    df['date'] = pd.to_datetime(df['date'])

    # Filter last 30 days
    last_30_days = datetime.now() - timedelta(days=30)
    df = df[df['date'] >= last_30_days]

    # Group by category
    category_sum = df.groupby('category')['amount'].sum().sort_values(ascending=False)

    suggestions_list = []
    for category, total in category_sum.items():
        if total > 1000:
            suggestions_list.append(f"You're spending a lot on {category}. Try to reduce it.")
        elif total > 500:
            suggestions_list.append(f"Your {category} spending is moderate. Keep an eye on it.")

    return jsonify(suggestions_list)

if __name__ == "__main__":
    app.run(port=5001, debug=True)
