import sys
import requests
import numpy as np
import json
#tf.version

# EDIT BELOW
import sys
import json

try:
    # Get the arr argument as a string and parse it into a list
    arr_str = sys.argv[1]
    arr = json.loads(arr_str)
    print("Beforeaa")
    # Now you can use the arr list in your Python code
    print(type(arr))
    for post in arr:
        print(post)  # <-- print each element of the arr list
        post_id, embed_array = post
        print(f"Post ID: {post_id}")
        print(f"Embed Array: {embed_array}")
        
except json.JSONDecodeError as e:
    print(f"Error parsing JSON string: {e}")
except Exception as e:
    print(f"Error: {e}")


my_array = np.array(arr)
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
