import sys
import json
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import matplotlib.pyplot as plt
import os # accessing directory structure
import requests
import base64
from io import BytesIO
from PIL import Image
"""
import tensorflow as tf
import keras
from keras import Model
from keras.applications.resnet50 import ResNet50
from keras.preprocessing import image
from keras.applications.resnet50 import preprocess_input, decode_predictions
from keras.layers import GlobalMaxPooling2D
tf.version
"""

print(sys.argv[1])

post_id = str(sys.argv[1]) # replace with the ID of the post you want to update

url = f'http://localhost:5000/api/post/{post_id}' # replace with the URL of your Node.js server and the endpoint for updating posts

response = requests.get(url) # make a GET request to the API endpoint

if response.status_code == 200:
    post = response.json() # parse the response as JSON

    print('Post retrieved successfully:', post['mediaId'])

    imgalt = post['img']
    imgalt2 = imgalt[0]
    img_str64 = str(imgalt2['data'])

    ### OPENING THE IMAGE:
    img_data = base64.b64decode(img_str64)
    img = Image.open(BytesIO(img_data))
    img.show() 
    print(type(img_str64))
    print(type(img_data))

    """
    ### RESNET MODEL:
    img_width, imgheight,  = 224, 224, 3 #load_image(df.iloc[0].image).shape

    # Pre-Trained Model
    base_model = ResNet50(weights='imagenet', 
                        include_top=False, 
                        input_shape = (img_width, img_height, 3))
    base_model.trainable = False

    # Add Layer Embedding
    model = keras.Sequential([
        base_model,
        GlobalMaxPooling2D()
    ])

    model.summary()
    """

else:
    print('Error retrieving post:', response.text)
