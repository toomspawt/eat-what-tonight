# total more than A in B weeks
A = 10
B = 6

# at least X weeks with Y loads in B weeks
X = 0
Y = 0

# reading input file
inputFileName = input('Enter the name of input file (including extension): ')
try:
    inputFile = open(inputFileName, 'r')
    
except Exception:
    print("Can't open file.")

# initialize
entries = []
companies = {}
earliestDate = {}

# read input
for line in inputFile.read().splitlines():
    if line != '':
        id, week, amount = line.split(',')
        if week.isdigit():
            entries.append([id, int(week), int(amount)])

# sort input ascendingly by date
entries.sort(key=lambda tup: tup[1])

# process entries
for entry in entries:
    id, week, amount = entry[0], entry[1], entry[2]

    # create records for each company
    if id not in companies:
        companies[id] = {}
        earliestDate[id] = "Not Found"

    # create records for each week of each company
    if week not in companies[id]:
        companies[id][week] = 0

    # add loads to record of week
    companies[id][week] += amount
    if len(companies[id]) >= B and earliestDate[id] == "Not Found":
        c = companies[id]
        satisfied = True

        # check each week and total in 6 weeks
        totalB = 0
        moreThanY = 0
        for i in range(B):
            weekLoad = 0
            if week-i in c:
                weekLoad = c[week-i]
                if weekLoad >= Y:
                    moreThanY += 1
            totalB += weekLoad

        if totalB < A or moreThanY < X:
            satisfied = False

        if satisfied:
            earliestDate[id] = week


# write to output
outFile = open(inputFileName + "-M" + str(A) + "T" + str(B) + "W-M" + str(Y) + "in" + str(X) +"W.txt", 'w+')
for date in earliestDate:
    outFile.write(str(date) + " " + str(earliestDate[date]) +'\n')
