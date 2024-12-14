import csv
import json

def main():
    activitiesDataArray = convert_data("CwmpasOTActivityDatabase.csv")
    activitiesJson = {}
    
    # Clear previous data
    activitySections = 56
    totalActivities = int(len(activitiesDataArray) / activitySections)
    
    # Loop though activities
    for i in range(totalActivities):
        activityStartSection = i * activitySections
        
        # Create activity
        activitiesJson[activitiesDataArray[activityStartSection + 1]] = {
            "activityName" : activitiesDataArray[activityStartSection + 1],
            "activityCategory" : activitiesDataArray[activityStartSection],
            "Prompting": [
                activitiesDataArray[activityStartSection + 3],
                activitiesDataArray[activityStartSection + 4],
                activitiesDataArray[activityStartSection + 5],
                activitiesDataArray[activityStartSection + 6],
                activitiesDataArray[activityStartSection + 7],
                activitiesDataArray[activityStartSection + 8],
                activitiesDataArray[activityStartSection + 9],
                activitiesDataArray[activityStartSection + 10],
                activitiesDataArray[activityStartSection + 11],
                activitiesDataArray[activityStartSection + 12],
                activitiesDataArray[activityStartSection + 13]
            ],
            "Some Support": [
                activitiesDataArray[activityStartSection + 17],
                activitiesDataArray[activityStartSection + 18],
                activitiesDataArray[activityStartSection + 19],
                activitiesDataArray[activityStartSection + 20],
                activitiesDataArray[activityStartSection + 21],
                activitiesDataArray[activityStartSection + 22],
                activitiesDataArray[activityStartSection + 23],
                activitiesDataArray[activityStartSection + 24],
                activitiesDataArray[activityStartSection + 25],
                activitiesDataArray[activityStartSection + 26],
                activitiesDataArray[activityStartSection + 27]
                ],
            "Step-by-Step Guidance": [
                activitiesDataArray[activityStartSection + 31],
                activitiesDataArray[activityStartSection + 32],
                activitiesDataArray[activityStartSection + 33],
                activitiesDataArray[activityStartSection + 34],
                activitiesDataArray[activityStartSection + 35],
                activitiesDataArray[activityStartSection + 36],
                activitiesDataArray[activityStartSection + 37],
                activitiesDataArray[activityStartSection + 38],
                activitiesDataArray[activityStartSection + 39],
                activitiesDataArray[activityStartSection + 40],
                activitiesDataArray[activityStartSection + 41]
                ],
            "Full Assistance": [
                activitiesDataArray[activityStartSection + 45],
                activitiesDataArray[activityStartSection + 46],
                activitiesDataArray[activityStartSection + 47],
                activitiesDataArray[activityStartSection + 48],
                activitiesDataArray[activityStartSection + 49],
                activitiesDataArray[activityStartSection + 50],
                activitiesDataArray[activityStartSection + 51],
                activitiesDataArray[activityStartSection + 52],
                activitiesDataArray[activityStartSection + 53],
                activitiesDataArray[activityStartSection + 54],
                activitiesDataArray[activityStartSection + 55]
                ],
        }
        
        create_json(activitiesJson, "activities")
        

def convert_data(filename):
    # Open and split csv
    file = open(filename, 'r') 
    reader = csv.reader(file, delimiter = "|")
    
    raw_data = ""
    for line in reader:
        try:
            raw_data += line[0]
        except:
            raw_data += "\n\n"
            
    data = raw_data.split(";")
    file.close()
    
    return data
  
  
def create_json(dict, filename):
    json_string = json.dumps(dict, indent=4) 
    
    with open(f"{filename}.json", 'w') as outfile:
        outfile.write(json_string)
    

if __name__ == "__main__":
    main()