--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-05-29 15:07:19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16554)
-- Name: Admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admin" (
    "adminID" text NOT NULL
);


ALTER TABLE public."Admin" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16624)
-- Name: Aircraft; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Aircraft" (
    "aircraftID" text NOT NULL,
    "aircraftType" text NOT NULL,
    "totalSeats" text NOT NULL
);


ALTER TABLE public."Aircraft" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16631)
-- Name: Airport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Airport" (
    "airportID" text NOT NULL,
    "Country" text NOT NULL,
    "City" text NOT NULL,
    "airportName" text NOT NULL
);


ALTER TABLE public."Airport" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16638)
-- Name: Anent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Anent" (
    "bookingID" text NOT NULL,
    "ticketID" text NOT NULL
);


ALTER TABLE public."Anent" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16578)
-- Name: Booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Booking" (
    "BookingID" text NOT NULL,
    "Date" date NOT NULL,
    "Time" time with time zone NOT NULL
);


ALTER TABLE public."Booking" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16668)
-- Name: Consists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Consists" (
    "journeyID" text NOT NULL,
    "flightID" text NOT NULL
);


ALTER TABLE public."Consists" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16566)
-- Name: Customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Customer" (
    "customerID" text NOT NULL,
    "Country" text NOT NULL,
    "City" text NOT NULL,
    "Postcode" text NOT NULL,
    "Address" text NOT NULL,
    "Gender" text
);


ALTER TABLE public."Customer" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16713)
-- Name: Finishes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Finishes" (
    "flightID" text NOT NULL,
    "airportID" text NOT NULL,
    "departureDate" date NOT NULL,
    "departureTime" time with time zone NOT NULL,
    "departureGate" text NOT NULL
);


ALTER TABLE public."Finishes" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16683)
-- Name: Flies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Flies" (
    "aircraftID" text,
    "flightID" text
);


ALTER TABLE public."Flies" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16616)
-- Name: FlightLeg; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FlightLeg" (
    "flightID" text NOT NULL,
    "StartingPoint" text NOT NULL,
    "Destination" text NOT NULL,
    "Frequency" integer NOT NULL,
    "weekDays" text NOT NULL,
    "estimatedTime" time without time zone NOT NULL,
    "Miles" double precision DEFAULT 0.0 NOT NULL
);


ALTER TABLE public."FlightLeg" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16609)
-- Name: Journey; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Journey" (
    "journeyID" text NOT NULL
);


ALTER TABLE public."Journey" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16653)
-- Name: Relates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Relates" (
    "ticketID" text NOT NULL,
    "journeyID" text NOT NULL
);


ALTER TABLE public."Relates" OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16585)
-- Name: Reserves; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reserves" (
    "customerID" text NOT NULL,
    "bookingID" text NOT NULL
);


ALTER TABLE public."Reserves" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16698)
-- Name: Starts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Starts" (
    "flightID" text NOT NULL,
    "airportID" text NOT NULL,
    "departureDate" date NOT NULL,
    "departureTime" time with time zone NOT NULL,
    "departureGate" text NOT NULL
);


ALTER TABLE public."Starts" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16600)
-- Name: Ticket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ticket" (
    "ticketID" text NOT NULL,
    "NVA" date NOT NULL,
    "NVB" date NOT NULL,
    "Company" text NOT NULL,
    "ticketType" text NOT NULL,
    "Cost" double precision DEFAULT 0.0 NOT NULL,
    "purchaseDate" date NOT NULL,
    "Return" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Ticket" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16547)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    "ID" text NOT NULL,
    "Fname" text NOT NULL,
    "Mname" text,
    "Lname" text NOT NULL,
    "Cellphone" text NOT NULL,
    "Email" text NOT NULL,
    "Username" text NOT NULL,
    "Password" text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 3400 (class 0 OID 16554)
-- Dependencies: 210
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admin" ("adminID") FROM stdin;
\.


--
-- TOC entry 3407 (class 0 OID 16624)
-- Dependencies: 217
-- Data for Name: Aircraft; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Aircraft" ("aircraftID", "aircraftType", "totalSeats") FROM stdin;
\.


--
-- TOC entry 3408 (class 0 OID 16631)
-- Dependencies: 218
-- Data for Name: Airport; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Airport" ("airportID", "Country", "City", "airportName") FROM stdin;
\.


--
-- TOC entry 3409 (class 0 OID 16638)
-- Dependencies: 219
-- Data for Name: Anent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Anent" ("bookingID", "ticketID") FROM stdin;
\.


--
-- TOC entry 3402 (class 0 OID 16578)
-- Dependencies: 212
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Booking" ("BookingID", "Date", "Time") FROM stdin;
\.


--
-- TOC entry 3411 (class 0 OID 16668)
-- Dependencies: 221
-- Data for Name: Consists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Consists" ("journeyID", "flightID") FROM stdin;
\.


--
-- TOC entry 3401 (class 0 OID 16566)
-- Dependencies: 211
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Customer" ("customerID", "Country", "City", "Postcode", "Address", "Gender") FROM stdin;
\.


--
-- TOC entry 3414 (class 0 OID 16713)
-- Dependencies: 224
-- Data for Name: Finishes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Finishes" ("flightID", "airportID", "departureDate", "departureTime", "departureGate") FROM stdin;
\.


--
-- TOC entry 3412 (class 0 OID 16683)
-- Dependencies: 222
-- Data for Name: Flies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Flies" ("aircraftID", "flightID") FROM stdin;
\.


--
-- TOC entry 3406 (class 0 OID 16616)
-- Dependencies: 216
-- Data for Name: FlightLeg; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FlightLeg" ("flightID", "StartingPoint", "Destination", "Frequency", "weekDays", "estimatedTime", "Miles") FROM stdin;
\.


--
-- TOC entry 3405 (class 0 OID 16609)
-- Dependencies: 215
-- Data for Name: Journey; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Journey" ("journeyID") FROM stdin;
\.


--
-- TOC entry 3410 (class 0 OID 16653)
-- Dependencies: 220
-- Data for Name: Relates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Relates" ("ticketID", "journeyID") FROM stdin;
\.


--
-- TOC entry 3403 (class 0 OID 16585)
-- Dependencies: 213
-- Data for Name: Reserves; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reserves" ("customerID", "bookingID") FROM stdin;
\.


--
-- TOC entry 3413 (class 0 OID 16698)
-- Dependencies: 223
-- Data for Name: Starts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Starts" ("flightID", "airportID", "departureDate", "departureTime", "departureGate") FROM stdin;
\.


--
-- TOC entry 3404 (class 0 OID 16600)
-- Dependencies: 214
-- Data for Name: Ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket" ("ticketID", "NVA", "NVB", "Company", "ticketType", "Cost", "purchaseDate", "Return") FROM stdin;
\.


--
-- TOC entry 3399 (class 0 OID 16547)
-- Dependencies: 209
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" ("ID", "Fname", "Mname", "Lname", "Cellphone", "Email", "Username", "Password") FROM stdin;
test\n	test\n	test	test	test	test	test	test\n
\.


--
-- TOC entry 3229 (class 2606 OID 16560)
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminID");


--
-- TOC entry 3241 (class 2606 OID 16630)
-- Name: Aircraft Aircraft_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Aircraft"
    ADD CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("aircraftID");


--
-- TOC entry 3243 (class 2606 OID 16637)
-- Name: Airport Airport_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Airport"
    ADD CONSTRAINT "Airport_pkey" PRIMARY KEY ("airportID");


--
-- TOC entry 3233 (class 2606 OID 16584)
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("BookingID");


--
-- TOC entry 3231 (class 2606 OID 16572)
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerID");


--
-- TOC entry 3239 (class 2606 OID 16623)
-- Name: FlightLeg FlightLeg_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FlightLeg"
    ADD CONSTRAINT "FlightLeg_pkey" PRIMARY KEY ("flightID");


--
-- TOC entry 3237 (class 2606 OID 16615)
-- Name: Journey Journey_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Journey"
    ADD CONSTRAINT "Journey_pkey" PRIMARY KEY ("journeyID");


--
-- TOC entry 3235 (class 2606 OID 16608)
-- Name: Ticket Ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketID");


--
-- TOC entry 3227 (class 2606 OID 16553)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3244 (class 2606 OID 16561)
-- Name: Admin AdminID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "AdminID" FOREIGN KEY ("adminID") REFERENCES public."User"("ID");


--
-- TOC entry 3245 (class 2606 OID 16573)
-- Name: Customer CustomerID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "CustomerID" FOREIGN KEY ("customerID") REFERENCES public."User"("ID");


--
-- TOC entry 3254 (class 2606 OID 16688)
-- Name: Flies aircraftID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Flies"
    ADD CONSTRAINT "aircraftID" FOREIGN KEY ("aircraftID") REFERENCES public."Aircraft"("aircraftID");


--
-- TOC entry 3257 (class 2606 OID 16708)
-- Name: Starts airportID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Starts"
    ADD CONSTRAINT "airportID" FOREIGN KEY ("airportID") REFERENCES public."Airport"("airportID");


--
-- TOC entry 3259 (class 2606 OID 16723)
-- Name: Finishes airportID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Finishes"
    ADD CONSTRAINT "airportID" FOREIGN KEY ("airportID") REFERENCES public."Airport"("airportID");


--
-- TOC entry 3246 (class 2606 OID 16590)
-- Name: Reserves bookingID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reserves"
    ADD CONSTRAINT "bookingID" FOREIGN KEY ("bookingID") REFERENCES public."Booking"("BookingID");


--
-- TOC entry 3248 (class 2606 OID 16643)
-- Name: Anent bookingID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Anent"
    ADD CONSTRAINT "bookingID" FOREIGN KEY ("bookingID") REFERENCES public."Booking"("BookingID");


--
-- TOC entry 3247 (class 2606 OID 16595)
-- Name: Reserves customerID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reserves"
    ADD CONSTRAINT "customerID" FOREIGN KEY ("customerID") REFERENCES public."Customer"("customerID");


--
-- TOC entry 3252 (class 2606 OID 16673)
-- Name: Consists flightID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Consists"
    ADD CONSTRAINT "flightID" FOREIGN KEY ("flightID") REFERENCES public."FlightLeg"("flightID");


--
-- TOC entry 3255 (class 2606 OID 16693)
-- Name: Flies flightID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Flies"
    ADD CONSTRAINT "flightID" FOREIGN KEY ("flightID") REFERENCES public."FlightLeg"("flightID");


--
-- TOC entry 3256 (class 2606 OID 16703)
-- Name: Starts flightID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Starts"
    ADD CONSTRAINT "flightID" FOREIGN KEY ("flightID") REFERENCES public."FlightLeg"("flightID");


--
-- TOC entry 3258 (class 2606 OID 16718)
-- Name: Finishes flightID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Finishes"
    ADD CONSTRAINT "flightID" FOREIGN KEY ("flightID") REFERENCES public."FlightLeg"("flightID");


--
-- TOC entry 3251 (class 2606 OID 16663)
-- Name: Relates journeyID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Relates"
    ADD CONSTRAINT "journeyID" FOREIGN KEY ("journeyID") REFERENCES public."Journey"("journeyID");


--
-- TOC entry 3253 (class 2606 OID 16678)
-- Name: Consists journeyID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Consists"
    ADD CONSTRAINT "journeyID" FOREIGN KEY ("journeyID") REFERENCES public."Journey"("journeyID");


--
-- TOC entry 3249 (class 2606 OID 16648)
-- Name: Anent ticketID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Anent"
    ADD CONSTRAINT "ticketID" FOREIGN KEY ("ticketID") REFERENCES public."Ticket"("ticketID");


--
-- TOC entry 3250 (class 2606 OID 16658)
-- Name: Relates ticketID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Relates"
    ADD CONSTRAINT "ticketID" FOREIGN KEY ("ticketID") REFERENCES public."Ticket"("ticketID");


-- Completed on 2022-05-29 15:07:20

--
-- PostgreSQL database dump complete
--

