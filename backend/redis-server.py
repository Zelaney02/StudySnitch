from simple_storage import storage as r

r.set('bad', '3')

print(r.get('bad'))
print("Simple storage initialized - StudySnitch ready!")
