# StudySnitch Extension Proxy Server
# This server securely handles OpenAI API calls for the Chrome extension

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow requests from Chrome extension

# Verify API key is loaded
if not os.getenv('OPENAI_API_KEY'):
    print("Warning: OPENAI_API_KEY not found in environment variables")

@app.route('/check-tab', methods=['POST'])
def check_tab_content():
    """
    Securely check if tab content is study-related to the current subject
    Extension sends tab title and current study subject, server returns analysis
    """
    try:
        data = request.get_json()
        tab_title = data.get('title', '')
        study_subject = data.get('subject', 'Linear Algebra')  # Default fallback
        study_details = data.get('details', '')
        
        if not tab_title:
            return jsonify({'error': 'No tab title provided'}), 400
        
        # Rate limiting could be added here
        # User authentication could be added here
        
        # Create a more specific prompt based on the study subject
        prompt = f"""
        The user is currently studying: {study_subject}
        {f"Specific details: {study_details}" if study_details else ""}
        
        Given this tab title: "{tab_title}"
        
        Is this tab related to their current study subject ({study_subject})?
        
        Return "yes" if the tab is related to {study_subject} or general studying/education.
        Return "no" if the tab is clearly unrelated (social media, entertainment, shopping, etc.).
        
        Only return "yes" or "no" - nothing else.
        """
        
        # Create OpenAI client
        client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        
        response = client.completions.create(
            model="text-davinci-003",
            prompt=prompt,
            temperature=0,
            max_tokens=10
        )
        
        result = response.choices[0].text.strip().lower()
        is_study_related = 'yes' in result
        
        print(f"Tab: '{tab_title}' | Subject: '{study_subject}' | Related: {is_study_related}")
        
        return jsonify({
            'is_study_related': is_study_related,
            'subject': study_subject,
            'confidence': 'high'
        })
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Analysis failed'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'StudySnitch Proxy'})

@app.route('/stats', methods=['GET'])
def get_statistics():
    """Get study statistics from storage"""
    try:
        # Import storage system
        from simple_storage import storage as r
        
        # Get distraction count from storage
        bad_count = r.get('bad')
        if bad_count is None:
            bad_count = 0
        else:
            bad_count = int(str(bad_count))
        
        # Calculate some basic stats (in real app, would be more sophisticated)
        stats = {
            'attentionTime': max(0, 120 - (bad_count * 5)),  # Rough calculation
            'sessionCount': 1,  # Could track this separately
            'distractionCount': bad_count,
            'efficiencyRate': max(50, 100 - (bad_count * 3))  # Efficiency based on distractions
        }
        
        return jsonify({
            'success': True,
            'stats': stats
        })
        
    except Exception as e:
        print(f"Stats error: {e}")
        return jsonify({
            'success': False,
            'error': 'Could not load statistics'
        }), 500

if __name__ == '__main__':
    print("🔒 Starting StudySnitch secure proxy server...")
    print("🌐 Extension will connect to this server instead of directly to OpenAI")
    app.run(host='0.0.0.0', port=5001, debug=False)
