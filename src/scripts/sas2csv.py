# Convert BRFSS SAS datasets to CSV


import os
import shutil

import sas7bdat_converter

target_dir = "../sas/" # Change this to the directory containing your SAS files
output_dir = "../data/"

# Create the output directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Traverse the directory structure
for root, dirs, files in os.walk(target_dir):
    for file in files:
        if file.endswith(".sas7bdat"):
            # Get the full path of the file
            file_path = os.path.join(root, file)

            # # Copy the file to the output directory
            # shutil.copy(file_path, output_dir)

            # Convert the SAS file to CSV
            csv_filename = os.path.splitext(file)[0] + ".csv"
            output_csv_path = os.path.join(output_dir, csv_filename)
            sas7bdat_converter.to_csv(file_path, output_csv_path)

            print(f"Save {file} in {output_dir}")

print("Complete.")