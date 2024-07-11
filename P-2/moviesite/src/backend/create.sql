CREATE TABLE YOUTUBELITE.USERS(
    userid varchar(50),
    email varchar(20) UNIQUE NOT NULL,
    password char(8) UNIQUE NOT NULL,
    userlogo varchar(150),
    no_of_subscriber int,
    ad_count int,
    ad_on NUMBER,
    PRIMARY KEY (userid)

);

CREATE TABLE YOUTUBELITE.VIDEO(
    videoid varchar(20),
    premium_video NUMBER,
    videourl varchar(200),
    views int,
    likes int,
    dislikes int,
    poster varchar(200),
    uploadedby varchar(50),
    FOREIGN KEY (uploadedby) REFERENCES USERS(userid)
    ON DELETE SET NULL,
    PRIMARY KEY (videoid)
);

CREATE TABLE YOUTUBELITE.WATCHLATER(

    usersid varchar(50),
    videosid varchar(20),
    FOREIGN KEY (usersid) REFERENCES USERS(userid)
    ON DELETE SET NULL,
    FOREIGN KEY (videosid) REFERENCES VIDEO (videoid)
    ON DELETE SET NULL,
    PRIMARY KEY (usersid,videosid)
);

CREATE TABLE YOUTUBELITE.LIKEDVIDEO(
    likeduser varchar(50),
    likedvideo varchar(20),
    FOREIGN KEY (likeduser) REFERENCES USERS(userid)
    ON DELETE SET NULL,
    FOREIGN KEY (likedvideo) REFERENCES VIDEO (videoid)
    ON DELETE SET NULL,
    PRIMARY KEY (likeduser,likedvideo)

);
CREATE TABLE YOUTUBELITE.DISLIKEDVIDEO(
    dislikeduser varchar(50),
    dislikedvideo varchar(20),
    FOREIGN KEY (dislikeduser) REFERENCES USERS(userid)
    ON DELETE SET NULL,
    FOREIGN KEY (dislikedvideo) REFERENCES VIDEO (videoid)
    ON DELETE SET NULL,
    PRIMARY KEY (dislikeduser,dislikedvideo)

);

CREATE TABLE YOUTUBELITE.COMMENTEDUSER(
    commenteduserid varchar(50),
    comments varchar(2000),
    "times" date,
    commentid int,
    FOREIGN KEY (commenteduserid) REFERENCES USERS(userid)
    ON DELETE SET NULL,
    PRIMARY KEY (commentid)

);
CREATE TABLE YOUTUBELITE.COMMENTS(
    commentedvideoid varchar(20),
    commenteduserid varchar(50),
    commentids int,
    FOREIGN KEY (commenteduserid) REFERENCES USERS(userid)
    ON DELETE SET NULL,
    FOREIGN KEY (commentedvideoid) REFERENCES VIDEO (videoid)
    ON DELETE SET NULL,
    FOREIGN KEY (commentids) REFERENCES COMMENTEDUSER(commentid)
    ON DELETE SET NULL,
    PRIMARY KEY (commentids,commentedvideoid)
);
--DROP TABLE users;
--DROP TABLE likedvideo;
--DROP TABLE dislikedvideo;
--DROP TABLE video;
--DROP TABLE watchlater;
CREATE TABLE YOUTUBELITE.REPLIEDUSER(
    replieduserid varchar(50),
    reply varchar(2000),
    "times" date,
    commentid int,
    FOREIGN KEY(replieduserid) REFERENCES USERS(userid)
    ON DELETE SET NULL,
    FOREIGN KEY(commentid) REFERENCES COMMENTEDUSER(commentid)
    ON DELETE SET NULL,
    PRIMARY KEY (commentid)

);
CREATE TABLE YOUTUBELITE.REPLY(
    repliedvideoid varchar(20),
    repliedduserid varchar(50),
    commentids int,
    FOREIGN KEY (repliedduserid) REFERENCES USERS(userid)
    ON DELETE SET NULL,
    FOREIGN KEY (repliedvideoid) REFERENCES VIDEO (videoid)
    ON DELETE SET NULL,
    FOREIGN KEY (commentids) REFERENCES COMMENTEDUSER(commentid)
    ON DELETE SET NULL,
    PRIMARY KEY (commentids)
);
CREATE TABLE SUBSCRIBEDCHANNEL(
    subscribe_id varchar(50),
    subscriber_id varchar(50),
    FOREIGN KEY (subscribe_id) REFERENCES USERS(userid)
    ON DELETE SET NULL,
    FOREIGN KEY (subscriber_id) REFERENCES USERS(userid)
    ON DELETE SET NULL,
    PRIMARY KEY (subscribe_id,subscriber_id)

);
CREATE TABLE YOUTUBELITE.AD(
    adid varchar(20),
    adurl varchar(100),
    totalview int,
    company_name varchar(50),
    PRIMARY KEY (adid)
);
CREATE TABLE YOUTUBELITE.SHOWAD(
    videowithadid varchar(20),
    adsid varchar(20),
    FOREIGN KEY (videowithadid) REFERENCES VIDEO (videoid)
    ON DELETE SET NULL,
    FOREIGN KEY (adsid) REFERENCES AD(adid)
    ON DELETE set null,
    PRIMARY KEY(videowithadid,adsid)

);




