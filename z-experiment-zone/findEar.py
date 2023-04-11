import csv

with open("experiment-zone/input2020.csv") as fr, open("clearedInput2020.csv","w+") as fw:
    cr = csv.reader(fr,delimiter=",")
    cw = csv.writer(fw,delimiter=",")
    cw.writerow(next(cr))  # write title as-is
    cw.writerows(reversed(list(cr)))
    print()