from datetime import datetime
import json
import os

with open("../updatedMusicData.txt", "r", encoding="utf-8") as f:
    updatedMusic = [eval(x) for x in f.readlines()]
    f.close()

with open("../musicData.txt", "r", encoding="utf-8") as f:
    currentMusic = [eval(x) for x in f.readlines()]
    f.close()

# calculateRecentListen
for index, tag in enumerate(currentMusic):
    updatedTag = updatedMusic[index]
    updatedTag['recentListen'] = (updatedTag['playCount'] > tag['playCount'])

# calculate rankings
with open("titleRanking.csv", "r", encoding="utf-8") as f:
    rankings = [x.strip('\n') for x in f.readlines()]
    f.close()

# assemble trackData
outTracks = []
for tag in updatedMusic:
    track = {'spotifyURI': tag['trackID'],
             'type': 0,
             'rating': tag['rating'],
             'ranking': rankings.index(tag['title'] + "_" + tag['artists'][0]) + 1,
             'artist': ", ".join(tag['artists']),
             'genre': ", ".join(tag['genres']),
             'title': tag['title'],
             'playCount': tag['playCount'],
             'spotifyImage': tag['imageID'],
             'recentListen': tag['recentListen']}
    outTracks.append(track)

os.rename('../musicData.txt', '../musicData' + datetime.now().strftime("-%d-%m-%Y") + '.txt')
os.rename('../updatedMusicData.txt', '../musicData.txt')

with open("../music_data.json", "w", encoding="utf-8") as f:
    jsonDump = json.dumps(outTracks)
    jsonDump = jsonDump.replace("}, {", "}, \n{")
    f.write(jsonDump)
