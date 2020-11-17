import mysql.connector
from mysql.connector import Error
from configure import *



############## Function


def register(listOfSystem_user):
    fname = listOfSystem_user[0]
    lname = listOfSystem_user[1]
    religion = listOfSystem_user[2]
    address = listOfSystem_user[3]
    province = listOfSystem_user[4]
    postal_code = listOfSystem_user[5]
    identification_number = listOfSystem_user[6]
    passport_number = listOfSystem_user[7]
    mobile_number = listOfSystem_user[8]
    nationlity = listOfSystem_user[9]
    sex = listOfSystem_user[10]
    birthdate = listOfSystem_user[11]
    email =listOfSystem_user[12]
    username = listOfSystem_user[13]
    password = listOfSystem_user[14]
    user_type = listOfSystem_user[15]
    try:
        connection = mysql.connector.connect(host='localhost',
                                            database='opdms',
                                            user='root',
                                            password='kin184492318')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor() 
            cursor.execute("insert into system_user (fname,lname,religion,address_,province,postal_code,identification_number,passport_number,mobile_number,nationality,sex,birthdate,email,username,password,user_type) values ("
            "'"+str(fname)+"','"+str(lname)+"','"+str(religion)+"','"+str(address)+"','"+str(province)+"','"+str(postal_code)+"','"+str(identification_number)+"','"+str(passport_number)+"','"+str(mobile_number)+"','"+str(nationlity)+"','"+str(sex)+"','"+str(birthdate)+
            "','"+str(email)+"','"+str(username)+"','"+str(password)+"','"+str(user_type)+"');")
            connection.commit()
            print('Registered')
            return 'Registered'
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def login(username , password): 
     try:
        connection = mysql.connector.connect(host='localhost',
                                            database='opdms',
                                            user='root',
                                            password='kin184492318')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()
            cursor.execute("select * from system_user")
            tableOfsystem_user = cursor.fetchall() 

    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")