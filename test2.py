import mysql.connector

conn=mysql.connector.connect(host='localhost',username='root',password='root',database='sih')
mycursor=conn.cursor()



mycursor.execute("DELETE FROM doctor")

print("sucessfully inserted")

# mycursor.execute("create table test(id int,name varchar(100)) ")

conn.commit()

conn.close()
print("sucessfully connected")
