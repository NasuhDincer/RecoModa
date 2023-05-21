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
#from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
from keras.layers import GlobalMaxPooling2D
import time
from sklearn.linear_model import LinearRegression
from sklearn.metrics.pairwise import pairwise_distances


#tf.version

post_id = str(sys.argv[1]) # replace with the ID of the post you want to update
count = int(str(sys.argv[2]))
url = f'http://localhost:5000/api/post/post/{post_id}' # replace with the URL of your Node.js server and the endpoint for updating posts

response = requests.get(url) # make a GET request to the API endpoint

if response.status_code == 200:
    post = response.json() # parse the response as JSON

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

    ### EMBEDDING ###
    def get_embedding(model, img):
        # Reshape
        img = image.load_img(img, target_size=(img_width, img_height))
        # img to Array
        x   = image.img_to_array(img)
        # Expand Dim (1, w, h)
        x   = np.expand_dims(x, axis=0)
        # Pre process Input
        x   = tensorflow.keras.applications.resnet50.preprocess_input(x)
        return model.predict(x).reshape(-1)
    
    emb = get_embedding(model, img_bytesio)
    embdoublejson = list(emb.astype(np.float64))
    """
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
    """

    
    df_embeds = emb
        
    url = f'http://localhost:5000/api/post/' # replace with the URL of your Node.js server and the endpoint for updating posts
    response = requests.get(url) # make a GET request to the API endpoint # 2.49
    posts = response.json() # parse the response as JSON
    df = pd.DataFrame([[post['_id'], post['embedArray']] for post in posts], columns=['_id', 'embedArray']) # 0.01

    df_ids = df['_id'] # 0.00001
    idforsim = post_id
    rowno = df_ids[df_ids == post_id].index[0] # 0.0003


    # Calcule DIstance Matriz
    cosine_sim = 1-pairwise_distances(df_embeds, metric='cosine') #0.0017
    cosine_sim[:4, :4]

    indices = pd.Series(range(len(df)), index=df.index) # 0.0001



    # Function that get movie recommendations based on the cosine similarity score of movie genres
    def get_recommender(idx, df, top_n = 5):
        sim_idx    = indices[idx]
        sim_scores = list(enumerate(cosine_sim[sim_idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:top_n+1]
        idx_rec    = [i[0] for i in sim_scores]
        idx_sim    = [i[1] for i in sim_scores]
        
        return indices.iloc[idx_rec].index, idx_sim


    idx_rec, idx_sim = get_recommender(rowno, df, top_n = count) #  0.00014

    # Wrapping answers
    answerobject = []
    for i in range(count): # 0.0000000167
        answerobject.append(df_ids[idx_rec[i]])
    #toc = time.perf_counter()
    #print("Line 20: ", toc-tic)
    print(answerobject)



else:
    print('Error retrieving post:', response.text)
