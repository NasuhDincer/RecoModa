import sys
import requests
import numpy as np
import json
#tf.version

# EDIT BELOW

#print(sys.argv[1])
print("here23423524534")
x = sys.argv[1]

#print(x[0])
data = json.loads(sys.argv[1].content)
print(data)
my_array = np.array(data)
print(my_array[0])

print("here343")


"""
post_id = str(sys.argv[1]) # replace with the ID of the post you want to update
url = f'http://localhost:5000/api/post/embed' # replace with the URL of your Node.js server and the endpoint for updating posts

response = requests.get(url) # make a GET request to the API endpoint

if response.status_code == 200:

    data = json.loads(response.content)
    my_array = np.array(data)
    print(my_array[0])

    print("here21234")


else:
    print('Error retrieving post:', response.text)

"""
