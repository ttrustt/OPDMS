import mysql.connector
from mysql.connector import Error
from configure import password

password = password()
databasename='opdms'
table='system_user'

############## Function

def register(username, password, address):
    try:
    connection = mysql.connector.connect(host='localhost',
                                         database='opdms',
                                         user='root',
                                         password='91236621')
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select * from system_user;")
        record = cursor.fetchall()
        for x in record:
            print(x)
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

