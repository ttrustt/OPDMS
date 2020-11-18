import os
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
from flask import Flask, request, jsonify, make_response, flash, redirect, url_for
databasename='opdms'


############## Function

def register(listOfSystem_user):
    load_dotenv()
    fname = listOfSystem_user[0]
    lname = listOfSystem_user[1]
    religion = listOfSystem_user[2]
    address = listOfSystem_user[3]
    province = listOfSystem_user[4]
    postal_code = listOfSystem_user[5]
    identification_number = listOfSystem_user[6]
    passport_number = listOfSystem_user[7]
    mobile_number = listOfSystem_user[8]
    nationality = listOfSystem_user[9]
    sex = listOfSystem_user[10]
    birthdate = listOfSystem_user[11]
    email =listOfSystem_user[12]
    username = listOfSystem_user[13]
    password = listOfSystem_user[14]
    user_type = listOfSystem_user[15]
    
    try:
        connection = mysql.connector.connect(host='35.185.182.63',
                                            database='opdms',
                                            user='root',
                                            password='!Opdmstrust69')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()
            cursor.execute("select * from SYSTEM_USER;")
            record = cursor.fetchall()
    except Error as e:
        return (False,("Error while connecting to MySQL", e))
    
    try:
        cursor.execute("insert into SYSTEM_USER (fname,lname,religion,address_,province,postal_code,identification_number,passport_number, \
            mobile_number,nationality,sex,birthdate,email,username,password,user_type) values (""'"+str(fname)+"','"+str(lname)+"','"+str(religion)+ \
            "','"+str(address)+"','"+str(province)+"','"+str(postal_code)+"','"+str(identification_number)+"','"+str(passport_number)+"','"+ \
            str(mobile_number)+"','"+str(nationality)+"','"+str(sex)+"','"+str(birthdate)+ "','"+str(email)+"','"+str(username)+"','"+str(password)+ \
            "','"+str(user_type)+"');")
        connection.commit()
        return (True,'OK')
    except Error as e:
        return(False,("Error while executing to MySQL "+str(e)))

    if (connection.is_connected()):
        cursor.close()
        connection.close()
        return(False,("MySQL connection is closed"))

def login(listOfSystem_user):
    username = listOfSystem_user[0]
    password = listOfSystem_user[1]
    
    try:
        connection = mysql.connector.connect(host='35.185.182.63',
                                            database='opdms',
                                            user='root',
                                            password='!Opdmstrust69')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)  

    except Error as e:
        print("Error while connecting to MySQL", e)
    
    try: 
        cursor = connection.cursor()
        cursor.execute("select username,password from SYSTEM_USER where username='"+username+"'")
        usernamePassword = cursor.fetchall()
        if(usernamePassword ==[]) :
            return(0,'Username Incorrect',None)
        if(password != usernamePassword[0][1]): 
            return(0,'Passwod Incorrect',None)
        return(1,'OK',usernamePassword[0][0])
    except Error as e : 
        print('Error in MySQL' ,e)
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")
