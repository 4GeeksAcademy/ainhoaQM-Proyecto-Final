--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.15 (Ubuntu 12.15-1.pgdg22.04+1)

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

--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO gitpod;

--
-- Name: category; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.category OWNER TO gitpod;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO gitpod;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: contact_messages; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.contact_messages (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(120) NOT NULL,
    message character varying(1000) NOT NULL
);


ALTER TABLE public.contact_messages OWNER TO gitpod;

--
-- Name: contact_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.contact_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_messages_id_seq OWNER TO gitpod;

--
-- Name: contact_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.contact_messages_id_seq OWNED BY public.contact_messages.id;


--
-- Name: discount_code; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.discount_code (
    id integer NOT NULL,
    code character varying(20) NOT NULL,
    percentage double precision NOT NULL
);


ALTER TABLE public.discount_code OWNER TO gitpod;

--
-- Name: discount_code_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.discount_code_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_code_id_seq OWNER TO gitpod;

--
-- Name: discount_code_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.discount_code_id_seq OWNED BY public.discount_code.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    total_price double precision NOT NULL,
    order_comments character varying(255),
    payment_method character varying(50) NOT NULL,
    order_date timestamp without time zone NOT NULL,
    discount_code_id integer,
    takeaway boolean NOT NULL
);


ALTER TABLE public."order" OWNER TO gitpod;

--
-- Name: order_detail; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.order_detail (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product character varying(100) NOT NULL,
    quantity integer NOT NULL,
    price double precision NOT NULL,
    order_date timestamp without time zone NOT NULL
);


ALTER TABLE public.order_detail OWNER TO gitpod;

--
-- Name: order_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.order_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_detail_id_seq OWNER TO gitpod;

--
-- Name: order_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.order_detail_id_seq OWNED BY public.order_detail.id;


--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO gitpod;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    price numeric(4,2) NOT NULL,
    image_url character varying(300) NOT NULL,
    category_id integer NOT NULL,
    description character varying(2000)
);


ALTER TABLE public.product OWNER TO gitpod;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO gitpod;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: reservation; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.reservation (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(120) NOT NULL,
    location character varying(200) NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    number_of_people integer NOT NULL
);


ALTER TABLE public.reservation OWNER TO gitpod;

--
-- Name: reservation_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.reservation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservation_id_seq OWNER TO gitpod;

--
-- Name: reservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.reservation_id_seq OWNED BY public.reservation.id;


--
-- Name: used_discount_code; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.used_discount_code (
    id integer NOT NULL,
    user_id integer NOT NULL,
    discount_code_id integer NOT NULL
);


ALTER TABLE public.used_discount_code OWNER TO gitpod;

--
-- Name: used_discount_code_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.used_discount_code_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.used_discount_code_id_seq OWNER TO gitpod;

--
-- Name: used_discount_code_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.used_discount_code_id_seq OWNED BY public.used_discount_code.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying(120) NOT NULL,
    password character varying(30) NOT NULL,
    user_name character varying(20) NOT NULL
);


ALTER TABLE public."user" OWNER TO gitpod;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO gitpod;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: contact_messages id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.contact_messages ALTER COLUMN id SET DEFAULT nextval('public.contact_messages_id_seq'::regclass);


--
-- Name: discount_code id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.discount_code ALTER COLUMN id SET DEFAULT nextval('public.discount_code_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: order_detail id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.order_detail ALTER COLUMN id SET DEFAULT nextval('public.order_detail_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: reservation id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.reservation ALTER COLUMN id SET DEFAULT nextval('public.reservation_id_seq'::regclass);


--
-- Name: used_discount_code id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.used_discount_code ALTER COLUMN id SET DEFAULT nextval('public.used_discount_code_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);



--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.category (id, name) FROM stdin;
1	Starters
2	Dishes
3	Drinks
4	Desserts
\.


--
-- Data for Name: contact_messages; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.contact_messages (id, name, email, message) FROM stdin;
5	Ainhoa QM	qm.ainhoa99@gmail.com	probando
6	Ainhoa QM	qm.ainhoa99@gmail.com	hola
7	Ainhoa QM	hola@gmail.com	hola
8	Ainhoa QM	qm.ainhoa99@gmail.com	mmmmm
9	Ainhoa QM	qm.ainhoa99@gmail.com	sss
10	sss	agriobal@gmail.com	ssssss
11	Ainhoa QM	qm.ainhoa99@gmail.com	aaaa
12	Ainhoa QM	qm.ainhoa99@gmail.com	aiaiaia
13	Ainhoa QM	qm.ainhoa99@gmail.com	sssss
14	Ainhoa QM	qm.ainhoa99@gmail.com	jsjskj
15	Ainhoa QM	qm.ainhoa99@gmail.com	jdqwji
16	Ainhoa QM	qm.ainhoa99@gmail.com	aaa
17	aa	qm.ainhoa99@gmail.com	aaaa
18	Ainhoa QM	qm.ainhoa99@gmail.com	sss
26	Ainhoa 	qm.ainhoa99@gmail.com	hhuoihuihui
28	Ainhoa	qm.ainhoa99@gmail.com	kkkkk
\.


--
-- Data for Name: discount_code; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.discount_code (id, code, percentage) FROM stdin;
5	1erComerComida	10
6	XMiCaraBonita	50
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.product (id, name, price, image_url, category_id, description) FROM stdin;
1	Agua	1.50	https://s4d-images.telepizza.es/Products/Original/Botella_de_Aqua-1009.jpg	3	\N
3	Coca Cola Zero	2.00	https://s4d-images.telepizza.es/Products/Original/Coca-Cola_Zero_500ml_-2752.jpg	3	\N
4	Fanta Limón	2.00	https://s4d-images.telepizza.es/Products/Original/Fanta_Limon_500ml_-2761.jpg	3	\N
5	Fanta Naranja	2.00	https://s4d-images.telepizza.es/Products/Original/Fanta_Naranja_500ml_-2767.jpg	3	\N
6	Nestea	2.00	https://s4d-images.telepizza.es/Products/Original/Nestea_Te_Negro_Limon_500ml_-2530.jpg	3	\N
7	Sprite	2.00	https://s4d-images.telepizza.es/Products/Original/Sprite_Lima-Limon_500ml_-2782.jpg	3	\N
8	Aquarius Limón	2.00	https://s4d-images.telepizza.es/Products/Original/Aquarius_Limon_500ml_-2515.jpg	3	\N
9	Aquarius Naranja	2.00	https://s4d-images.telepizza.es/Products/Original/Aquarius_Naranja_500ml_-2516.jpg	3	\N
2	Coca Cola	2.00	https://s4d-images.telepizza.es/Products/Original/Coca-Cola_Original_500ml_-2747.jpg	3	\N
10	Natillas	4.10	https://www.quieropostre.com/wp-content/uploads/2021/10/natillas-caseras-400x250.jpg	4	\N
11	Arroz con Leche	4.30	https://www.quieropostre.com/wp-content/uploads/2022/04/arroz-con-leche-400x250.jpg	4	\N
12	Tiramisú	4.60	https://www.quieropostre.com/wp-content/uploads/2021/10/receta-del-tiramisu-400x250.jpg	4	\N
18	Helado Haribo	1.45	https://s4d-images.telepizza.es/Products/Original/Helado_Haribo-402.jpg	4	\N
19	Frigopie	1.45	https://s4d-images.telepizza.es/Products/Original/Frigopie-392.jpg	4	\N
20	Frigo Chuches	1.65	https://s4d-images.telepizza.es/Products/Original/Frigo_Chuches-397.jpg	4	\N
15	Brownie	3.90	https://www.quieropostre.com/wp-content/uploads/2020/09/chocolate-brownie-nuts-400x250.jpg	4	\N
17	Cornetto Nocilla	1.45	https://s4d-images.telepizza.es/Products/Original/Helado_Cornetto_Nocilla-1469.jpg	4	\N
14	Carrot Cake	5.60	https://www.quieropostre.com/wp-content/uploads/2020/09/pastel-de-zanahoria-400x250.png	4	\N
13	Flan de huevo	3.60	https://www.quieropostre.com/wp-content/uploads/2021/08/flan-huevo-casero-receta-abuela-400x250.jpg	4	\N
21	Risoto de Setas	5.20	https://www.nococinomas.es/1020-home_default/arroz-meloso-al-parmesano-y-setas.jpg	2	\N
22	Ají de Pollo	6.70	https://www.nococinomas.es/795-home_default/aji-de-pollo.jpg	2	\N
23	Arroz A Banda	6.10	https://www.nococinomas.es/887-home_default/arroz-a-banda.jpg	2	\N
24	Arroz A Caldoso	4.90	https://www.nococinomas.es/996-home_default/arroz-caldoso.jpg	2	\N
25	Arroz Campero	6.15	https://www.nococinomas.es/888-home_default/arroz-campero.jpg	2	\N
26	Arroz Negro	6.15	https://www.nococinomas.es/891-home_default/arroz-negro.jpg	2	\N
27	Arroz Con Pollo	6.15	https://www.nococinomas.es/890-home_default/arroz-con-pollo.jpg	2	\N
28	Paella	6.15	https://www.nococinomas.es/879-home_default/paella-vegetal.jpg	2	\N
29	Ensalada de la Huerta	5.20	https://images.squarespace-cdn.com/content/v1/5f3f14c5776f773dc0b75c25/1602783612659-1VR2SXYE2I1DOMP8PAB4/IMG_2515.jpg?format=500w	1	\N
30	Ensalada de Col	5.20	https://www.miplato.es/tienda/1045-home_default/ensalada-de-col-con-nueces-pasas-y-manzana.jpg	1	\N
31	Ensalada de Garbanzos	5.40	https://www.miplato.es/tienda/1047-home_default/ensalada-de-garbanzos-acelgas-y-hummus.jpg	1	\N
32	Ensalada de Pasta	5.40	https://www.miplato.es/tienda/1048-home_default/ensalada-de-pasta-con-atun-y-gambas.jpg	1	\N
33	Tabulé de Quinoa	5.40	https://www.miplato.es/tienda/1094-home_default/tabule-de-quinoa.jpg	1	\N
\.


--
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.reservation (id, name, email, location, date, "time", number_of_people) FROM stdin;
2	Ainhoa	qm.ainhoa99@gmail.com	Calle Falsa, 123 CP: 00000 Barcelona	2023-10-18	13:53:00	8
3	Ainhoa	qm.ainhoa99@gmail.com	Calle Ficticia, 456 CP: 00000 Madrid	2023-10-25	20:55:00	5
4	Ainhoa	joiqdjid@hotmail.com	Calle Falsa, 123 CP: 00000 Barcelona	2023-10-27	14:57:00	1
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public."user" (id, email, password, user_name) FROM stdin;
1	qm.ainhoa99@gmail.com	ainhoa123	Ainhoa
2	Alba@gmail.com	alba1234	Alba
3	hsh@gmail.com	12345678	hola
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.category_id_seq', 4, true);


--
-- Name: contact_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.contact_messages_id_seq', 28, true);


--
-- Name: discount_code_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.discount_code_id_seq', 6, true);


--
-- Name: order_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.order_detail_id_seq', 1, false);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.order_id_seq', 1, false);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.product_id_seq', 33, true);


--
-- Name: reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.reservation_id_seq', 4, true);


--
-- Name: used_discount_code_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.used_discount_code_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.user_id_seq', 3, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: category category_name_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_name_key UNIQUE (name);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: contact_messages contact_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.contact_messages
    ADD CONSTRAINT contact_messages_pkey PRIMARY KEY (id);


--
-- Name: discount_code discount_code_code_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.discount_code
    ADD CONSTRAINT discount_code_code_key UNIQUE (code);


--
-- Name: discount_code discount_code_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.discount_code
    ADD CONSTRAINT discount_code_pkey PRIMARY KEY (id);


--
-- Name: order_detail order_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT order_detail_pkey PRIMARY KEY (id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: reservation reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id);


--
-- Name: used_discount_code used_discount_code_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.used_discount_code
    ADD CONSTRAINT used_discount_code_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: order_detail order_detail_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT order_detail_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."order"(id);


--
-- Name: order order_discount_code_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_discount_code_id_fkey FOREIGN KEY (discount_code_id) REFERENCES public.discount_code(id);


--
-- Name: order order_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: product product_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: used_discount_code used_discount_code_discount_code_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.used_discount_code
    ADD CONSTRAINT used_discount_code_discount_code_id_fkey FOREIGN KEY (discount_code_id) REFERENCES public.discount_code(id);


--
-- Name: used_discount_code used_discount_code_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.used_discount_code
    ADD CONSTRAINT used_discount_code_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

