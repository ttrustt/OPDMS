import os
import mysql.connector
from mysql.connector import Error
from mysql.connector import errorcode
from dotenv import load_dotenv
import json
from flask import Flask, request, jsonify, make_response, flash, redirect, url_for
from datetime import datetime


def connect():
    try:
        connection = mysql.connector.connect(host='35.185.182.63',
                                            database='opdms',
                                            user='root',
                                            password='!Opdmstrust69')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            message = (True, "Connected to MySQL Server version ", db_Info)  

    except Error as e:
        message = (False,"Error while connecting to MySQL", e)
    return (connection, message)


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

    (connection, message) = connect()
    if (message[0]):
        try:
            cursor = connection.cursor()
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

    (connection, message) = connect()
    if (message[0]):
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

    (connection, message) = connect()
    if (message[0]):
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
    
    (connection, message) = connect()
    if (message[0]):
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
    (connection, message) = connect()
    if (message[0]):
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
            attr = ["fname", "lname", "user_type", "username", "password", "occupation_id"]
            column = [{"title":x, "dataKey":x, "key":x} for x in attr]
            if (user == []):
                message = (True, "No User", user, column)
            else :
                listOfUser = [{} for i in range(len(user))]
                for i in range(len(user)):
                    for j in range(5):
                        listOfUser[i][attribute[j]] = user[i][j].strip()
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


def showSchedule(listOfinput): 
    username = listOfinput[0]

    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            cursor.callproc('getSchedule',[username,])
            for i in cursor.stored_results() : 
                schedule = i.fetchall()
            listofColumn = ['doctor_id','doctor_name','clinic_name','location','room','time_in','time_out'] 
            column = [] 
            for i in listofColumn:
                column.append({'title':i,'dataKey':i,'key':i})
            print(schedule)
            if(schedule == []) : 
                message = (True,'No Schedule',schedule,column)
            else : 
                for i in range(len(schedule)): 
                    schedule[i] = {'doctor_id':schedule[i][0],'doctor_name':schedule[i][1],'clinic_name':schedule[i][2],'location':schedule[i][3],'room':schedule[i][4],'time_in':schedule[i][5].strftime('%Y-%m-%d %H:%M:%S'),'time_out':schedule[i][6].strftime('%Y-%m-%d %H:%M:%S')}
                message = (True,'Show Schedule Success',schedule,column)
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))   
        cursor.close()
        connection.close()
        return message


def getMedicineSQ(listOfinput): 
    PC = listOfinput[0] 
    
    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            cursor.execute("SELECT pharma_room_id, quantity, StorageLevel(SM.quantity, (SELECT SUM(quantity) FROM STORED_MEDICINE WHERE pharma_code='"+str(PC)+"')) \
                AS storage_level FROM STORED_MEDICINE SM WHERE pharma_code='"+str(PC)+"';")
            medicine = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
            listOfcolumn = ['pharma_room_id','quantity','storage_level']
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
    
    (connection, message) = connect()
    if (message[0]):
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
    pharma_room_id = listOfInput[0]
    supplier_id = listOfInput[1]
    manufacturing_date = listOfInput[2]
    expired_date = listOfInput[3]
    quantity = listOfInput[4]
    price = listOfInput[5]
    pharma_code = listOfInput[6]
    status = "ORDERED"
    
    (connection, message) = connect()
    if (message[0]):
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
    
    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            message = checkUpdateReceipt(listofInput) 
            if(len(message)==3 and message[0]) : 
                if(message[2].strip()=='PAID'):
                    message = (True,"Already Paid")
                else:
                    cursor.execute("UPDATE RECEIPT SET status = 'PAID' where receipt_number = '"+str(ID) +"';")
                    connection.commit()              
                    message = (True, "Success")
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message

def checkUpdateReceipt(listofInput):
    ID = listofInput[0]
    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            cursor.execute("select status from RECEIPT where receipt_number='"+str(ID)+"';")
            record = cursor.fetchall()
            if(record==[]):
                message = (True,"No have Receipt")
            else : 
                message = (True,"Success",record[0][0].strip())
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def updateMedicineOrder(listofInput): 
    ID = listofInput[0]
    
    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            message = checkUpdateMedicineOrder(listofInput) 
            if(len(message)==3 and message[0]) :
                if(message[2].strip()=="RECEIVED"):
                    message = (True,"Already Received")
                else : 
                    cursor.execute("UPDATE MEDICINE_ORDER SET status = 'RECEIVED' where order_id = '"+str(ID) +"';")
                    connection.commit()              
                    message = (True, "Success")
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message

def checkUpdateMedicineOrder(listofInput):
    ID = listofInput[0]
    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            cursor.execute("select status from MEDICINE_ORDER where order_id='"+str(ID)+"';")
            record = cursor.fetchall()
            if(record==[]):
                message = (True,"No have ID")
            else : 
                message = (True,"Success",record[0][0].strip())
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def addShow_icd(listofInput, connection, message, cursor):
    visit_number = listofInput[0]
    icd = []    
    for i in range(1,len(listofInput)):
        if listofInput[i] != '':
            icd.append(listofInput[i])
    # (connection, message) = connect()
    if (message[0]):
        try:
            # cursor = connection.cursor()
            for i in icd :
                cursor.execute("insert into SHOW_ICD values('"+str(visit_number)+"','"+i+"');")
                # connection.commit()     
            message = (True,'Sucess inputting ICD codes')     
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        # cursor.close()
        # connection.close()
    return message, cursor


def createDiagnosis(listOfInput):
    visit_number = listOfInput[0]
    schedule_number = listOfInput[1]
    doctors_recommendation = listOfInput[2]
    created_time = datetime.now()
    clinic_id = listOfInput[3]
    
    (connection, message) = connect()
    if (message[0]):
        try: 
            connection.autocommit = False
            cursor = connection.cursor()
            cursor.execute("insert into DIAGNOSIS (visit_number, schedule_number, doctors_recommendation, created_time, clinic_id) \
                values (""'"+str(visit_number)+"','"+str(schedule_number)+"','"+str(doctors_recommendation)+ \
                "','"+str(created_time)+"','"+str(clinic_id)+"');")
            
            diagnosisMessage = (True,'Create diagnosis success')
            if (len(listOfInput) > 4):
                show_icdMessage, cursor = addShow_icd([visit_number]+listOfInput[4:], connection, diagnosisMessage, cursor)
                if (diagnosisMessage[0] and show_icdMessage[0]):
                    # message = (True, diagnosisMessage[1] + " and " + show_icdMessage[1])
                    message = (True, "Success")
                elif (diagnosisMessage[0] and not show_icdMessage[0]):
                    # message = (False, "Create diagnosis success but cannot add to Show_icd")
                    message = (False, show_icdMessage[1])
                elif (not diagnosisMessage[0] and not show_icdMessage[0]):
                    # message = (False, "Cannot create diagnosis success and cannot add to Show_icd")
                    message = (False, diagnosisMessage[0] + show_icdMessage[1])

                connection.commit()
            else:
                message = diagnosisMessage
        except Error as e:
            message = (False,("Error while executing to MySQL "+str(e)))
            connection.rollback()
        cursor.close()
        connection.close()
    return message


def showScheduleForDoctor(listOfInput):
    username = listOfInput[0]
    
    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            cursor.callproc('getScheduleForDoctor',[username,])
            for i in cursor.stored_results() : 
                schedule = i.fetchall()
            listofColumn = ['patient_id','schedule_number','patient_name','clinic_name','location','room','time_in','time_out'] 
            column = [] 
            for i in listofColumn:
                column.append({'title':i,'dataKey':i,'key':i})
            if(schedule == []) : 
                message = (True,'No Schedule',schedule,column)
            else : 
                for i in range(len(schedule)): 
                    schedule[i] = {'patient_id':schedule[i][0],'schedule_number':schedule[i][1],'patient_name':schedule[i][2],'clinic_name':schedule[i][3],'location':schedule[i][4],'room':schedule[i][5],'time_in':schedule[i][6].strftime('%Y-%m-%d %H:%M:%S'),'time_out':schedule[i][7].strftime('%Y-%m-%d %H:%M:%S')}
                message = (True,'Show Schedule Success',schedule,column)
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))   
        cursor.close()
        connection.close()
        return message


def getVisitNumber():
    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            cursor.execute("select max(visit_number) from DIAGNOSIS")
            visit_number = cursor.fetchall()           
            message = (True, "Success", visit_number[0][0])
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def createDispensation(listOfinput):
    visitNumber = listOfinput[0] 
    receiptNumber = listOfinput[1] 
    pharmaCode = listOfinput[2]
    quantity = listOfinput[3]
    description = listOfinput[4] 
    
    (connection, message) = connect()
    if (message[0]):
        try:
            cursor = connection.cursor()
            cursor.execute("select price from MEDICINE where pharma_code='"+pharmaCode+"';")
            record = cursor.fetchall()
            print(record)
            if (record == []) : 
                price= 0 
            else : 
                price = record[0][0]
            cursor.execute("insert into DISPENSATION (quantity,price,created_time,visit_number,pharma_code,receipt_number,description) values('"+
                str(quantity)+"','"+str(round(price*float(quantity),2))+"','"+str(datetime.now())+"','"+str(visitNumber)+"','"+str(pharmaCode)+"','"+
                str(receiptNumber)+"','"+str(description)+"');")
            connection.commit()
            message = (True,"createDispensation Success")
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def getReceipt_number():
    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            cursor.execute("select max(receipt_number) from RECEIPT")
            visit_number = cursor.fetchall()           
            message = (True, "Success", visit_number[0][0])
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def createReceipt(): 
    receipt_number = getReceipt_number()[2]+1
    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            cursor.execute("insert into RECEIPT values('"+str(receipt_number)+"','UNPAID');")
            connection.commit()       
            message = (True, "Create Receipt Success", receipt_number)
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message


def deleteSchedule(listOfInput):
    try:  
        selected_schedule_number = int(listOfInput[0])
    except Exception as e : 
        selected_schedule_number = 1e9 
    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            cursor.execute("select schedule_number from SCHEDULE")
            temp = cursor.fetchall()
            schedule_number = [x[0] for x in temp]
        except Error as e : 
            message = (False,"Error while executing First to MySQL "+str(e))
        try:
            if selected_schedule_number in schedule_number :
                cursor.execute("delete from SCHEDULE where schedule_number = '"+str(selected_schedule_number)+"';")
                connection.commit()
                message = (True, "Delete schedule success")
            else : message = (True, "Selected schedule not exist")
        except Error as e : 
            message = (False,"Error while executing Second to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message

def deleteReceipt(listOfInput):
    try:  
        selected_receipt_number = int(listOfInput[0])
    except Exception as e : 
        selected_receipt_number = 1e9 
    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            cursor.execute("select receipt_number from RECEIPT")
            temp = cursor.fetchall()
            receipt_number = [x[0] for x in temp]
        except Error as e : 
            message = (False,"Error while executing First to MySQL "+str(e))
        try:
            if selected_receipt_number in receipt_number :
                cursor.execute("delete from RECEIPT where receipt_number = '"+str(selected_receipt_number)+"';")
                connection.commit()
                message = (True, "Delete receipt success")
            else : message = (True, "Selected receipt not exist")
        except Error as e : 
            message = (False,"Error while executing Second to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message

def showReceipt():
    (connection, message) = connect()
    if (message[0]):
        try: 
            cursor = connection.cursor()
            cursor.execute("select r.receipt_number, SUM(price) as total_price, CreditReceivable(SUM(price)) as credit_receivable, \
                            MAX(created_time) as created_time, r.status \
                            from DISPENSATION d right join RECEIPT r \
                            on d.receipt_number = r.receipt_number \
                            group by r.receipt_number \
                            order by MAX(created_time) IS NOT NULL, status DESC, MAX(created_time) DESC;")
            receipt = cursor.fetchall()
            attribute = ["receipt_number", "total_price", "credit_receivable", "created_time", "status"]
            column = [{"title":x, "dataKey":x, "key":x} for x in attribute]
            if (receipt == []) :
                message = (True, "No Receipt", receipt, column)
            else :
                data = [{} for i in range(len(receipt))]
                for i in range(len(receipt)):
                    for j in range(5):
                        data[i][attribute[j]] =  receipt[i][j]
                message = (True, "Show Receipt Success", data, column)
        except Error as e : 
            message = (False,"Error while executing to MySQL "+str(e))
        cursor.close()
        connection.close()
    return message