with open("musicData.txt", "r", encoding="utf-8") as f:
    allTags = [eval(x) for x in f.readlines()]
    f.close()

with open("data_collection/localTags.txt", "r", encoding="utf-8") as f:
    localTags = [eval(x) for x in f.readlines()]
    f.close()

allTagsIndex = [tag['genreNameHash'] for tag in allTags]
for tag in localTags:
    try:
        workingTag = allTags[allTagsIndex.index(tag['genreNameHash'])]
        workingTag["playCount"] = tag["playCount"]
        workingTag["rating"] = tag["rating"]
        allTags[allTagsIndex.index(tag['genreNameHash'])] = workingTag
    except:
        print('Tag not found:', tag)

with open("updatedMusicData.txt", "w", encoding="utf-8") as f:
    f.writelines([str(x) + "\n" for x in allTags])
    f.close()

fileTags = {"album": "",
            "artists": [],
            "genres": [],
            "title": "",
            "playCount": 0,
            "rating": -1,
            "genreNameHash": ""}
trackInfo = {"album": "",
            "albumID": "",
            "artists": "",
            "title": "",
            "trackID": "",
            "imageID": ""
            }