import os
import mysql.connector
from mysql.connector import Error
# from dotenv import load_dotenv
import json
# from flask import Flask, request, jsonify, make_response, flash, redirect, url_for
from datetime import datetime

def showUser():
    message = 'error'
    try:
        connection = mysql.connector.connect(host='localhost',
                                            database='opdms',
                                            user='root',
                                            password='1234567890')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            message = ("Connected to MySQL Server version ", db_Info)  

    except Error as e:
        message = (False,"Error while connecting to MySQL", e)
    if (connection.is_connected()):
        try: 
            cursor = connection.cursor()
            cursor.execute("select username, fname, lname, password, user_type, user_id from SYSTEM_USER")
            user = cursor.fetchall()
            cursor.execute("select user_id, patient_id from PATIENT")
            patient = cursor.fetchall()
            userToPatient = {}
            for x in patient:
                userToPatient[x[0]] = x[1]
            cursor.execute("select user_id, doctor_id from DOCTOR")
            doctor = cursor.fetchall()
            userToDoctor = {}
            for x in doctor:
                userToDoctor[x[0]] = x[1]
            cursor.execute("select user_id, pharmacist_id from PHARMACIST")
            pharmacist = cursor.fetchall()
            userToPharmacist = {}
            for x in pharmacist:
                userToPharmacist[x[0]] = x[1]
            attribute = ["username", "fname", "lname", "password", "user_type", "occupation_id"]
            column = [{"title":x, "dataKey":x, "key":x} for x in attribute]
            if (user == []):
                message = (True, "No User", user, column)
            else :
                listOfUser = [{} for i in range(len(user))]
                for i in range(len(user)):
                    for j in range(5):
                        listOfUser[i][attribute[j]] = user[i][j].strip()
                    print(user[i][5], "\n")
                    if user[i][4].strip() == "Patient":
                        listOfUser[i][attribute[5]] = userToPatient[user[i][5]]
                    elif user[i][4].strip() == "Doctor":
                        listOfUser[i][attribute[5]] = userToDoctor[user[i][5]]
                    elif user[i][4].strip() == "Pharmacist":
                        listOfUser[i][attribute[5]] = userToPharmacist[user[i][5]]
                message = (True, "Success", listOfUser, column)
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message
    
print(showUser())