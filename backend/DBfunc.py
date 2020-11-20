import os
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import json
from flask import Flask, request, jsonify, make_response, flash, redirect, url_for
from datetime import datetime


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
            cursor.execute("select username,password,user_type,fname,lname from SYSTEM_USER where username='"+username0+"'")
            usernamePassword = cursor.fetchall()
            if(usernamePassword ==[]) :
                message = (False,'Username Incorrect',None)
            elif(password0 != usernamePassword[0][1]):
                message = (False,'Passwod Incorrect',None)
            else :
                message = (True,'Login Success!',usernamePassword[0][0],usernamePassword[0][2].strip(),usernamePassword[0][3],usernamePassword[0][4])
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message 


def showMedicine(listOfinput): 
    username = listOfinput[0]
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
            cursor.callproc('getDispensation',[username,])
            for i in cursor.stored_results() : 
                medicine = i.fetchall()
            listofColumn = ['created_time','doctor_name','general_name','quantity','description'] 
            column = [] 
            for i in listofColumn:
                column.append({'title':i,'dataKey':i,'key':i})
            if(medicine == []) : 
                 message = (True,'No Medicine',medicine,column)
            else : 
                for i in range(len(medicine)): 
                    medicine[i] = {'created_time':medicine[i][0].strftime('%Y-%m-%d %H:%M:%S'),'doctor_name':medicine[i][1],'general_name':medicine[i][2],'quantity':medicine[i][3],'description':medicine[i][4].strip()}
                message = (True,'Show Medicine Success',medicine,column)
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))   
        cursor.close()
        connection.close()
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
    if (connection.is_connected()):
        try: 
            cursor = connection.cursor()
            cursor.execute("insert into SCHEDULE (patient_id, doctor_id, time_in, time_out, diagnosis_room_id) values (""'"+str(patient_id)+"','"+str(doctor_id)+"','"+str(time_in)+ \
                "','"+str(time_out)+"','"+str(diagnosis_room_id)+"');")
            connection.commit()
            message = (True,'Create appointment success!')
        except Error as e:
            message = (False,("Error while executing to MySQL "+str(e)))
        cursor.close()
        connection.close()
    return message


def showUser():
    message = 'error'
    try:
        connection = mysql.connector.connect(host='35.185.182.63',
                                            database='opdms',
                                            user='root',
                                            password='!Opdmstrust69')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            message = ("Connected to MySQL Server version ", db_Info)  

    except Error as e:
        message = (False,"Error while connecting to MySQL", e)
    if (connection.is_connected()):
        try: 
            cursor = connection.cursor()
            cursor.execute("select username, fname, lname from SYSTEM_USER")
            user = cursor.fetchall()           
            attribute = ["username", "fname", "lname"]
            column = [{"title":x, "dataKey":x, "key":x} for x in attribute]
            if (user == []):
                message = (True, "No User", user, column)
            else :
                listOfUser = [{} for i in range(len(user))]
                for i in range(len(user)):
                    for j in range(3):
                        listOfUser[i][attribute[j]] = user[i][j].strip()
                message = (True, "Success", listOfUser, column)
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def showSchedule(listOfinput): 
    username = listOfinput[0]
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
            cursor.callproc('getSchedule',[username,])
            for i in cursor.stored_results() : 
                schedule = i.fetchall()
            listofColumn = ['doctor_name','clinic_name','location','room','time_in','time_out'] 
            column = [] 
            for i in listofColumn:
                column.append({'title':i,'dataKey':i,'key':i})
            print(schedule)
            if(schedule == []) : 
                message = (True,'No Schedule',schedule,column)
            else : 
                for i in range(len(schedule)): 
                    schedule[i] = {'doctor_name':schedule[i][0],'clinic_name':schedule[i][1],'location':schedule[i][2],'room':schedule[i][3],'time_in':schedule[i][4].strftime('%Y-%m-%d %H:%M:%S'),'time_out':schedule[i][5].strftime('%Y-%m-%d %H:%M:%S')}
                message = (True,'Show Schedule Success',schedule,column)
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))   
        cursor.close()
        connection.close()
        return message


def getMedicineSQ(listOfinput): 
    PC = listOfinput[0] 
    message = 'error'
    try: 
        connection = mysql.connector.connect(host='localhost',
                                            database='opdms',
                                            user='root',
                                            password='kin184492318')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)  

    except Error as e:
        message = (False,"Error while connecting to MySQL", e)
    if (connection.is_connected()):
        try: 
            cursor = connection.cursor()
            cursor.execute("SELECT pharma_room_id, quantity FROM STORED_MEDICINE WHERE pharma_code='"+str(PC)+"';")
            medicine = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
            listOfcolumn = ['pharma_room_id','quantity']
            column=[]
            for i in listOfcolumn: 
                column.append({'title':i,'dataKey':i,'key':i})
            if(medicine ==[]):
                message = (True,'Not Medicine',medicine,column)
            else : 
                message = (True,'OK',medicine,column)
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def getPharmaRoomSQ(listOfinput): 
    PR = listOfinput[0] 
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
            cursor.execute("SELECT pharma_code, quantity FROM STORED_MEDICINE WHERE pharma_room_id='"+str(PR)+"';")
            message = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
            print('OK')
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def createMedicine(listOfInput):
    order_time = datetime.now()
    print(order_time)
    pharma_room_id = listOfInput[0]
    supplier_id = listOfInput[1]
    manufacturing_date = listOfInput[2]
    expired_date = listOfInput[3]
    quantity = listOfInput[4]
    price = listOfInput[5]
    pharma_code = listOfInput[6]
    status = "ORDERED"
    message = 'error'
    try:
        connection = mysql.connector.connect(host='35.185.182.63',
                                            database='opdms',
                                            user='root',
                                            password='!Opdmstrust69')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            message = ("Connected to MySQL Server version ", db_Info)  
    except Error as e:
        message =  (False,"Error while connecting to MySQL", e)
    if (connection.is_connected()):
        try: 
            cursor = connection.cursor()
            cursor.execute("insert into MEDICINE_ORDER (order_time, pharma_room_id, supplier_id, manufacturing_date, \
                expired_date, quantity, price, pharma_code, status) values (""'"+str(order_time)+"','"+str(pharma_room_id)+ \
                "','"+str(supplier_id)+"','"+str(manufacturing_date)+"','"+str(expired_date)+"','"+str(quantity)+ \
                "','"+str(price)+"','"+str(pharma_code)+"','"+str(status)+"');")
            connection.commit()              
            message = (True, "Success")
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def updateReceipt(listofInput): 
    ID = listofInput[0]
    try:
        connection = mysql.connector.connect(host='35.185.182.63',
                                            database='opdms',
                                            user='root',
                                            password='!Opdmstrust69')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            message = ("Connected to MySQL Server version ", db_Info)  
    except Error as e:
        message =(False,"Error while connecting to MySQL", e)
    if (connection.is_connected()):
        try: 
            cursor = connection.cursor()
            cursor.execute("UPDATE RECEIPT SET status = 'PAID' where receipt_number = '"+str(ID) +"';")
            connection.commit()              
            message = (True, "Success")
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def updateMedicineOrder(listofInput): 
    ID = listofInput[0]
    try:
        connection = mysql.connector.connect(host='35.185.182.63',
                                            database='opdms',
                                            user='root',
                                            password='!Opdmstrust69')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            message = ("Connected to MySQL Server version ", db_Info)  
    except Error as e:
        message = (False,"Error while connecting to MySQL", e)
    if (connection.is_connected()):
        try: 
            cursor = connection.cursor()
            cursor.execute("UPDATE MEDICINE_ORDER SET status = 'RECEIVED' where order_id = '"+str(ID) +"';")
            connection.commit()              
            message = (True, "Success")
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def addShow_icd(listofInput):
    visit_number = listofInput[0]
    icd = []    
    for i in range(1,len(listofInput)):
        icd.append(listofInput[i])
    try:
        connection = mysql.connector.connect(host='35.185.182.63',
                                            database='opdms',
                                            user='root',
                                            password='!Opdmstrust69')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            message = ("Connected to MySQL Server version ", db_Info)  
    except Error as e:
        message =(False,"Error while connecting to MySQL", e)
    if (connection.is_connected()):
        try:
            cursor = connection.cursor()
            for i in icd :
                cursor.execute("insert into SHOW_ICD values('"+str(visit_number)+"','"+i+"');")
                connection.commit()     
            message = (True,'Added to Show_icd')     
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def createDiagnosis(listOfInput):
    visit_number = listOfInput[0]
    schedule_number = listOfInput[1]
    doctors_recommendation = listOfInput[2]
    created_time = datetime.now()
    clinic_id = listOfInput[3]
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
    if (connection.is_connected()):
        try: 
            cursor = connection.cursor()
            cursor.execute("insert into DIAGNOSIS (visit_number, schedule_number, doctors_recommendation, created_time, clinic_id) \
                values (""'"+str(visit_number)+"','"+str(schedule_number)+"','"+str(doctors_recommendation)+ \
                "','"+str(created_time)+"','"+str(clinic_id)+"');")
            connection.commit()
            diagnosisMessage = (True,'Create diagnosis success')
            if (len(listOfInput) > 4):
                show_icdMessage = addShow_icd([visit_number]+listOfInput[4:])
                if (diagnosisMessage[0] and show_icdMessage[0]):
                    message = (True, diagnosisMessage[1] + " and " + show_icdMessage[1])
                elif (diagnosisMessage[0] and not show_icdMessage[0]):
                    message = (False, "Create diagnosis success but cannot add to Show_icd")
                elif (not diagnosisMessage[0] and not show_icdMessage[0]):
                    message = (False, "Cannot create diagnosis success and cannot add to Show_icd")
            else:
                message = diagnosisMessage
        except Error as e:
            message = (False,("Error while executing to MySQL "+str(e)))
        cursor.close()
        connection.close()
    return message