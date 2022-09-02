from os import walk, path
import mutagen.flac
from hashlib import md5
import time

t1 = time.time()

directory = 'E:\Music\FLACs\songs to shuffle bop to'
writeAsYouGo = False

f = open("localTags.txt", "w", encoding="utf-8")
readSongs = []
for root, dirs, files in walk(directory):
    for file in files:
        metadata = mutagen.flac.Open(path.join(root, file)).tags
        fileTags = {"album": "",
                    "artists": [],
                    "genres": [],
                    "title": "",
                    "playCount": 0,
                    "rating": -1,
                    "genreNameHash": ""}
        artistList = []
        genresList = []
        for tag in metadata:
            value = tag[1]
            match tag[0]:
                case "ALBUM":
                    fileTags["album"] = value
                case "ARTIST":
                    artistList.append(value)
                case "GENRE":
                    genresList.append(value)
                case "TITLE":
                    fileTags["title"] = value
                case "play_count":
                    fileTags["playCount"] = int(value)
                case "rating":
                    fileTags["rating"] = int(value)
                case _:
                    continue
        fileTags['artists'] = artistList
        fileTags['genres'] = genresList

        outputHash = md5(("".join(fileTags['genres']) + fileTags['title']).encode('ascii', 'replace')).hexdigest()
        fileTags['genreNameHash'] = outputHash

        readSongs.append(fileTags)
        if writeAsYouGo:
            f.write(str(fileTags) + "\n")
    break

if not writeAsYouGo:
    fileTags = [str(x) + "\n" for x in readSongs]
    f.writelines(fileTags)
f.close()

print("Elapsed time:", time.time() - t1)