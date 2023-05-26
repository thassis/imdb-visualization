import csv
import json

def tsv_to_json_array(file_path, output_file_path):
    json_array = []

    with open(file_path, 'r') as tsv_file:
        reader = csv.DictReader(tsv_file, delimiter='\t')
        for row in reader:
            json_object = json.dumps(row)
            json_array.append(json.loads(json_object))

    with open(output_file_path, 'w') as json_file:
        json.dump(json_array, json_file, indent=4)

    return json_array
