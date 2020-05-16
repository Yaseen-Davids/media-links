CREATE TABLE public.temptable (
    id				SERIAL				NOT NULL,
    title			VARCHAR(1000)		NOT NULL,
    type			VARCHAR(1000)		NOT NULL,
    thumbnail_url	VARCHAR(1000)		NOT NULL,
    html_iframe		VARCHAR(1000)		NOT NULL,
    author_url		VARCHAR(1000)		NOT NULL,
    downloaded		INTEGER 			NOT NULL,
	user_id			INTEGER				NOT NULL
)

INSERT INTO temptable (
	id,
    title,
    type,
    thumbnail_url,
    html_iframe,
    author_url,
    downloaded,
    user_id
) 
SELECT 	id, title, type, thumbnail_url, html_iframe, author_url, downloaded, user_id
FROM youtube_links

DROP TABLE youtube_links

CREATE TABLE media_links
(
    id				SERIAL				NOT NULL,
    title			VARCHAR(1000)		NOT NULL,
    type			VARCHAR(1000)		NOT NULL,
    thumbnail_url	VARCHAR(1000)		NOT NULL,
    html_iframe		VARCHAR(1000)		NOT NULL,
    author_url		VARCHAR(1000)		NOT NULL,
    downloaded		INTEGER 			NOT NULL,
	user_id			INTEGER				NOT NULL,
    date_added      TIMESTAMP           NULL,
    CONSTRAINT media_links_pkey PRIMARY KEY (id),
	CONSTRAINT user_id_pkey FOREIGN KEY (user_id) REFERENCES users (id)
)
INSERT INTO media_links (
	id,
    title,
    type,
    thumbnail_url,
    html_iframe,
    author_url,
    downloaded,
	user_id,
    date_added
)
SELECT 	id, title, type, thumbnail_url, html_iframe, author_url, downloaded, user_id, CURRENT_TIMESTAMP
FROM temptable

DROP TABLE IF EXISTS temptable