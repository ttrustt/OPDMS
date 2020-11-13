from tkinter import *
from DBfunc import *



class RootWin() :
    def __init__(self) :
        root = Tk()
        
        header = Label(root, text="Main Menu")
        header.pack()
        
        addButton = Button(root, text="Register Customer", command=self.popAddWin)
        addButton.pack(side=TOP)
        searchButton = Button(root, text="Search by ID", command=self.popSearchWin)
        searchButton.pack(side=TOP)
        searchNameButton = Button(root, text="Search by Name", command=self.popSearchNameWin)
        searchNameButton.pack(side=TOP)
        exitButton = Button(root, text="Exit", command=self.exitProgram)
        exitButton.pack(side=BOTTOM)
        root.geometry('300x250+200+100')
        root.mainloop()
        
    def popAddWin(self) :
        r1 = RegisterWin("Customer Registration")
    def popSearchWin(self) :
        s1 = SearchWin("Customer Search")
    def popSearchNameWin(self) :
        s1 = SearchNameWin("Search by Name")
    def exitProgram(self) :
        exit()


class CustomerWindow() :
    def __init__(self, title) :
        self.cwin = Toplevel()
        self.cwin.title(title)
        self.cwin.geometry('200x150+100+100')
        
        self.label_id=Label(self.cwin, text="Id = ")
        self.label_name=Label(self.cwin, text="Name = ")

        self.entry_id=Entry(self.cwin)
        self.entry_name=Entry(self.cwin)

        self.button_submit=Button(self.cwin, text ="SUBMIT", command=self.cwin.destroy)
        self.button_exit=Button(self.cwin, text="EXIT", command=self.cwin.destroy)

        self.label_id.grid(row=0,column=0)
        self.label_name.grid(row=1,column=0)
        
        self.entry_id.grid(row=0,column=1)
        self.entry_name.grid(row=1,column=1)

        self.button_submit.grid(row=2,column=1)
        self.button_exit.grid(row=3, column=1)

        self.label_status=Label(self.cwin, text="")
        self.label_status.grid(row=5, columnspan=2)
        


        
class RegisterWin() :
    def __init__(self, title) :
        self.cwin = Toplevel()
        self.cwin.title(title)
        self.cwin.geometry('600x800+100+100')
        
        self.label_id=Label(self.cwin, text="id ")

        self.label_fname=Label(self.cwin, text="fname")
        self.label_lname=Label(self.cwin, text="lname")
        self.label_religion=Label(self.cwin, text="religion")
        self.label_address=Label(self.cwin, text="address")
        self.label_province=Label(self.cwin, text="province")
        self.label_postal_code=Label(self.cwin, text="postal code")
        self.label_identification_number=Label(self.cwin, text="identification number")
        self.label_passport_number=Label(self.cwin, text="passport number")
        self.label_mobile_number=Label(self.cwin, text="mobile number")
        self.label_nationality=Label(self.cwin, text="nationality")
        self.label_sex=Label(self.cwin, text="sex")
        self.label_birthdate=Label(self.cwin, text="birthdate")
        self.label_email=Label(self.cwin, text="email")
        self.label_username=Label(self.cwin, text="username")
        self.label_password=Label(self.cwin, text="password")
        self.label_user_type=Label(self.cwin, text="user_type")

        self.entry_id=Entry(self.cwin)
        self.entry_username=Entry(self.cwin)

        self.entry_fname=Entry(self.cwin)
        self.entry_lname=Entry(self.cwin)
        self.entry_religion=Entry(self.cwin)
        self.entry_address=Entry(self.cwin)
        self.entry_province=Entry(self.cwin)
        self.entry_postal_code=Entry(self.cwin)
        self.entry_identification_number=Entry(self.cwin)
        self.entry_passport_number=Entry(self.cwin)
        self.entry_nationality=Entry(self.cwin)
        self.entry_sex=Entry(self.cwin)
        self.entry_birthdate=Entry(self.cwin)
        self.entry_email=Entry(self.cwin)
        self.entry_username=Entry(self.cwin)
        self.entry_password=Entry(self.cwin)
        self.entry_user_type=Entry(self.cwin)

        self.button_submit=Button(self.cwin, text ="SUBMIT", command=self.cwin.destroy)
        self.button_exit=Button(self.cwin, text="EXIT", command=self.cwin.destroy)

        self.label_id.grid(row=0,column=0)
        self.label_name.grid(row=1,column=0)
        
        self.entry_id.grid(row=0,column=1)
        self.entry_name.grid(row=1,column=1)

        self.button_submit.grid(row=2,column=1)
        self.button_exit.grid(row=3, column=1)

        self.label_status=Label(self.cwin, text="")
        self.label_status.grid(row=5, columnspan=2)
        self.button_submit.configure(text="Register", command=self.submitNewCust)
        
    def submitNewCust(self) :
        self.cwin.title("Submitted")
        dataentry = [self.entry_id.get(), self.entry_name.get()]
        ########
        aCustomer = Customer(dataentry)
        retmsg = aCustomer.write()
        ########
        self.label_status.config(text=retmsg[1])
                

class SearchWin(CustomerWindow) :
    def __init__(self, title) :
        super().__init__(title)
        self.button_submit.config(text="Search", command=self.searchCust)
        self.button_submit=Button(self.cwin)
        
    def searchCust(self) :
        self.cwin.title("Searched")
        dataentry = [self.entry_id.get(), self.entry_name.get()]
        ##########
        aCustomer = Customer(dataentry)
        retmsg = aCustomer.search()
        #########

        if retmsg[0] == "0" :
            self.entry_id.delete(0, END)


            #######
            self.entry_id.insert(0, aCustomer.getInfo()[0])
            #######


            self.entry_name.delete(0, END)


            #######
            self.entry_name.insert(0, aCustomer.getInfo()[1])
            #######
            
        else :
            self.entry_name.delete(0, END)
            self.entry_name.insert(0, "?????")
        self.label_status.config(text=retmsg[1])
        

#Exercise Search by Name
class SearchNameWin(CustomerWindow) :
    def __init__(self, title) :
        super().__init__(title)
        self.button_submit.config(text="Search", command=self.searchNameCust)
        self.button_submit=Button(self.cwin)
        
    def searchNameCust(self) :
        self.cwin.title("Searched")
        dataentry = [self.entry_id.get(), self.entry_name.get()]
        #######
        aCustomer = Customer(dataentry)
        retmsg = aCustomer.searchName()
        #######

        if retmsg[0] == "0" :
            self.entry_id.delete(0, END)
            #########3
            self.entry_id.insert(0, aCustomer.getInfo()[0])
            self.entry_name.delete(0, END)
            self.entry_name.insert(0, aCustomer.getInfo()[1])
            ##########
            
        else :
            self.entry_id.delete(0, END)
            self.entry_id.insert(0, "?????")
        self.label_status.config(text=retmsg[1])
        

Mainmenu = RootWin()
