maxx = 0
a = int(input())
b = int(input())
c = int(input())

maxx = a + b + c
maxx = max(
    a+b+c,
    a*b+c,
    a*(b+c),
    a+b*c,
    (a+b)*c,
    a*b*c
)

print(maxx)