import time
import sys
import requests
import json
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics.pairwise import pairwise_distances

# Hakan's PC, running time: 3 seconds in avg. except imports, with imports 5 seconds in avg.

#tic = time.perf_counter()
post_id = str(sys.argv[1])
count = int(str(sys.argv[2]))

try:
    url = f'http://localhost:5000/api/post/' # replace with the URL of your Node.js server and the endpoint for updating posts
    response = requests.get(url) # make a GET request to the API endpoint # 2.49
    posts = response.json() # parse the response as JSON
    df = pd.DataFrame([[post['_id'], post['embedArray']] for post in posts], columns=['_id', 'embedArray']) # 0.01
    """
    df_emb = df['embedArray']
    # df_emb = pd.DataFrame([[post['embedArray']] for post in posts], columns=['embedArray'])
    df_embeds = df_emb.apply(pd.Series)
    """
    df_embeds = pd.DataFrame(df['embedArray'].values.tolist()) # 0.05
    
    
except json.JSONDecodeError as e:
    print(f"Error parsing JSON string: {e}")
except Exception as e:
    print(f"Error: {e}")

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