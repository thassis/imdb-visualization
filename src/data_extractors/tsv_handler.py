import csv
import pandas as pd
from functools import reduce
from collections import Counter
import statistics
import itertools
import json
import matplotlib.pyplot as plt
import numpy as np


def tsv_writer(field_names, output_file_name, dic):
    with open(output_file_name, 'w', encoding='utf8', newline='') as file2:
        writer = csv.DictWriter(file2, delimiter='\t', fieldnames=field_names)
        writer.writeheader()
        for row in dic:
            writer.writerow(row)




# Cria um tsv filtrando somente os filmes na coluna titleType
def filter_movies_from_file(input_name, output_name):
    with open(input_name, encoding="utf8") as file:
        reader = csv.DictReader(file, delimiter="\t")
        movies_only = filter(lambda x: x['titleType'] == 'movie' or x['titleType'] == 'tvMovie', reader)
        movies_with_genres = filter(lambda x: x['genres'] != '\\N', movies_only)
        tsv_writer(reader.fieldnames, output_name, movies_with_genres)


#filter_movies_from_file('basics_movies.tsv', 'basics_movies_with_genres.tsv')

grouped_genres_types = {"Group1": "Drama,Crime,Thriller,Mystery,Film-Noir,Horror", "Group2": "Musical,Music",
                        "Group3": "Game-Show,Reality-TV,Talk-Show", "Group4": "Documentary,News,History,Biography",
                        "Group5": "Adventure,Action,War,Fantasy,Sci-Fi,Western", "Group6": "Comedy",
                        "Group7": "Family,Animation", "Group8": "Sport",
                        "Group9": "Short", "Group10": "Adult", "Group11": "Romance", "\\N": "\\N"}




# Cria um tsv muda o genero dos filmes para os grupos dos respectivos generos
def update_genres(row):
    new_genres = {[k for k, v in grouped_genres_types.items() if genre in v][0] for genre in row['genres'].split(",")}
    new_genres = reduce(lambda x, y: x + ',' + y, new_genres)
    row['genres'] = new_genres
    return row


def group_genres_from_file(input_name, output_name):
    with open(input_name, encoding="utf8") as file:
        reader = csv.DictReader(file, delimiter="\t")
        grouped_dict = map(update_genres, reader)
        tsv_writer(reader.fieldnames, output_name, grouped_dict)




# Retorna um conjunto com os valores encontrados na coluna 'column_name' do arquivo 'file_name'
def get_column_values(file_name, column_name):
    with open(file_name, encoding="utf8") as file:
        reader = csv.DictReader(file, delimiter="\t")
        all_values = map(lambda x: set(x[column_name].split(",")), reader)  # mapeia cada linha em um conjunto com os generos
        set_of_values = reduce(lambda x, y: x | y, all_values)  # faz a uniao de todos os conjuntos
    return set_of_values




# Cria um tsv com a quantidade de filmes de um genero em um certo ano
def update_genre_counts(dic, genre):
    dic[genre] += 1
    return dic


def update_genre_year(dic, row, s):
    # Pega o dicionário com a contagem atual dos generos do ano row['startYear']
    current_dic_value = dic.get(row['startYear'], {'startYear': row['startYear']} | dict(
       [(k, v - 1) for k, v in Counter(s).items()]))

    # Itero a lista de generos do ano row['startYear'] e para cada genero soma 1 ao genero correspondente
    # no dicionario com a contagem dos generos do ano row['startYear']
    dic[row['startYear']] = reduce(update_genre_counts, row['genres'].split(','), current_dic_value)
    return dic


def genres_per_year(input_name, output_name):
    with open(input_name, encoding="utf8") as file:
        reader = csv.DictReader(file, delimiter="\t")
        fieldnames_genres = get_column_values(input_name, 'genres')
        genre_year_dict = reduce(lambda x, y: update_genre_year(x, y, fieldnames_genres), reader, {})
        tsv_writer(['startYear'] + list(fieldnames_genres), output_name, genre_year_dict.values())




# Cria um tsv com a media da duraçao dos filmes por genero
def update_runtimes_values(dic, row):
    for genre in row['genres'].split(","):
        dic[genre].append(row["runtimeMinutes"])
    return dic


def mean_runtime(input_name, output_name):
    fieldnames_genres = get_column_values(input_name, 'genres')
    initial_dic = {k: [] for k in fieldnames_genres}

    with open(input_name, encoding="utf8") as file:
        reader = csv.DictReader(file, delimiter="\t")
        reader = filter(lambda x: x['runtimeMinutes'] != r"\N", reader)
        runtime_genre_dict = reduce(update_runtimes_values, reader, initial_dic)
        runtime_genre_dict = {key: statistics.mean(map(int, values)) for key, values in runtime_genre_dict.items()}
        tsv_writer(list(fieldnames_genres), output_name, [runtime_genre_dict])



def merge_two_files(input_name1, input_name2, output_name, column_name):
    data1 = pd.read_csv(input_name1, delimiter="\t")
    data2 = pd.read_csv(input_name2, delimiter="\t")
    output1 = pd.merge(data1, data2, on=column_name, how='inner')
    output1.to_csv(output_name,  sep="\t", index=False, encoding='utf8')



def movie_ratings(input_name, output_name):
    with open(file_name, encoding="utf8") as file:
        reader = csv.DictReader(file, delimiter="\t")




# Cria uma lista de dicionarios cujas keys sao os nomes das colunas e os values os valores correspondentes
# Cada elemento dessa lista (dicionario) corresponde a uma linha do arquivo
# Acho que é esse formato que deve ser passado como 'data' no Chart.js
def dict_list_creator(file_name):
    data = []
    with open(file_name, encoding="utf8") as file:
        reader = csv.DictReader(file, delimiter="\t")
        for row in reader:
            data.append(row)
    return data


def count_values_in_column(csv_file_path, column_name):
    df = pd.read_csv(csv_file_path, delimiter='\t')
    value_counts = df[column_name].value_counts()
    return value_counts.to_dict()


def chord_diagram_matrix_generator():

    genres_list = list(get_column_values('basics_movies_with_genres.tsv', 'genres'))
    genres_list = sorted(genres_list)
    index_matrix_dict = {k : i for i,k in enumerate(genres_list)}

    dic = dict()
    d = count_values_in_column("basics_movies_with_genres.tsv", 'genres')

    for k in d.keys():
        values = k.split(',')
        if len(values) == 1:
            values.append(values[0])
        pairs_list = list(itertools.combinations(values, 2))

        for t in pairs_list:
            dic[t] = dic.get(t, 0) + d[k]


    M = [[0 for i in range(28)] for j in range(28)]
    for k, v in dic.items():
        i = index_matrix_dict[k[0]]
        j = index_matrix_dict[k[1]]
        M[i][j] = v
        M[j][i] = v

    return M

#print(chord_diagram_matrix_generator())

def tsv_to_json_array(file_path, output_file_path):
    json_array = []

    with open(file_path, "r", encoding="utf-8") as tsv_file:
        reader = csv.DictReader(tsv_file, delimiter="\t")
        for row in reader:
            json_object = json.dumps(row)
            json_array.append(json.loads(json_object))

    with open(output_file_path, "w") as json_file:
        json.dump(json_array, json_file, indent=4)

    return json_array


def genre_rating_distribution(input_file, genre):
    with open(input_file, encoding="utf8") as file:
        reader = csv.DictReader(file, delimiter="\t")
        reader =  filter(lambda x: genre in x['genres'].split(','), reader)
        ratings_list = []
        for row in reader:
            ratings_list.append(row['averageRating'])
        return ratings_list


def visualize_genre_rating_distribution(input_file, genre):
    interval_length = 0.5
    num_intervals = int(10 / interval_length)
    intervals = [(i * interval_length, (i + 1) * interval_length) for i in range(num_intervals)]

    data_counter_intervals = {key: 0 for key in intervals}

    data = genre_rating_distribution(input_file, genre)
    for rating in data:
        for interval in intervals:
            if interval[0] <= float(rating) < interval[1]:
                data_counter_intervals[interval] += 1
                break

    x_values = [interval[0] for interval in intervals]
    y_values = list(data_counter_intervals.values())

    plt.figure(figsize=(12, 5))
    bar_width = 0.35

    bars = plt.bar(x_values, y_values, width=bar_width, color='midnightblue')

    plt.xlabel('Rating Intervals')
    plt.ylabel('Count')
    plt.title(genre)
    plt.xticks(x_values)
    plt.gca().spines['top'].set_visible(False)
    plt.gca().spines['right'].set_visible(False)
    plt.legend()
    plt.tight_layout()
    plt.show()


def rating_vs_votes(input_file):
    data = []
    with open(input_file, encoding="utf8") as file:
        reader = csv.DictReader(file, delimiter="\t")
        reader = filter(lambda x: 'Group7' in x['genres'].split(','), reader)
        ratings_list = []
        for row in reader:
            data.append((row['averageRating'], row['numVotes']))


    # Extract x and y values from the data
    x_values = [point[0] for point in data]
    y_values = [point[1] for point in data]

    # Customize the size of the dots
    dot_size = 1

    # Plot the scatter plot with customized dot size
    plt.scatter(x_values, y_values, s=dot_size)

    plt.xticks([])
    plt.yticks([])
    # Customize the plot if desired
    plt.title('Scatter Plot')

    # Display the plot
    plt.show()

# decada, nota media, genero
def heat_map2(input_file, genre):
    interval_years = 10
    start = 1970
    end = 2020
    num_intervals = int((end-start) / interval_years)
    intervals = [(start + i * interval_years, start + (i + 1) * interval_years) for i in range(num_intervals)]

    data_counter_intervals = {key: [] for key in intervals}

    with open(input_file, encoding="utf8") as file:
        reader = csv.DictReader(file, delimiter="\t")
        reader =  filter(lambda x: genre in x['genres'].split(','), reader)
        for row in reader:
            for interval in intervals:
                if row['startYear'] != '\\N':
                    if interval[0] <= int(row['startYear']) < interval[1] :
                        data_counter_intervals[interval].append(row['averageRating'])


        ret = {key : sum(float(i) for i in value)/len(value) for key, value in data_counter_intervals.items()}
        print(ret)


def heat_map():

    genres_list = list(get_column_values('basics_movies_with_genres.tsv', 'genres'))
    genres_list = sorted(genres_list)
    to_remove = ['Adult', 'Game-Show', 'Reality-TV', 'Short', 'Talk-Show', 'News', 'Film-Noir']
    for i in to_remove:
        genres_list.remove(i)

    genres_pairs = list(itertools.combinations(genres_list, 2)) + [(i,i) for i in genres_list]

    dic_pairs_rating = {key : [] for key in genres_pairs}
    dic_genres_ratings = {key: [] for key in genres_list}

    with open("movies_ratings_with_genres.tsv", encoding="utf8") as file:
        reader = csv.DictReader(file, delimiter="\t")
        for row in reader:
            if row['averageRating'] != '\\N':
                genres = row['genres'].split(',')

                if len(genres) == 1:
                    genres.append(genres[0])
                pairs_list = list(itertools.combinations(genres, 2))

                for t in pairs_list:
                    if t in dic_pairs_rating.keys():
                        dic_pairs_rating[t].append(row['averageRating'])

                for genre in genres:
                    if genre in genres_list:
                        dic_genres_ratings[genre].append(row['averageRating'])

    dic_genres_average_rating = {key: sum(float(i) for i in value) / len(value) for key, value in
                                 dic_genres_ratings.items()}
    sorted_keys = sorted(dic_genres_average_rating, key=dic_genres_average_rating.get, reverse=True)
    index_matrix_dict = {k : i for i,k in enumerate(sorted_keys)}
    print(index_matrix_dict)

    M = [[0 for i in range(len(genres_list))] for j in range(len(genres_list))]
    for k, v in dic_pairs_rating.items():
        i = index_matrix_dict[k[0]]
        j = index_matrix_dict[k[1]]
        if len(v) == 0:
            M[i][j] = -1
            M[j][i] = -1
        else:
            M[i][j] = sum(float(i) for i in v)/len(v)
            M[j][i] = sum(float(i) for i in v)/len(v)

    #Plot heat map -------------------------------------------
    # entries_list = []
    # for i in range(21):
    #     for j in range(21):
    #         if M[i][j] != -1:
    #             entries_list.append(M[i][j])
    #
    # cmap = plt.get_cmap('coolwarm')
    # cmap.set_under('gray')
    # # Plot the heatmap
    # plt.imshow(M, cmap=cmap, vmin=np.min(entries_list), vmax=np.max(entries_list))
    #
    # colorbar = plt.colorbar()
    # colorbar.set_label('Value')
    #
    # # Display the plot
    # plt.show()
    return M






#rating_vs_votes("movies_ratings_with_genres_grouped.tsv")
#visualize_genre_rating_distribution('movies_ratings_with_genres_grouped.tsv', 'Group1')

#group_genres_from_file("basics_movies_with_genres.tsv", "movies_with_genres_grouped.tsv")
#genres_per_year("movies_with_genres_grouped.tsv", "final_grouped.tsv")
#print(tsv_to_json_array("final_grouped.tsv", "final_grouped.json"))




basic_stop_words = [
    'a', 'an', 'the', 'and', 'but', 'or', 'so', 'if', 'as', 'at', 'by', 'for', 'from',
    'il', 'l\'', 'lo', 'i', 'gli', 'del', 'dal', 'di', 'ni', 'in', 'su', 'sul', 'al',
    'de', 'la', 'die', 'el', 'le', 'les', 'la', 'las', 'los', 'un', 'une', 'des', 'les', 'der',
    'o',  'of', 'to', 'in', 'on', 'is', 'it', 'its', 'that', 'this', 'those', 'these', 'be',
    'i', '&', '-', 'du', 'und', 'et', 'en', 'auch', 'mit', 'für', 'von', 'zu', 'im', 'ist',
    'da', 'no', 'na', 'o', 'da',
    '1', '2', '3', '4', '5'
]
