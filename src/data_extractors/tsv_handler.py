import csv
import pandas as pd
from functools import reduce
from collections import Counter
import statistics


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
        tsv_writer(reader.fieldnames, output_name, movies_only)




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


# Criar novos arquivos:

# filter_movies_from_file("basics.tsv", "basics_movies.tsv")
# group_genres_from_file("basics_movies.tsv", "basics_movies_grouped.tsv")
# genres_per_year("basics_movies_grouped.tsv", "genres_groups_per_year.tsv")
# mean_runtime("basics_movies.tsv", "mean_runtimes_genres.tsv")

# merge_two_files("basics_movies_grouped.tsv", "ratings.tsv", "basics_ratings.tsv", "tconst")


# Para criar o dicionario de algum arquivo basta chamar dict_list_creator()