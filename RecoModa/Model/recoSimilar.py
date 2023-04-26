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
import tensorflow as tf
import keras
from keras import Model
from keras.applications import ResNet50
import keras.utils as image
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
from keras.layers import GlobalMaxPooling2D
#tf.version

# EDIT BELOW

print(sys.argv[1])

post_id = str(sys.argv[1]) # replace with the ID of the post you want to update

url = f'http://localhost:5000/api/post/{post_id}' # replace with the URL of your Node.js server and the endpoint for updating posts

response = requests.get(url) # make a GET request to the API endpoint

if response.status_code == 200:
    post = response.json() # parse the response as JSON

    print('Post retrieved successfully:', post['mediaId'])


else:
    print('Error retrieving post:', response.text)

