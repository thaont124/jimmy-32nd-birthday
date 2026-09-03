import openpyxl
import glob

files = glob.glob("*.xlsx")
if files:
    wb = openpyxl.load_workbook(files[0])
    sheet = wb.active
    for row in sheet.iter_rows(values_only=True):
        if row and len(row) > 2 and row[2] and 'Jinnie' in str(row[2]):
            print("FOUND JINNIE:")
            print("Name:", row[2])
            wish = str(row[4])
            print("Wish Length:", len(wish))
            print("--- WISH START ---")
            print(wish[:300])
            print("--- WISH END ---")
