import sys
import requests
print(sys.argv[1])

post_id = str(sys.argv[1]) # replace with the ID of the post you want to update

url = f'http://localhost:5000/api/post/post/{post_id}' # replace with the URL of your Node.js server and the endpoint for updating posts

response = requests.get(url) # make a GET request to the API endpoint

if response.status_code == 200:
    post = response.json() # parse the response as JSON

    print('Post retrieved successfully:', post['mediaId'])
    emb = [88,88,98]
    # Define the endpoint URL and data
    url = f'http://localhost:5000/api/post/addEmbed/{post_id}'
    data = {'embedArray': emb}

    # Make the HTTP request
    response = requests.put(url, json=data)
    print(response)

    # Check the response status code and content
    if response.status_code == 200:
       updated_post = response.json()
       print(f"Post updated: {updated_post}")
    else:
       print(f"Error updating post: {response.content}")