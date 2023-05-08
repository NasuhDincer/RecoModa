import sys
import json
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import requests
from random import seed
from random import randint
from random import shuffle


# PARAMETERS

mediaID = "6456e1e9ee62acda3c024e18"
favoritePostList = ["",""]
number_of_posts_to_show = 20


# THE ALGORITHM

seed(1)

shuffle(favoritePostList)

favorite_length = len(favoritePostList)
if favorite_length > number_of_posts_to_show:
    favoritePostList = favoritePostList[:number_of_posts_to_show]

for i in range(len(favoritePostList)):
    pass
    #here send a request for each favorite for 10/len(favoritePostList)
    

