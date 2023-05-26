import csv

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