from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# In-memory data store (replace with database in production)
items = [
    {"id": 1, "name": "Item 1", "description": "First item", "created_at": datetime.now().isoformat()},
    {"id": 2, "name": "Item 2", "description": "Second item", "created_at": datetime.now().isoformat()},
]
next_id = 3


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "flask-backend",
        "timestamp": datetime.now().isoformat()
    }), 200


@app.route('/api/items', methods=['GET'])
def get_items():
    """Get all items"""
    return jsonify(items), 200


@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    """Get a specific item by ID"""
    item = next((item for item in items if item["id"] == item_id), None)
    if item is None:
        return jsonify({"error": "Item not found"}), 404
    return jsonify(item), 200


@app.route('/api/items', methods=['POST'])
def create_item():
    """Create a new item"""
    global next_id
    data = request.get_json()
    
    if not data or 'name' not in data:
        return jsonify({"error": "Name is required"}), 400
    
    new_item = {
        "id": next_id,
        "name": data['name'],
        "description": data.get('description', ''),
        "created_at": datetime.now().isoformat()
    }
    items.append(new_item)
    next_id += 1
    
    return jsonify(new_item), 201


@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    """Delete an item by ID"""
    global items
    item = next((item for item in items if item["id"] == item_id), None)
    if item is None:
        return jsonify({"error": "Item not found"}), 404
    
    items = [item for item in items if item["id"] != item_id]
    return jsonify({"message": "Item deleted successfully"}), 200


@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
