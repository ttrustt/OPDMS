DROP TABLE IF EXISTS `Employee`;
CREATE TABLE `Employee` (
  `Ssn` 		VARCHAR(9) NOT NULL,
  `Fname` 	VARCHAR(15) NOT NULL,
  `Minit` 	VARCHAR(1) NOT NULL,
  `Lname` 	VARCHAR(15) NOT NULL,
  `Bdate` 	DATE NOT NULL,
  `Address` 	VARCHAR(30),
  `Sex` 		ENUM('F', 'M') DEFAULT 'F',
  `Salary` 	DECIMAL(10, 2),
  `Super_ssn` VARCHAR(9),
  `Dno` 		INT(5) UNSIGNED,
  PRIMARY KEY (`Ssn`),
  CONSTRAINT `fk__Employee_Supser_ssn` 
    FOREIGN KEY `Employee`(`Super_ssn`) 
      REFERENCES `Employee`(`Ssn`) 
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Department`;
CREATE TABLE `Department` (
  `Dnumber`		INT(5) UNSIGNED NOT NULL,
  `Dname` 		VARCHAR(15) NOT NULL,
  `Mgr_ssn`		VARCHAR(9) NOT NULL,
  `Mgr_start_date`DATE,
  PRIMARY KEY (`Dnumber`),
  CONSTRAINT `fk__Department_Mgr_ssn` 
    FOREIGN KEY `Department`(`Mgr_ssn`) 
      REFERENCES `Employee`(`Ssn`) 
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Dept_Location`;
CREATE TABLE `Dept_Location` (
  `Dnumber`		INT(5) UNSIGNED NOT NULL,
  `Dlocation` 	VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Dnumber`, `Dlocation`),
  CONSTRAINT `fk__Dept_Location_Dnumber` 
    FOREIGN KEY `Department`(`Dnumber`) 
      REFERENCES `Department`(`Dnumber`) 
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Project`;
CREATE TABLE `Project` (
  `Pnumber`	INT(5) UNSIGNED NOT NULL,
  `Pname`		VARCHAR(15) NOT NULL,
  `Plocation`	VARCHAR(30) NOT NULL,
  `Dnum` 		INT(5) UNSIGNED NOT NULL,
  PRIMARY KEY (`Pnumber`),
  CONSTRAINT `fk__Project_Dnum` 
    FOREIGN KEY `Project`(`Dnum`) 
      REFERENCES `Department`(`Dnumber`) 
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Works_on`;
CREATE TABLE `Works_on` (
  `Pno`		INT(5) UNSIGNED NOT NULL,
  `Essn`		VARCHAR(9) NOT NULL,
  `Hours`		DECIMAL(3,1) UNSIGNED,
  PRIMARY KEY (`Pno`, `Essn`),
  CONSTRAINT `fk__Works_on_Essn` 
    FOREIGN KEY `Works_on`(`Essn`) 
      REFERENCES `Employee`(`Ssn`) 
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Dependent`;
CREATE TABLE `Dependent` (
  `Essn`		VARCHAR(9) NOT NULL,
  `Dependent_name` VARCHAR(15) NOT NULL,
  `Sex`		ENUM('F', 'M') DEFAULT 'F',
  `Bdate`		DATE,
  `Relationship` VARCHAR(8),
  PRIMARY KEY (`Essn`, `Dependent_name`)
);

INSERT INTO `EMPLOYEE` (`Ssn`, `Fname`, `Minit`, `Lname`, `Bdate`, `Address`, `Sex`, `Salary`, `Super_ssn`, `Dno`)
	VALUES 
    ('888665555','Chanon','A','Deachsupa','1994-03-11','Chulalongkorn U., BKK','M',180000,'888665555',5),
    ('333445555','Franklin','T','Wong','1955-12-08','638 Voss, Houston, TX','M',40000,'888665555',5),
    ('123456789','John','B','Smith','1965-01-09','731 Fondren, Houston, TX','M',30000,'333445555',5),
    ('453453453','Joyce','A','English','1972-07-31','5631 Rice, Houston, TX','F',25000,'333445555',5),
    ('666884444','Ramesh','K','Narayan','1962-09-15','975 Fire Oak, Humble, TX','M',38000,'333445555',5),
    ('987654321','Jennifer','S','Wallance','1941-06-20','291 Berry, Bellaire, TX','F',43000,'888665555',4),
    ('987987987','Ahmad','V','Jabbar','1969-03-29','980 Dallas, Houston, TX','M',25000,'987654321',4),
    ('999887777','Alicia','J','Zelaya','1968-01-19','3321 Castle, Spring, TX','F',25000,'987654321',4);
            
INSERT INTO `DEPARTMENT` 
	VALUES 
		(1,'Headquareters','888665555','1981-06-19'),
    (4,'Administration','987654321','1995-01-01'),
    (5,'Research','333445555','1988-05-22');
 
ALTER TABLE `Employee`
	ADD CONSTRAINT `fk__Employee_Dno` 
    FOREIGN KEY `Employee`(`Dno`) 
      REFERENCES `Department`(`Dnumber`) 
      ON DELETE CASCADE
      ON UPDATE CASCADE;
            
INSERT INTO `Dept_Location` 
	VALUES 
		(1,'Houston'),
    (4,'Stafford'),
    (5,'Chulalongkorn University'),
    (5,'Computer Engineering Department'),
    (5,'Software Engineering Lab.');

INSERT INTO `Project` 
	VALUES 
		(1,'T Virus','Software Engineering Lab.',5),
    (2,'G Virus','Software Engineering Lab.',5),
    (3,'Nemesis','Software Engineering Lab.',5),
    (10,'Computerization','Stafford',4),
    (20,'Reorganization','Houston',1),
    (30,'Newbenefits','Stafford',4);
        
INSERT INTO `Works_on`(`Essn`, `Pno`, `Hours`)
	VALUES 
		('123456789',1,32.5),
		('123456789',2,7.5),
		('333445555',2,20.0),
		('333445555',3,10.0),
		('333445555',10,10.0),
		('333445555',20,10.0),
		('453453453',1,20.0),
		('453453453',2,20.2),
		('666884444',3,40.0),
		('888665555',20,NULL),
		('987654321',20,15.0),
		('987654321',30,20.0),
		('987987987',10,53.0),
		('987987987',30,5.0),
		('999887777',10,10.0),
		('999887777',30,30.0);

INSERT INTO `DEPENDENT` 
	VALUES 
		('123456789','Alice','F','1988-12-30','Daughter'),
    ('123456789','Elizabeth','F','1967-05-05','Spouse'),
    ('123456789','Michael','M','1988-01-04','Son'),
    ('333445555','Alice','F','1986-04-05','Daughter'),
    ('333445555','Joy','F','1958-05-03','Spouse'),
    ('333445555','Sudarat Janocha','M','2010-03-16','G'),
    ('333445555','Sukanda Janocha','M','2007-03-01','G'),
    ('333445555','Theodore','M','1983-10-25','Son'),
    ('888665555','Nan Dechsupa','M','2016-03-01','Son'),
    ('888665555','Nee Dechsupa','F','2016-03-01','G'),
    ('987654321','Abner','M','1942-02-28','Spouse');
