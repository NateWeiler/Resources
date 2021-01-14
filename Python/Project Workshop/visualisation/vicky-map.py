import geojson
import parse as p

SFPD_CSV_FILE = "Arts_Centres.csv"


def create_map(data_file):
    # Define type of GeoJSON we're creating
    geo_map = {"type" : "FeatureCollection"}

    # Define empty list to collect each point to graph
    item_list = []

    # Iterate over our data to create GeoJSOn document.
    # We're using enumerate() so we get the line, as well
    # the index, which is the line number.
    for index,line in enumerate(data_file):
        # Skip any zero coordinates as this will throw off
        # our map.
        # [VICKY] Changed X -> LONG and Y -> LAT
        if line['LONG'] == "0" or line["LAT"] == "0":
            continue

        # Setup a new dictionary for each iteration.
        data = {}

        # Assigne line items to appropriate GeoJSON fields.
        data["type"] = "Feature"
        data["id"] = index
        data["properties"] = {"name": line["Name"],
                              "address": line["Address1"],
                              "type": line["Type"]}
        data["geometry"] = {"type": "Point",
                            "coordinates": (line["LONG"], line["LAT"])}

        # Add data dictionary to our item_list
        item_list.append(data)

    # For each point in our item_list, we add the point to our
    # dictionary.  setdefault creates a key called 'features' that
    # has a value type of an empty list.  With each iteration, we
    # are appending our point to that list.
    for point in item_list:
        geo_map.setdefault("features", []).append(point)

    # Now that all data is parsed in GeoJSON write to a file so we
    # can upload it to gist.github.com
    # [VICKY] Added pretty print with indent=4
    with open("arts_centres.geojson", "w") as f:
        f.write(geojson.dumps(geo_map, indent=4))

def main():
    data = p.parse(SFPD_CSV_FILE, ",")

    return create_map(data)

if __name__ == "__main__":
    main()