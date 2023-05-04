import sys
import requests
import numpy as np
import json

arr = sys.argv[1]


url = f'http://localhost:5000/api/post/' # replace with the URL of your Node.js server and the endpoint for updating posts

response = requests.get(url) # make a GET request to the API endpoint
posts = response.json() # parse the response as JSON
arr = [[post['_id'], post['embedArray']] for post in posts]
arr_str = json.dumps(arr)

#data = json.loads(response.content)
#my_array = np.array(data)
print(arr_str)
print("here")




"""
id: 63e385399b56aeb2a07bec6f

Find similar of id: 63e385399b56aeb2a07bec6f

numpy2d new numpy array
for i in range(len(my_array)):
    numpy2d add -> myarray[i][1]
numpy2d is ready to use.

"""

