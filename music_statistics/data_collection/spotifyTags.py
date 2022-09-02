import requests
import time

method = "GET"
baseURL = "https://api.spotify.com/v1/playlists"
playlistID = "2jVbOfnWzVZfOsB8Er9loD"
query = "tracks?fields=items(track(name%2Cid%2Cartists%2Calbum(name%2Cid%2Cimages)))"

authorization = ""
retryAttempts = 5

reqHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + authorization
}

url = baseURL + "/" + playlistID + "/" + query + "&offset="

lengthResponse = 100

counter = 1
offset = len(open("spotifyTags.txt", "r", encoding="utf-8").readlines())
while lengthResponse == 100:
    tracks = []
    skip = str(counter * lengthResponse + offset)
    retries = 0
    while retries < 5:
        response = requests.get(url + skip, headers=reqHeaders)
        if response.status_code != 200:
            retries += 1
            print(response.status_code)
            print("Sleeping due to Error...")
            time.sleep(30)
        else:
            break
    if response.status_code != 200:
        break
    listing = response.json()
    listing = [x['track'] for x in listing['items']]

    for track in listing:
        trackID = track['id']
        trackName = track['name']

        artists = []
        for artist in track['artists']:
            artists.append(artist['name'])

        album = track['album']
        albumID = album['id']
        albumName = album['name']
        albumImage = album['images'][0]['url']
        imageID = albumImage.split("/")[-1]

        trackInfo = {"album": albumName,
                     "albumID": albumID,
                     "artists": artists,
                     "title": trackName,
                     "trackID": trackID,
                     "imageID": imageID
                     }

        tracks.append(trackInfo)
    lengthResponse = len(listing)
    counter += 1
    time.sleep(15)

    f = open("spotifyTags.txt", "a", encoding="utf-8")
    tracks = [str(x) + "\n" for x in tracks]
    f.writelines(tracks)
    f.close()