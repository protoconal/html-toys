with open("updatedMusicData.txt", "r", encoding="utf-8") as f:
    updatedMusic = [eval(x) for x in f.readlines()]
    f.close()

def sortKey(e):
    return e['rating'] * e['playCount']

updatedMusic.sort(key=sortKey, reverse=True)
updatedMusic = [x['title'] for x in updatedMusic]

with open("overrideRanking.csv", "r", encoding="utf-8") as f:
    overrideRanking = [x.split(', ') for x in f.readlines()]
    overrideRanking = [[int(x[0]) - 1, ", ".join(x[1:]).strip('\n')] for x in overrideRanking]
    f.close()

for rank in overrideRanking:
    updatedMusic.pop(updatedMusic.index(rank[1]))
    updatedMusic.insert(rank[0], rank[1])


with open("titleRanking.csv", "w", encoding="utf-8") as f:
    f.writelines([str(x + '\n') for x in updatedMusic])
    f.close()