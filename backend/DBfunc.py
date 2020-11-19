import os
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
from flask import Flask, request, jsonify, make_response, flash, redirect, url_for
databasename='opdms'


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
    nationality = listOfSystem_user[9]
    sex = listOfSystem_user[10]
    birthdate = listOfSystem_user[11]
    email =listOfSystem_user[12]
    username = listOfSystem_user[13]
    password = listOfSystem_user[14]
    user_type = listOfSystem_user[15]
    message = 'error'
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
        message = (False,"Error while connecting to MySQL", e)
    
    if (connection.is_connected()):
        try:
            cursor.execute("insert into SYSTEM_USER (fname,lname,religion,address_,province,postal_code,identification_number,passport_number, \
                mobile_number,nationality,sex,birthdate,email,username,password,user_type) values (""'"+str(fname)+"','"+str(lname)+"','"+str(religion)+ \
                "','"+str(address)+"','"+str(province)+"','"+str(postal_code)+"','"+str(identification_number)+"','"+str(passport_number)+"','"+ \
                str(mobile_number)+"','"+str(nationality)+"','"+str(sex)+"','"+str(birthdate)+ "','"+str(email)+"','"+str(username)+"','"+str(password)+ \
                "','"+str(user_type)+"');")
            connection.commit()
            message =  (True,'Register success!')
        except Error as e:
            message = (False,str(e).split(':')[1])
        cursor.close()
        connection.close()
    return message 


####################################################

def login(listOfSystem_user):
    username0 = listOfSystem_user[0]
    password0 = listOfSystem_user[1]
    message = 'error'
    try:
        connection = mysql.connector.connect(host='35.185.182.63',
                                            database='opdms',
                                            user='root',
                                            password='!Opdmstrust69')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)  

    except Error as e:
        message = (False,"Error while connecting to MySQL", e)
    
    if (connection.is_connected()):
        try: 
            cursor = connection.cursor()
            cursor.execute("select username,password,user_type from SYSTEM_USER where username='"+username0+"'")
            usernamePassword = cursor.fetchall()
            if(usernamePassword ==[]) :
                # print(1)
                message = (False,'Username Incorrect',None)
            elif(password0 != usernamePassword[0][1]):
                # print(2)
                message = (False,'Passwod Incorrect',None)
            # print(3)
            else :
                message = (True,'Login Success!',usernamePassword[0][0],usernamePassword[0][2].strip())
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
        # print('finally')
        # return(False,("MySQL connection is closed"))
    return message 

def showMedicine(listOfinput): 
    userID = listOfinput[0] 
    message = 'error'
    try: 
        connection = mysql.connector.connect(host='35.185.182.63',
                                            database='opdms',
                                            user='root',
                                            password='!Opdmstrust69')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)  

    except Error as e:
        message = (False,"Error while connecting to MySQL", e)

    if (connection.is_connected()):
        try: 
            cursor = connection.cursor()
            cursor.execute("SELECT dp.created_time, CONCAT( u.fname, ' ', u.lname ) AS doctor_name, general_name, quantity, description \
                FROM diagnosis d, dispensation dp, medicine m, schedule s, doctor c, system_user u, patient p, system_user su \
                WHERE dp.visit_number = d.visit_number \
                AND dp.pharma_code = m.pharma_code \
                AND d.schedule_number = s.schedule_number \
                AND s.doctor_id = c.doctor_id \
                AND s.patient_id = p.patient_id \
                AND c.user_id = u.user_id \
                AND p.user_id = su.user_id \
                AND su.user_id = '"+ str(userID) +"';")
            medicine = cursor.fetchall()
            for i in range(len(medicine)): 
                medicine[i] = {cursor.description[i][0]:medicine[i][0].strftime('%y-%m-%d %H:%M:%S'),cursor.description[i][1]:medicine[i][1],cursor.description[i][2]:medicine[i][2],cursor.description[i][3]:medicine[i][3],cursor.description[i][4]:medicine[i][4].strip()}
            message = json.dumps(medicine)
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
        # print('finally')
        # return(False,("MySQL connection is closed"))
    return message 


def createAppointment(listOfSystem):
    patient_id = listOfSystem[0]
    doctor_id = listOfSystem[1]
    time_in = listOfSystem[2]
    time_out = listOfSystem[3]
    diagnosis_room_id = listOfSystem[4]
    message = 'error'
    try:
        connection = mysql.connector.connect(host='35.185.182.63',
                                            database='opdms',
                                            user='root',
                                            password='!Opdmstrust69')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)  
            cursor = connection.cursor()

    except Error as e:
        message = (False,("Error while connecting to MySQL", e))
    
    try:
        cursor.execute("insert into SCHEDULE (patient_id, doctor_id, time_in, time_out, diagnosis_room_id) values (""'"+str(patient_id)+"','"+str(doctor_id)+"','"+str(time_in)+ \
            "','"+str(time_out)+"','"+str(diagnosis_room_id)+"');")
        connection.commit()
        message = (True,'Create appointment success!')
    except Error as e:
        message = (False,("Error while executing to MySQL "+str(e)))

    if (connection.is_connected()):
        cursor.close()
        connection.close()
        message = (False,("MySQL connection is closed"))
    return message