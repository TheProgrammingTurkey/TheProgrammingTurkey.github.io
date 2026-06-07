from datetime import datetime

#Calculate how many pixels from the left to put an entry for the history page
start = 150

date = "6/6/26"

base = datetime(2020, 7, 1)

# Parse input date (supports 2-digit or 4-digit year)
m, d, y = date.split('/')
y = int(y)

# Convert 2-digit year like 20 -> 2020
if y < 100:
    y += 2000

target = datetime(y, int(m), int(d))

days = (target - base).days

years = days/365.25
pixels = years * 400
pixel = start + pixels

print(pixel)