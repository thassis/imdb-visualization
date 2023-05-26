from helper import tsv_to_json_array

if __name__ == "__main__":
    dir = "./src/data_extractors/output_files/"

    tsv_to_json_array(dir + "movie_genres.tsv", dir + "movie_genres.json")