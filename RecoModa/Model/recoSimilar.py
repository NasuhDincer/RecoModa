import time
import sys
import requests
import json
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics.pairwise import pairwise_distances


post_id = str(sys.argv[1])
count = int(str(sys.argv[2]))

try:
    #tic = time.perf_counter()
    url = f'http://localhost:5000/api/post/' # replace with the URL of your Node.js server and the endpoint for updating posts
    response = requests.get(url) # make a GET request to the API endpoint
    #toc = time.perf_counter()
    posts = response.json() # parse the response as JSON
    df = pd.DataFrame([[post['_id'], post['embedArray']] for post in posts], columns=['_id', 'embedArray'])
    """
    df_emb = df['embedArray']
    # df_emb = pd.DataFrame([[post['embedArray']] for post in posts], columns=['embedArray'])
    df_embeds = df_emb.apply(pd.Series)
    """
    df_embeds = pd.DataFrame(df['embedArray'].values.tolist())
except json.JSONDecodeError as e:
    print(f"Error parsing JSON string: {e}")
except Exception as e:
    print(f"Error: {e}")


df_ids = df['_id']
idforsim = post_id

rowno = -1
for i in range(len(df_ids)):
    rowno = df_ids[df_ids == post_id].index[0]
    """
    if idforsim == df_ids[i]:
        rowno = i
    """

# Calcule DIstance Matriz
cosine_sim = 1-pairwise_distances(df_embeds, metric='cosine')
cosine_sim[:4, :4]

indices = pd.Series(range(len(df)), index=df.index)

# Function that get movie recommendations based on the cosine similarity score of movie genres
def get_recommender(idx, df, top_n = 5):
    sim_idx    = indices[idx]
    sim_scores = list(enumerate(cosine_sim[sim_idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:top_n+1]
    idx_rec    = [i[0] for i in sim_scores]
    idx_sim    = [i[1] for i in sim_scores]
    
    return indices.iloc[idx_rec].index, idx_sim

idx_rec, idx_sim = get_recommender(rowno, df, top_n = count)

# Wrapping answers
answerobject = []
for i in range(count):
    answerobject.append(df_ids[idx_rec[i]])
print(answerobject)

#print(toc - tic)
