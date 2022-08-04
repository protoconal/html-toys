from datetime import datetime
import json
import os

with open("updatedMusicData.txt", "r", encoding="utf-8") as f:
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
             'ranking': rankings.index(tag['title']) + 1,
             'artist': ", ".join(tag['artists']),
             'genre': ", ".join(tag['genres']),
             'title': tag['title'],
             'playCount': tag['playCount'],
             'spotifyImage': tag['imageID'],
             'recentListen': tag['recentListen']}
    outTracks.append(track)

os.rename(os.getcwd() + '\\musicData.txt', os.getcwd() + '\\musicData' + datetime.now().strftime("-%d-%m-%Y") + '.txt')
os.rename(os.getcwd() + '\\updatedMusicData.txt', os.getcwd() + '\\musicData.txt')
try:
    os.remove('../old_music_data.ts')
except:
    print()
os.rename('../music_data.ts', 'old_music_data.ts')

with open("../music_data.ts", "w", encoding="utf-8") as f:
    f.write("""interface SpotifyData {
    spotifyURI: string;
    type: number;
    rating: number;
    ranking: number;
    artist: string;
    genre: string;
    title: string;
    playCount: number;
    spotifyImage: string;
    recentListen: boolean;
  }

export var musicData: SpotifyData[] = """)
    jsonDump = json.dumps(outTracks)
    jsonDump = jsonDump.replace("}, {", "}, \n{")
    f.write(jsonDump)
    f.close()