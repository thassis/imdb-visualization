import csv
import json
from collections import defaultdict
from heapq import nlargest

def read_file(file_name):
    data = []
    with open(file_name, encoding="utf8") as file:
        reader = csv.DictReader(file, delimiter="\t")
        for row in reader:
            data.append(row)
    return data

def get_movie_data():
    #read the data from the files akas.tsv and basics.tsv located in the root folder/imdb_files
    akas_data = read_file("imdb_files/akas.tsv")
    basics_data = read_file("imdb_files/basics.tsv")
    
    movie_data = []
    
    for row in akas_data:
        if "movie" in row["types"]:
            for row2 in basics_data:
                if row["titleId"] == row2["tconst"]:
                    movie_data.append(row2)
    return movie_data

def get_genre_data():
    movie_data = get_movie_data()
    #create a dictionary of genres and their counts for each movie
    genre_dict = {}
    for row in movie_data:
        if row["genres"] != "\\N":
            row["genres"] = row["genres"].split(",")
            for genre in row["genres"]:
                if genre in genre_dict:
                    genre_dict[genre] += 1
                else:
                    genre_dict[genre] = 1
            row["genres"] = genre_dict
        else:
            row["genres"] = {}
    return movie_data

basic_stop_words = [
    'a', 'an', 'the', 'and', 'but', 'or', 'so', 'if', 'as', 'at', 'by', 'for', 'from',
    'de', 'la', 'die', 'el', 'le', 'les', 'la', 'las', 'los', 'un', 'une', 'des', 'les', 'der',
    'o',  'of', 'to', 'in', 'on', 'is', 'it', 'its', 'that', 'this', 'those', 'these', 'be',
    'i', '&', '-', 'du', 'und', 'et', 'en', 'auch', 'mit', 'für', 'von', 'zu', 'im', 'ist',
    'da', 'no',
]

def create_word_count_json(file_path, num_words=10):
    word_count = defaultdict(lambda: defaultdict(int))

    with open(file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file, delimiter='\t')
        for row in reader:
            title = row['originalTitle']
            genres = row['genres'].split(',')

            for genre in genres:
                words = title.split()
                for word in words:
                    word = word.lower()
                    if word not in basic_stop_words:
                        word_count[genre][word] += 1

    sorted_word_count = {}
    for genre, word_dict in word_count.items():
        top_words = nlargest(num_words, word_dict, key=word_dict.get)
        sorted_words = {word: word_dict[word] for word in top_words}
        sorted_word_count[genre] = sorted_words

    json_data = json.dumps(sorted_word_count, indent=4)
    with open('word_count.json', 'w') as file:
        file.write(json_data)
    return json_data
