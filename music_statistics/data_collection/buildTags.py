from hashlib import sha256

with open("spotifyTags.txt", "r", encoding="utf-8") as f:
    spotifyTags = [eval(x) for x in f.readlines()]
    f.close()

with open("localTags.txt", "r", encoding="utf-8") as f:
    localTags = [eval(x) for x in f.readlines()]
    f.close()

# index by title and artists
spotifyIndex = {}
for index, tag in enumerate(spotifyTags):
    titleArtistHash = sha256((tag["title"].lower() + "-".join(tag["artists"])).lower().encode('utf-8')).hexdigest()
    spotifyIndex[titleArtistHash] = index

def combineTag(hashedValue, spotifyTags, spotifyIndex, tag):
    spotTag = spotifyTags[spotifyIndex[hashedValue]]
    tag["albumID"] = spotTag["albumID"]
    tag["trackID"] = spotTag["trackID"]
    tag["imageID"] = spotTag["imageID"]
    return tag

combinedTags = []

# match by titleArtistHash
failedLocalMatches = []
matchedTags = []
matchedTagsIndex = []
for index, tag in enumerate(localTags):
    titleArtistHash = sha256((tag["title"].lower() + "-".join(tag["artists"])).lower().encode('utf-8')).hexdigest()
    if spotifyIndex.get(titleArtistHash, False):
        combinedTags.append(combineTag(titleArtistHash, spotifyTags, spotifyIndex, tag))
        matchedTags.append(titleArtistHash)
        matchedTagsIndex.append(index)
    else:
        failedLocalMatches.append(tag)

if len(set(matchedTags)) - len(matchedTags) != 0:
    print("Failed Uniqueness Check, duplicate Artist and Track Name...")
    seen = set()
    dupes = []
    for x in matchedTags:
        if x in seen:
            dupes.append(x)
        else:
            seen.add(x)
    print("Non-unique found: ", "".join([str(x) for x in set(dupes)]))

[spotifyIndex.pop(tagHash) for tagHash in matchedTags]
print("Unable to automatically match the following tags using TrackArtistHash...")
remainingSpotifyTags = []
for x in spotifyIndex.values():
    try:
        remainingSpotifyTags.append(spotifyTags[x])
    except:
        print('Unable to find hash:', x)
spotifyTags = remainingSpotifyTags

for index in reversed(matchedTagsIndex):
    localTags.pop(index)

print(localTags)
print(spotifyTags)

# compare final tags

from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np


simplifiedLocalTags = []
for tag in localTags:
    stringTag = " ".join([str(x) for x in [tag["album"], tag["artists"], tag["title"]]])
    stringTag = "".join([letter for letter in stringTag if letter.isalnum() or letter.isspace()])
    simplifiedLocalTags.append(stringTag)

simplifiedSpotifyTags = []
for tag in spotifyTags:
    stringTag = " ".join([str(x) for x in [tag["album"], tag["artists"], tag["title"]]])
    stringTag = "".join([letter for letter in stringTag if letter.isalnum() or letter.isspace()])
    simplifiedSpotifyTags.append(stringTag)

corpus = simplifiedLocalTags + simplifiedSpotifyTags
vect = TfidfVectorizer(min_df=1, stop_words="english")
tfidf = vect.fit_transform(corpus)
pairwise_similarity = tfidf * tfidf.T

n, _ = pairwise_similarity.shape
pairwise_similarity[np.arange(n), np.arange(n)] = -1.0

failedLocalMatches = []
closestTag = []
matchedTags = []
for index, localSimplifiedTag in enumerate(simplifiedLocalTags):
    input_idx = corpus.index(localSimplifiedTag)
    result_idx = pairwise_similarity[input_idx].argmax()
    closestTag.append(corpus[result_idx])
    print(localSimplifiedTag)
    print(corpus[result_idx])

    if input("Accept Match? (Y/n)") == "":
        print("accepted")
        try:
            simplifiedSpotifyTagsIndex = simplifiedSpotifyTags.index(corpus[result_idx])
            spotTag = spotifyTags[simplifiedSpotifyTagsIndex]
            tag = localTags[index]
            tag["albumID"] = spotTag["albumID"]
            tag["trackID"] = spotTag["trackID"]
            tag["imageID"] = spotTag["imageID"]
            combinedTags.append(tag)
            matchedTags.append((index, simplifiedSpotifyTagsIndex))
        except:
            failedLocalMatches.append(localSimplifiedTag)
    else:
        failedLocalMatches.append(localSimplifiedTag)


popLocal = sorted([x[0] for x in matchedTags], reverse=True)
popSpotify = sorted([x[1] for x in matchedTags], reverse=True)

[localTags.pop(x) for x in popLocal]
[spotifyTags.pop(x) for x in popSpotify]

# fix ed wood to ed case
# fix i wonder II and I

with open("../musicData.txt", "w", encoding="utf-8") as f:
    f.writelines([str(x) + "\n" for x in combinedTags])
    f.close()

with open("failedSpotifyTags.txt", "w", encoding="utf-8") as f:
    f.writelines([str(x) + "\n" for x in spotifyTags])
    f.close()

with open("failedLocalTags.txt", "w", encoding="utf-8") as f:
    f.writelines([str(x) + "\n" for x in localTags])
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