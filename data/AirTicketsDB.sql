

CREATE TABLE User (
	ID text PRIMARY KEY NOT NULL ,
	Fname text NOT NULL,
	Mname text NOT NULL,
	Lname text NOT NULL ,
	Cellphone text NOT NULL,
	Email text UNIQUE NOT NULL,
	Username text (20) NOT NULL,
	Password text (20) NOT NULL
	
);

-- #1 ENTITIES & RELATIONS

CREATE TABLE Admin (
	adminID text PRIMARY KEY NOT NULL,
	FOREIGN KEY (adminID) REFERENCES User(ID)
);

CREATE TABLE Customer (
	customerID text PRIMARY KEY NOT NULL,
	Country text NOT NULL,
	City text NOT NULL,
	Postcode text NOT NULL,
	Address text NOT NULL,
	Gender text NOT NULL ,
	totalJounreys integer DEFAULT 0 ,
	FOREIGN KEY (customerID) REFERENCES User(ID),
	CONSTRAINT CUSTOMER_SEX CHECK(Gender IN ("Male","Female","Other","Άντρας","Γυναίκα","Άλλο"))

);

CREATE TABLE Booking (
	bookingID text PRIMARY KEY NOT NULL ,
	Date date ,
	Time time 
);

CREATE TABLE Reserves (
	customerID text,
	bookingID text,
	FOREIGN KEY (customerID) REFERENCES Customer(customerID),
	FOREIGN KEY (bookingID) REFERENCES Booking(bookingID)


);

CREATE TABLE Ticket (
	ticketID text PRIMARY KEY NOT NULL ,
	NVA datetime ,
	NVB datetime ,
	Company text NOT NULL ,
	ticketType text NOT NULL,
	Cost float DEFAULT 0.0,
	purchaseDate datetime,
	Return boolean DEFAULT false
);

CREATE TABLE Journey (
	journeyID text PRIMARY KEY NOT NULL 
);

CREATE TABLE FlightLeg (
	flightID text PRIMARY KEY NOT NULL ,
	StartingPoint text NOT NULL ,
	Destination text NOT NULL,
	Frequency integer NOT NULL DEFAULT 1 ,
	weekDays text ,
	estimatedTime time  ,
	Miles float DEFAULT 0.0
	
);

CREATE TABLE Aircraft (
	aircraftID text PRIMARY KEY NOT NULL ,
	aircraftType text ,
	totalSeats integer 
);

CREATE TABLE Airport (
	airportID text PRIMARY KEY NOT NULL ,
	Country text NOT NULL,
	City text NOT NULL,
	airportName text NOT NULL
);

-- #2 ENTITIES & RELATIONS

CREATE TABLE Anent (
	bookingID text,
	ticketID text,
	FOREIGN KEY (bookingID) REFERENCES Booking(bookingID),
	FOREIGN KEY (ticketID) REFERENCES Ticket(ticketID)
);



CREATE TABLE Relates (
	ticketID text,
	journeyID text,
	FOREIGN KEY (ticketID) REFERENCES Ticket(ticketID),
	FOREIGN KEY (journeyID) REFERENCES Journey(journeyID)
);

CREATE TABLE Consists (
	journeyID text,
	flightID text,
	FOREIGN KEY (journeyID) REFERENCES Journey(journeyID),
	FOREIGN KEY (flightID) REFERENCES FlighLeg(legID)
);


CREATE TABLE Flies (
	aircraftID text ,
	flightID text ,
	FOREIGN KEY (flightID) REFERENCES FlighLeg(legID),
	FOREIGN KEY (aircraftID) REFERENCES Aircraft(aircraftID)
);

CREATE TABLE Starts (
	flightID text,
	airportID text,
	departureDateTime datetime,
	departureGate string,
	FOREIGN KEY (flightID) REFERENCES FlighLeg(legID),
	FOREIGN KEY (airportID) REFERENCES Airport(airportID)
);


CREATE TABLE Finishes (
	flightID text,
	airportID text,
	arrivalDateTime datetime,
	arrivalGate string,
	FOREIGN KEY (flightID) REFERENCES FlighLeg(legID),
	FOREIGN KEY (airportID) REFERENCES Airport(airportID)
);

















