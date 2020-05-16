CREATE TABLE public.temptable (
    id				SERIAL				NOT NULL,
    title			VARCHAR(1000)		NOT NULL,
    type			VARCHAR(1000)		NOT NULL,
    thumbnail_url	VARCHAR(1000)		NOT NULL,
    html_iframe		VARCHAR(1000)		NOT NULL,
    author_url		VARCHAR(1000)		NOT NULL,
    downloaded		INTEGER 			NOT NULL,
    CONSTRAINT youtube_links_pkey2 PRIMARY KEY (id)
)

INSERT INTO temptable (
	id,
    title,
    type,
    thumbnail_url,
    html_iframe,
    author_url,
    downloaded
) 
SELECT 	id, title, type, thumbnail_url, html_iframe, author_url, downloaded
FROM youtube_links

DROP TABLE youtube_links

CREATE TABLE youtube_links
(
    id				SERIAL				NOT NULL,
    title			VARCHAR(1000)		NOT NULL,
    type			VARCHAR(1000)		NOT NULL,
    thumbnail_url	VARCHAR(1000)		NOT NULL,
    html_iframe		VARCHAR(1000)		NOT NULL,
    author_url		VARCHAR(1000)		NOT NULL,
    downloaded		INTEGER 			NOT NULL,
	user_id			INTEGER				NOT NULL,
    CONSTRAINT youtube_links_pkey PRIMARY KEY (id),
	CONSTRAINT user_id_pkey FOREIGN KEY (user_id) REFERENCES users (id)
)
INSERT INTO youtube_links (
	id,
    title,
    type,
    thumbnail_url,
    html_iframe,
    author_url,
    downloaded,
	user_id
)
SELECT 	id, title, type, thumbnail_url, html_iframe, author_url, downloaded, 1
FROM temptable

DROP TABLE IF EXISTS temptable