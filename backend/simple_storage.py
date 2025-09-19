# Simple in-memory storage to replace Redis for development
import json
import os

class SimpleStorage:
    def __init__(self, filename='storage.json'):
        self.filename = filename
        self.data = {}
        self.load()
    
    def load(self):
        if os.path.exists(self.filename):
            try:
                with open(self.filename, 'r') as f:
                    self.data = json.load(f)
            except:
                self.data = {}
    
    def save(self):
        with open(self.filename, 'w') as f:
            json.dump(self.data, f)
    
    def get(self, key):
        return self.data.get(key)
    
    def set(self, key, value):
        self.data[key] = value
        self.save()
        return True

# Create global storage instance
storage = SimpleStorage()

if __name__ == "__main__":
    # Initialize with default values
    storage.set('bad', '0')
    print(f"Initialized storage with bad count: {storage.get('bad')}")
    print("Simple storage server running...")
