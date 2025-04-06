from flask import Flask, jsonify 
import os
import requests
API_KEY = "88a1069d6468d3f7827919e0bb483e75ed87268ebaa6ea556dea8a7150db12a1"
API_URL = "https://api.together.xyz/v1/chat/completions"

def chat_with_gpt(prompt):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "mistralai/Mixtral-8x7B-Instruct-v0.1",  # You can change the model here
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    try:
        response = requests.post(API_URL, headers=headers, json=data)
        response.raise_for_status()
        reply = response.json()["choices"][0]["message"]["content"].strip()
        return reply
    except Exception as e:
        return f"Error: {e}"
    
app = Flask(__name__) 
@app.route('/') 
def hello_world(): 
    return 'Hello, World!' 

@app.route('/reply/<string:query>')
def reply(query):
    if query.lower() in ["quit", "exit", "bye"]:
            return "bye"
    else:
        response = chat_with_gpt(query)
        return response
    
if __name__ == "__main__":
    app.run(debug=True)