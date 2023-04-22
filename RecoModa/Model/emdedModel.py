import sys
import requests
import json

print(sys.argv[1])

post_id = '644412e3c9524e97da29e75d' # replace with the ID of the post you want to update

url = f'http://localhost:5000/api/post/{post_id}' # replace with the URL of your Node.js server and the endpoint for updating posts

response = requests.get(url) # make a GET request to the API endpoint

if response.status_code == 200:
    post = response.json() # parse the response as JSON
    
    print('Post retrieved successfully:', post['mediaId'])
else:
    print('Error retrieving post:', response.text)

