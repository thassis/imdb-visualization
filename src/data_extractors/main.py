from helper import tsv_to_json_array
from genre import create_word_count_json

if __name__ == "__main__":
    dir = "./src/data_extractors/output_files/"

    # tsv_to_json_array(dir + "basics_movies.tsv", dir + "basics_movies.json")
    create_word_count_json(dir + "basics_movies.tsv", 10)