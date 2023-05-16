import sys
import json
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import matplotlib.pyplot as plt
import requests
import base64
from io import BytesIO
from PIL import Image
import cv2
import tensorflow 
import keras
from keras import Model
from keras.applications import ResNet50
import keras.utils as image
from keras_applications.resnet50 import preprocess_input, decode_predictions
from keras.layers import GlobalMaxPooling2D
#tf.version

print(sys.argv[1])

post_id = str(sys.argv[1]) # replace with the ID of the post you want to update

url = f'http://localhost:5000/api/post/post/{post_id}' # replace with the URL of your Node.js server and the endpoint for updating posts

response = requests.get(url) # make a GET request to the API endpoint

if response.status_code == 200:
    post = response.json() # parse the response as JSON

    print('Post retrieved successfully:', post['mediaId'])

    imgalt = post['img']
    imgalt2 = imgalt[0]
    img_str64 = str(imgalt2['data'])

    ### OPENING THE IMAGE ###
    img_data = base64.b64decode(img_str64)
    img_bytesio = BytesIO(img_data)
    img = Image.open(img_bytesio)
    # If you want to see the image uncomment below line:
    #img.show()
    
    ### LOAD IMAGE ###
    def load_image(img, resized_fac = 0.1):
        img = image.img_to_array(img)
        w, h, _ = img.shape
        resized = cv2.resize(img, (int(h*resized_fac), int(w*resized_fac)), interpolation = cv2.INTER_AREA)
        return resized

    img_width, img_height, _ = 224, 224, 3 #load_image(df.iloc[0].image).shape

    ### RESNET MODEL ###
    # Pre-Trained Model
    base_model = ResNet50(weights='imagenet', include_top=False, input_shape = (img_width, img_height, 3))
    base_model.trainable = False

    # Add Layer Embedding
    model = keras.Sequential([base_model, GlobalMaxPooling2D()])
    #print( model.summary() )

    ### EMBEDDING ###
    def get_embedding(model, img):
        # Reshape
        img = image.load_img(img, target_size=(img_width, img_height))
        # img to Array
        x   = image.img_to_array(img)
        # Expand Dim (1, w, h)
        x   = np.expand_dims(x, axis=0)
        # Pre process Input
        x   = preprocess_input(x)
        return model.predict(x).reshape(-1)
    
    emb = get_embedding(model, img_bytesio)
    embdoublejson = list(emb.astype(np.float64))

    url = f'http://localhost:5000/api/post/addEmbed/{post_id}'
    data = {'embedArray': embdoublejson}

    # Make the HTTP request
    response = requests.put(url, json=data)
    #print(response)

    if response.status_code == 200:
       updated_post = response.json()
       #print(f"Post updated: {updated_post}")
    else:
       print(f"Error updating post: {response.content}")


else:
    print('Error retrieving post:', response.text)
