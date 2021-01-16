-- CREATE DATABASE ryde
--     WITH 
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     CONNECTION LIMIT = -1;

CREATE TABLE public.user
(
    id serial NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(80) NOT NULL,
	picture varchar,
    phone_number varchar(50) NOT NULL,
    rating numeric NOT NULL,
    votes integer NOT NULL,
	UNIQUE(email),
	PRIMARY KEY (id)
);

ALTER TABLE public.user
    OWNER to postgres;

CREATE TABLE public.city
(
    id serial NOT NULL,
    name character varying NOT NULL,
    latitude float,
    longitude float,
	UNIQUE(name),
    PRIMARY KEY (id)
);

ALTER TABLE public.city
    OWNER to postgres;

-- CREATE TYPE luggage_enum AS ENUM ('none', 'small', 'medium', 'large');

CREATE TABLE public.offer
(
    id serial NOT NULL PRIMARY KEY,
    start_id integer NOT NULL,
    destination_id integer NOT NULL,
    price integer NOT NULL,
    date timestamp with time zone NOT NULL,
    luggage integer NOT NULL,
    capacity integer NOT NULL,
    user_id integer NOT NULL,
    FOREIGN KEY (start_id)
        REFERENCES public.city (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    FOREIGN KEY (destination_id)
        REFERENCES public.city (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
	UNIQUE(user_id),
    FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE public.offer
    OWNER to postgres;
	
CREATE TABLE public.request
(
    id serial NOT NULL PRIMARY KEY,
    luggage integer NOT NULL,
    capacity integer NOT NULL,
    user_id integer NOT NULL,
    offer_id integer NOT NULL,
	UNIQUE(user_id, offer_id),
    FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    FOREIGN KEY (offer_id)
        REFERENCES public.offer (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE public.request
    OWNER to postgres;
	
CREATE TABLE public.message
(
    id serial NOT NULL PRIMARY KEY,
    content character varying NOT NULL,
    time_sent timestamp with time zone NOT NULL,
    sender_id integer NOT NULL,
    request_id integer NOT NULL,
    FOREIGN KEY (sender_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    FOREIGN KEY (request_id)
        REFERENCES public.request (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE public.message
    OWNER to postgres;
	
CREATE OR REPLACE FUNCTION public.update_rating()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
	IF NEW.rating IS NULL THEN
		NEW.rating := OLD.rating;
		NEW.votes := OLD.votes;
		RETURN NEW;
	END IF;
	
	NEW.rating := (OLD.rating * OLD.votes + NEW.rating) / (OLD.votes + 1);
	NEW.votes := OLD.votes + 1;
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.update_rating()
    OWNER TO postgres;
	
CREATE TRIGGER rating_trigger 
	BEFORE UPDATE
	OF rating ON public.user
FOR EACH ROW EXECUTE FUNCTION update_rating();

-- DROP TRIGGER rating_trigger on public.user;
	
INSERT INTO city(name, latitude, longitude) VALUES('София', 42.697708, 23.321867);
INSERT INTO city(name, latitude, longitude) VALUES('Пловдив', 42.144920, 24.750320);
INSERT INTO city(name, latitude, longitude) VALUES('Варна', 43.214050, 27.914734);
INSERT INTO city(name, latitude, longitude) VALUES('Бургас', 42.497681, 27.470030);
INSERT INTO city(name, latitude, longitude) VALUES('Русе', 43.848041, 25.954206);
INSERT INTO city(name, latitude, longitude) VALUES('Стара Загора', 42.424742, 25.625724);
INSERT INTO city(name) VALUES('Плевен');
INSERT INTO city(name) VALUES('Добрич');
INSERT INTO city(name) VALUES('Сливен');
INSERT INTO city(name) VALUES('Шумен');
INSERT INTO city(name) VALUES('Перник');
INSERT INTO city(name) VALUES('Пазарджик');
INSERT INTO city(name) VALUES('Ямбол');
INSERT INTO city(name) VALUES('Хасково');
INSERT INTO city(name) VALUES('Благоевград');
INSERT INTO city(name) VALUES('Велико Търново');
INSERT INTO city(name) VALUES('Враца');
INSERT INTO city(name) VALUES('Габрово');
INSERT INTO city(name) VALUES('Асеновград');
INSERT INTO city(name) VALUES('Видин');
INSERT INTO city(name) VALUES('Казанлък');
INSERT INTO city(name) VALUES('Кърджали');
INSERT INTO city(name) VALUES('Кюстендил');
INSERT INTO city(name) VALUES('Монтана');
INSERT INTO city(name) VALUES('Търговище');
INSERT INTO city(name) VALUES('Димитровград');
INSERT INTO city(name) VALUES('Силистра');
INSERT INTO city(name) VALUES('Ловеч');
INSERT INTO city(name) VALUES('Дупница');
INSERT INTO city(name) VALUES('Разград');
INSERT INTO city(name) VALUES('Горна Оряховица');
INSERT INTO city(name) VALUES('Свищов');
INSERT INTO city(name) VALUES('Петрич');
INSERT INTO city(name) VALUES('Смолян');
INSERT INTO city(name) VALUES('Сандански');
INSERT INTO city(name) VALUES('Самоков');
INSERT INTO city(name) VALUES('Велинград');
INSERT INTO city(name) VALUES('Севлиево');
INSERT INTO city(name) VALUES('Лом');
INSERT INTO city(name) VALUES('Нова Загора');
INSERT INTO city(name) VALUES('Карлово');
INSERT INTO city(name) VALUES('Айтос');
INSERT INTO city(name) VALUES('Троян');
INSERT INTO city(name) VALUES('Ботевград');
INSERT INTO city(name) VALUES('Харманли');
INSERT INTO city(name) VALUES('Пещера');
INSERT INTO city(name) VALUES('Гоце Делчев');
INSERT INTO city(name) VALUES('Свиленград');
INSERT INTO city(name) VALUES('Карнобат');
INSERT INTO city(name) VALUES('Панагюрище');
INSERT INTO city(name) VALUES('Чирпан');
INSERT INTO city(name) VALUES('Попово');
INSERT INTO city(name) VALUES('Раковски');
INSERT INTO city(name) VALUES('Радомир');
INSERT INTO city(name) VALUES('Първомай');
INSERT INTO city(name) VALUES('Нови Искър');
INSERT INTO city(name) VALUES('Поморие');
INSERT INTO city(name) VALUES('Несебър');
INSERT INTO city(name) VALUES('Червен бряг');
INSERT INTO city(name) VALUES('Козлодуй');
INSERT INTO city(name) VALUES('Ихтиман');
INSERT INTO city(name) VALUES('Нови пазар');
INSERT INTO city(name) VALUES('Берковица');
INSERT INTO city(name) VALUES('Раднево');
INSERT INTO city(name) VALUES('Провадия');
INSERT INTO city(name) VALUES('Разлог');
INSERT INTO city(name) VALUES('Балчик');
INSERT INTO city(name) VALUES('Бяла Слатина');
INSERT INTO city(name) VALUES('Каварна');
INSERT INTO city(name) VALUES('Костинброд');
INSERT INTO city(name) VALUES('Банкя');
INSERT INTO city(name) VALUES('Стамболийски');
INSERT INTO city(name) VALUES('Етрополе');
INSERT INTO city(name) VALUES('Кнежа');
INSERT INTO city(name) VALUES('Левски');
INSERT INTO city(name) VALUES('Павликени');
INSERT INTO city(name) VALUES('Мездра');
INSERT INTO city(name) VALUES('Елхово');
INSERT INTO city(name) VALUES('Тетевен');
INSERT INTO city(name) VALUES('Луковит');
INSERT INTO city(name) VALUES('Тутракан');
INSERT INTO city(name) VALUES('Трявна');
INSERT INTO city(name) VALUES('Девня');
INSERT INTO city(name) VALUES('Средец');
INSERT INTO city(name) VALUES('Омуртаг');
INSERT INTO city(name) VALUES('Сопот');
INSERT INTO city(name) VALUES('Исперих');
INSERT INTO city(name) VALUES('Велики Преслав');
INSERT INTO city(name) VALUES('Бяла');
INSERT INTO city(name) VALUES('Ракитово');
INSERT INTO city(name) VALUES('Гълъбово');
INSERT INTO city(name) VALUES('Кричим');
INSERT INTO city(name) VALUES('Лясковец');
INSERT INTO city(name) VALUES('Септември');
INSERT INTO city(name) VALUES('Момчилград');
INSERT INTO city(name) VALUES('Банско');
INSERT INTO city(name) VALUES('Белене');
INSERT INTO city(name) VALUES('Аксаково');
INSERT INTO city(name) VALUES('Белослав');
INSERT INTO city(name) VALUES('Своге');
INSERT INTO city(name) VALUES('Дряново');
INSERT INTO city(name) VALUES('Любимец');
INSERT INTO city(name) VALUES('Кубрат');
INSERT INTO city(name) VALUES('Пирдоп');
INSERT INTO city(name) VALUES('Елин Пелин');
INSERT INTO city(name) VALUES('Симитли');
INSERT INTO city(name) VALUES('Сливница');
INSERT INTO city(name) VALUES('Златоград');
INSERT INTO city(name) VALUES('Хисаря');
INSERT INTO city(name) VALUES('Дулово');
INSERT INTO city(name) VALUES('Долни Чифлик');
INSERT INTO city(name) VALUES('Симеоновград');
INSERT INTO city(name) VALUES('Генерал Тошево');
INSERT INTO city(name) VALUES('Тервел');
INSERT INTO city(name) VALUES('Костенец');
INSERT INTO city(name) VALUES('Девин');
INSERT INTO city(name) VALUES('Мадан');
INSERT INTO city(name) VALUES('Стралджа');
INSERT INTO city(name) VALUES('Царево');
INSERT INTO city(name) VALUES('Вършец');
INSERT INTO city(name) VALUES('Твърдица');
INSERT INTO city(name) VALUES('Куклен');
INSERT INTO city(name) VALUES('Бобов дол');
INSERT INTO city(name) VALUES('Котел');
INSERT INTO city(name) VALUES('Съединение');
INSERT INTO city(name) VALUES('Елена');
INSERT INTO city(name) VALUES('Оряхово');
INSERT INTO city(name) VALUES('Якоруда');
INSERT INTO city(name) VALUES('Божурище');
INSERT INTO city(name) VALUES('Тополовград');
INSERT INTO city(name) VALUES('Белоградчик');
INSERT INTO city(name) VALUES('Стражица');
INSERT INTO city(name) VALUES('Камено');
INSERT INTO city(name) VALUES('Чепеларе');
INSERT INTO city(name) VALUES('Созопол');
INSERT INTO city(name) VALUES('Перущица');
INSERT INTO city(name) VALUES('Суворово');
INSERT INTO city(name) VALUES('Златица');
INSERT INTO city(name) VALUES('Крумовград');
INSERT INTO city(name) VALUES('Долна Баня');
INSERT INTO city(name) VALUES('Дългопол');
INSERT INTO city(name) VALUES('Ветово');
INSERT INTO city(name) VALUES('Полски Тръмбеш');
INSERT INTO city(name) VALUES('Тръстеник');
INSERT INTO city(name) VALUES('Койнаре');
INSERT INTO city(name) VALUES('Долни Дъбник');
INSERT INTO city(name) VALUES('Славяново');
INSERT INTO city(name) VALUES('Годеч');
INSERT INTO city(name) VALUES('Правец');
INSERT INTO city(name) VALUES('Игнатиево');
INSERT INTO city(name) VALUES('Костандово');
INSERT INTO city(name) VALUES('Брацигово');
INSERT INTO city(name) VALUES('Две Могили');
INSERT INTO city(name) VALUES('Стрелча');
INSERT INTO city(name) VALUES('Неделино');
INSERT INTO city(name) VALUES('Свети Влас');
INSERT INTO city(name) VALUES('Сапарева баня');
INSERT INTO city(name) VALUES('Брезник');
INSERT INTO city(name) VALUES('Смядово');
INSERT INTO city(name) VALUES('Ардино');
INSERT INTO city(name) VALUES('Дебелец');
INSERT INTO city(name) VALUES('Никопол');
INSERT INTO city(name) VALUES('Шивачево');
INSERT INTO city(name) VALUES('Белово');
INSERT INTO city(name) VALUES('Цар Калоян');
INSERT INTO city(name) VALUES('Мартен');
INSERT INTO city(name) VALUES('Ивайловград');
INSERT INTO city(name) VALUES('Кресна');
INSERT INTO city(name) VALUES('Върбица');
INSERT INTO city(name) VALUES('Рудозем');
INSERT INTO city(name) VALUES('Вълчедръм');
INSERT INTO city(name) VALUES('Приморско');
INSERT INTO city(name) VALUES('Глоджево');
INSERT INTO city(name) VALUES('Летница');
INSERT INTO city(name) VALUES('Мъглиж');
INSERT INTO city(name) VALUES('Искър');
INSERT INTO city(name) VALUES('Шабла');
INSERT INTO city(name) VALUES('Гулянци');
INSERT INTO city(name) VALUES('Долна Митрополия');
INSERT INTO city(name) VALUES('Крън');
INSERT INTO city(name) VALUES('Вълчи дол');
INSERT INTO city(name) VALUES('Сливо поле');
INSERT INTO city(name) VALUES('Баня');
INSERT INTO city(name) VALUES('Драгоман');
INSERT INTO city(name) VALUES('Сунгурларе');
INSERT INTO city(name) VALUES('Батак');
INSERT INTO city(name) VALUES('Джебел');
INSERT INTO city(name) VALUES('Завет');
INSERT INTO city(name) VALUES('Криводол');
INSERT INTO city(name) VALUES('Мизия');
INSERT INTO city(name) VALUES('Белица');
INSERT INTO city(name) VALUES('Каспичан');
INSERT INTO city(name) VALUES('Кула');
INSERT INTO city(name) VALUES('Николаево');
INSERT INTO city(name) VALUES('Ветрен');
INSERT INTO city(name) VALUES('Гурково');
INSERT INTO city(name) VALUES('Роман');
INSERT INTO city(name) VALUES('Калофер');
INSERT INTO city(name) VALUES('Каблешково');
INSERT INTO city(name) VALUES('Априлци');
INSERT INTO city(name) VALUES('Бухово');
INSERT INTO city(name) VALUES('Долна Оряховица');
INSERT INTO city(name) VALUES('Павел баня');
INSERT INTO city(name) VALUES('Ябланица');
INSERT INTO city(name) VALUES('Рила');
INSERT INTO city(name) VALUES('Опака');
INSERT INTO city(name) VALUES('Угърчин');
INSERT INTO city(name) VALUES('Златарица');
INSERT INTO city(name) VALUES('Хаджидимово');
INSERT INTO city(name) VALUES('Добринище');
INSERT INTO city(name) VALUES('Обзор');
INSERT INTO city(name) VALUES('Бяла черква');
INSERT INTO city(name) VALUES('Дунавци');
INSERT INTO city(name) VALUES('Брегово');
INSERT INTO city(name) VALUES('Трън');
INSERT INTO city(name) VALUES('Садово');
INSERT INTO city(name) VALUES('Килифарево');
INSERT INTO city(name) VALUES('Лъки');
INSERT INTO city(name) VALUES('Малко Търново');
INSERT INTO city(name) VALUES('Доспат');
INSERT INTO city(name) VALUES('Копривщица');
INSERT INTO city(name) VALUES('Кочериново');
INSERT INTO city(name) VALUES('Лозница');
-- INSERT INTO city(name) VALUES('Бяла');
INSERT INTO city(name) VALUES('Борово');
INSERT INTO city(name) VALUES('Черноморец');
INSERT INTO city(name) VALUES('Батановци');
INSERT INTO city(name) VALUES('Пордим');
INSERT INTO city(name) VALUES('Ахелой');
INSERT INTO city(name) VALUES('Сухиндол');
INSERT INTO city(name) VALUES('Българово');
INSERT INTO city(name) VALUES('Брезово');
INSERT INTO city(name) VALUES('Главиница');
INSERT INTO city(name) VALUES('Каолиново');
INSERT INTO city(name) VALUES('Чипровци');
INSERT INTO city(name) VALUES('Меричлери');
INSERT INTO city(name) VALUES('Земен');
INSERT INTO city(name) VALUES('Плачковци');
INSERT INTO city(name) VALUES('Кермен');
INSERT INTO city(name) VALUES('Момин Проход');
INSERT INTO city(name) VALUES('Алфатар');
INSERT INTO city(name) VALUES('Грамада');
INSERT INTO city(name) VALUES('Сеново');
INSERT INTO city(name) VALUES('Бойчиновци');
INSERT INTO city(name) VALUES('Антоново');
INSERT INTO city(name) VALUES('Ахтопол');
INSERT INTO city(name) VALUES('Бобошево');
INSERT INTO city(name) VALUES('Шипка');
INSERT INTO city(name) VALUES('Болярово');
INSERT INTO city(name) VALUES('Димово');
INSERT INTO city(name) VALUES('Брусарци');
INSERT INTO city(name) VALUES('Китен');
INSERT INTO city(name) VALUES('Клисура');
INSERT INTO city(name) VALUES('Плиска');
INSERT INTO city(name) VALUES('Маджарово');
INSERT INTO city(name) VALUES('Мелник');

INSERT INTO public."user" (first_name, last_name, email, password, phone_number, rating, votes) 
VALUES ('Peter', 'Pan', 'peterpan@gmail.com', 'password', '088 1234 123', '4.8', '36');
INSERT INTO public."user" (first_name, last_name, email, password, phone_number, rating, votes) 
VALUES ('Anna', 'Smith', 'anna.smith@gmail.com', 'password123', '088 2345 234', '5', '2');
INSERT INTO public."user" (first_name, last_name, email, password, phone_number, rating, votes) 
VALUES ('John', 'Snow', 'john.snow@yahoo.com', 'youKnowNothing', '088 4321 432', '3.6', '22');
INSERT INTO public."user" (first_name, last_name, email, password, phone_number, rating, votes) 
VALUES ('Dave', 'Mustane', 'dave@megadeth', 'peaceSellsButWhosBuying', '088 5432 543', '4.6', '53');
INSERT INTO public."user" (first_name, last_name, email, password, phone_number, rating, votes) 
VALUES ('Kirk', 'Hammet', 'kirk@metallica.com', 'creepingDeath', '088 4321 666', '4.2', '46');
INSERT INTO public."user" (first_name, last_name, email, password, phone_number, rating, votes) 
VALUES ('George', 'Orwell', 'gerorge.orwell@gmail.com', 'animalFarm', '088 1984 321', '3.2', '27');
INSERT INTO public."user" (first_name, last_name, email, password, phone_number, rating, votes) 
VALUES ('Ray', 'Bradbury', 'ray.bradbury@bing.com', 'fahrenheit', '088 1234 451', '4.5', '66');
INSERT INTO public."user" (first_name, last_name, email, password, phone_number, rating, votes) 
VALUES ('Peter', 'Jonhson', 'peter.john@gmail.com', 'complexPassword', '088 5678 567', '3.5', '12');

INSERT INTO public.offer (start_id, destination_id, price, date, luggage, capacity, user_id) 
VALUES (1, 2, 25, '2020-01-20 17:00:00', 3, 4, 1);
INSERT INTO public.offer (start_id, destination_id, price, date, luggage, capacity, user_id) 
VALUES (2, 5, 50, '2020-01-22 14:00:00', 2, 2, 2);
INSERT INTO public.offer (start_id, destination_id, price, date, luggage, capacity, user_id) 
VALUES (3, 4, 10, '2020-01-18 18:00:00', 1, 2, 3);
INSERT INTO public.offer (start_id, destination_id, price, date, luggage, capacity, user_id) 
VALUES (3, 4, 15, '2020-01-21 20:00:00', 3, 4, 4);
-- INSERT INTO public.offer (start_id, destination_id, price, date, luggage, capacity, user_id) 
-- VALUES (1, 3, 40, '2020-01-23 12:00:00', 3, 4, 8);

INSERT INTO public.request  (luggage, capacity, user_id, offer_id)
VALUES (3, 4, 5, 1);
INSERT INTO public.request  (luggage, capacity, user_id, offer_id)
VALUES (2, 2, 6, 1);
INSERT INTO public.request  (luggage, capacity, user_id, offer_id)
VALUES (3, 3, 8, 1);
INSERT INTO public.request  (luggage, capacity, user_id, offer_id)
VALUES (1, 2, 7, 3);
INSERT INTO public.request  (luggage, capacity, user_id, offer_id)
VALUES (2, 2, 8, 3);
INSERT INTO public.request  (luggage, capacity, user_id, offer_id)
VALUES (2, 2, 8, 4);

INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Hello!', '2020-01-13 14:55:23', 5, 1);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Hi mate!', '2020-01-13 14:56:47', 1, 1);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('You have a question about the offer?', '2020-01-13 14:57:00', 1, 1);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Yes', '2020-01-13 14:58:10', 5, 1);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('I was wondering which route you were planning on taking?', '2020-01-13 14:58:25', 5, 1);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Ah well, the shortest one ofcourse :D', '2020-01-13 14:58:50', 1, 1);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Hahaha, so you a comediant? :D', '2020-01-13 14:59:12', 5, 1);

INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Hello!', '2020-01-14 14:55:23', 6, 2);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Hi mate!', '2020-01-14 14:56:47', 1, 2);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('You have a question about the offer?', '2020-01-14 14:57:00', 1, 2);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Yes', '2020-01-14 14:58:10', 6, 2);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('I was wondering which route you were planning on taking?', '2020-01-14 14:58:25', 6, 2);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Okay... Im either having a dejavu', '2020-01-14 14:58:50', 1, 2);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('or Ive already had this conversation...', '2020-01-14 14:58:55', 1, 2);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Hahaha, so you a comediant? :D', '2020-01-14 14:59:12', 6, 2);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('wha.. what? Are you pranking me???', '2020-01-14 14:59:39', 1, 2);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Ooookay... I guess I look through other offers...', '2020-01-14 15:00:05', 6, 2);

INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Hello!', '2020-01-13 18:55:23', 7, 3);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Hi there', '2020-01-13 18:56:47', 3, 3);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Whats up?', '2020-01-13 18:57:00', 3, 3);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Yes', '2020-01-13 18:58:10', 7, 3);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('I was wondering how long have you been driving for?', '2020-01-13 18:58:25', 7, 3);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Ah well, quite some time so no need to worry :D', '2020-01-13 18:58:50', 3, 3);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('Hahaha, oookay, thanks mate!', '2020-01-13 18:59:12', 7, 3);
INSERT INTO public.message (content, time_sent, sender_id, request_id)
VALUES ('No problem ^^', '2020-01-13 19:00:07', 3, 3);

SELECT * FROM public.user;