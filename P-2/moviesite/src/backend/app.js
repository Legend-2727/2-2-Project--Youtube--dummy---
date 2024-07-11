const express=require('express');
const app=express();
const multer=require('multer');
const path=require('path');
const bcrypt=require('bcrypt');
const cors=require('cors');
const fs=require("fs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
const oracledb=require('oracledb');
const b=path.join(__dirname,'../../../public/videos');
console.log(b);
app.use("/public",express.static(path.join(__dirname,"../../../public")));
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });
//   app.use("/public", express.static(path.join(__dirname, "../../../public"), {
//     setHeaders: (res, path) => {
//         console.log("lol");
//         // Set Cache-Control headers for video files
//         if (path.endsWith(".mp4")) {
//             console.log("Hello");
//             res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
//         }
//     }
// }));

  const dbConfig = {
    user: 'YOUTUBELITE',
    password: '2345',
    connectString: 'localhost/orclpdb',
    poolMin: 2,
    poolMax: 5,
    poolIncrement: 2,
    queueTimeout: 300,
    queueRequests:true
  };
  app.use(async(req,res,next)=>{
    try{
      if(!req.db)
      {
        const pool=await oracledb.createPool(dbConfig);
        req.db=pool;
      }
      next();
    }
    catch(error)
    {
      console.log("error");
    }
  })
  // (async () => {
  //   try {
  //     await oracledb.createPool(dbConfig);
  //     console.log('Connected to Oracle database.');
  //   } catch (err) {
  //     console.error('Error connecting to Oracle database:', err);
  //   }
  // })();

app.post('/signup', async (req, res) => {
    const { userid, email, password, userlogo ,no_of_subscriber,ad_count,ad_on} = req.body;
    const connection = await oracledb.getConnection();
    const checkquery = `SELECT COUNT(*) AS COUNT FROM USERS WHERE EMAIL=:email`;
    const insertQuery = `INSERT INTO USERS (USERID, EMAIL, PASSWORD, USERLOGO,NO_OF_SUBSCRIBER,AD_COUNT,AD_ON) 
                       VALUES (:userid, :email, :password, :userlogo,:no_of_subscriber,:ad_count,:ad_on)`;
  
    try {
      const resultCheck = await connection.execute(checkquery, { email: email });
      if (resultCheck.rows[0].COUNT > 0) {
        res.status(400).send('user exists');
      } else {
        const passwords = await bcrypt.hash(password, 10);
        const resultInsert = await connection.execute(insertQuery, {
          userid: userid,
          email: email,
          password: passwords,
          userlogo: userlogo,
          no_of_subscriber: no_of_subscriber,
          ad_count: ad_count,
          ad_on: ad_on
        }, { autoCommit: true });
  
        if (resultInsert.rowsAffected === 1) {
          const selectQuery = `SELECT * FROM USERS WHERE EMAIL=:email`;
          const resultSelect = await connection.execute(selectQuery, { email: email }, {
            resultSet: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
          });
  
          const resultSet = resultSelect.resultSet;
          const rows = await resultSet.getRows();
  
          // Close the resultSet and the connection
          await resultSet.close();
          await connection.close();
           
          res.json(rows[0]);
        } else {
          res.status(500).json({ error: 'Failed to insert user' });
        }
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to insert user' });
    }
  });

  app.post('/companysignup', async (req, res) => {
   // console.log("Hello");
    const { companyname, email, password, due, deadline } = req.body;
   // console.log(companyname);
  //  const connection = await oracledb.getConnection();
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    const checkquery = `SELECT COUNT(*) AS COUNT FROM COMPANY WHERE EMAIL=:email`;
    const insertQuery = `INSERT INTO COMPANY (COMPANY_NAME, EMAIL, PASSWORD, DUE, DEADLINE)
                       VALUES (:company_name, :email, :password, :due, TO_DATE(:deadline, 'YYYY-MM-DD'))`;
  
    
                       try {
                        const resultCheck = await connection.execute(checkquery, { email: email });
                        if (resultCheck.rows[0].COUNT > 0) {
                          res.status(400).send('user exists');
                        } else {
                          const passwords = await bcrypt.hash(password, 10);
                          const resultInsert = await connection.execute(insertQuery, {
                            company_name: companyname,
                            email: email,
                            password: passwords,
                            due:due,
                            deadline:deadline
                          }, { autoCommit: true });
                    
                          if (resultInsert.rowsAffected === 1) {
                            const selectQuery = `SELECT * FROM COMPANY WHERE EMAIL=:email`;
                            const resultSelect = await connection.execute(selectQuery, { email: email }, {
                              resultSet: true,
                              outFormat: oracledb.OUT_FORMAT_OBJECT
                            });
                    
                            const resultSet = resultSelect.resultSet;
                            const rows = await resultSet.getRows();
                    
                            // Close the resultSet and the connection
                            await resultSet.close();
                            await connection.close();
                             //console.log(rows[0]);
                            res.json(rows[0]);
                          } else {
                            res.status(500).json({ error: 'Failed to insert user' });
                          }
                        }
                      } catch (err) {
                        res.status(500).json({ error: 'Failed to insert user' });
                      }
                    });
                  
 
  

  

// app.post('/login',async(req,res)=>{
//     //const connection=await oracledb.getConnection();
//     //console.log("here");
//     const connection = await oracledb.getConnection({
//       user: 'YOUTUBELITE',
//       password: '2345',
//       connectString: 'localhost/orclpdb'
//     });
//    // console.log(req.body.email);
//     const query=`SELECT * FROM USERS WHERE EMAIL=:email`;
//     const resultc=await connection.execute(query,{email:req.body.email},{
//         resultSet:true,
//         outFormat:oracledb.OUT_FORMAT_OBJECT
//     });
//     const rcheck=resultc.resultSet;
//     const rows = await rcheck.getRows();

//     if(rows.length===0){
//       res.json()
//     }
//     //console.log(rows[0]);
//     if(await bcrypt.compare( req.body.password,rows[0].PASSWORD))
//     {
        
//         res.json(rows[0]);
//     }

// })

app.post('/login',async(req,res)=>{
  //const connection=await oracledb.getConnection();
  //console.log("here");
  const connection = await oracledb.getConnection({
    user: 'YOUTUBELITE',
    password: '2345',
    connectString: 'localhost/orclpdb'
  });
 // console.log(req.body.email);
  const query=`SELECT * FROM USERS WHERE EMAIL=:email`;
  const resultc=await connection.execute(query,{email:req.body.email},{
      resultSet:true,
      outFormat:oracledb.OUT_FORMAT_OBJECT
  });
  const rcheck=resultc.resultSet;
  const rows = await rcheck.getRows();

  if (rows.length === 0) {
    // No rows were returned for the given email
    res.status(404).json({ message: "Email not found." });
  } 
  else {
      if (await bcrypt.compare(req.body.password, rows[0].PASSWORD)) {
        res.json(rows[0]);
    } 
  else {
      res.status(401).json({ message: "Invalid password." });
    }
  }

  //resultSet.close(); // Close the result set
  connection.close(); // Close the database connection
});
app.post('/companylogin',async(req,res)=>{
   // const connection=await oracledb.getConnection();
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   // console.log(req.body.email);
    const query=`SELECT * FROM COMPANY WHERE EMAIL=:email`;
    const resultc=await connection.execute(query,{email:req.body.email},{
        resultSet:true,
        outFormat:oracledb.OUT_FORMAT_OBJECT
    });
    const rcheck=resultc.resultSet;
    const rows = await rcheck.getRows();
   // console.log(rows[0]);
   if (rows.length === 0) {
    // No rows were returned for the given email
    res.status(404).json({ message: "Email not found." });
  } 
  else {
      if (await bcrypt.compare(req.body.password, rows[0].PASSWORD)) {
        res.json(rows[0]);
    } 
  else {
      res.status(401).json({ message: "Invalid password." });
    }
  }

})
app.post('/videowithad', async (req, res) => {
  const { selectedVideos, videoid } = req.body;
  //console.log(selectedVideos);
  // Assuming you have installed 'oracledb' npm package to connect to Oracle database
  //const oracledb = require('oracledb');
  
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb',
      
    });

    
      const query = `
        INSERT INTO YOUTUBELITE.SHOWAD (VIDEOWITHADID,ADSID)
        VALUES (:videowithadid, :adsid)
      `;
      const r=await connection.execute(query,{
        videowithadid:videoid,
        adsid:selectedVideos[0]

    },{autoCommit:true});
     // const result = await connection.execute(query, bindParams);
     if(selectedVideos.length>1){
     const query2 = `
     INSERT INTO YOUTUBELITE.SHOWAD (VIDEOWITHADID,ADSID)
     VALUES (:videowithadid, :adsid)
   `;
   const r2=await connection.execute(query2,{
     videowithadid:videoid,
     adsid:selectedVideos[1]

 },{autoCommit:true});}
    

    await connection.close();
    
    res.send('Data inserted successfully.');
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('An error occurred while processing the request.');
  }
  

});
app.post('/add_to_watchlater',async(req,res)=>{
 // console.log(req.body.userid,req.body.videoid);
  try{
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    const query=`INSERT INTO WATCHLATER VALUES(:usersid,:videosid)`;
    const r=await connection.execute(query,{
        usersid:req.body.userid,
        videosid:req.body.videoid

    },{autoCommit:true});
  }catch(err)
  {
    console.log("Error");
  }

})


const { resourceLimits } = require('worker_threads');

const uploadfolder=path.join(__dirname,"/upload");
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if(!fs.existsSync("public")){
            fs.mkdirSync("public");
        }
        if(!fs.existsSync("public/videos")){
            fs.mkdirSync("public/videos");
        }
        cb(null,"public/videos");
    },
    filename:(req,file,cb)=>{
        const fn=file.originalname;
        cb(null,fn);
    }
})
const upload=multer({
    storage:storage,
    limits:{
        fileSize:500000000

    },
    fileFilter:(req,file,cb)=>{
        console.log(file);
        if(file.fieldname=='video')
        {
            if(file.mimetype=='video/mp4')
            {
                cb(null,true);
            }
            else{
                cb(null,false);
            }
        }
    },
})

app.post('/upload/:id',upload.single('video'),async(req,res)=>{
    const {title}=req.body;
    const {poster}=req.body;
    const userid=req.params.id;
    console.log(req.file.path,title,userid);
    req.file.path=req.file.path.replace(/\\/g, '/');
    const c=`/${req.file.path}`;
   // const connection=await oracledb.getConnection();
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    const q2=`SELECT MAX(TO_NUMBER(VIDEOID))  FROM VIDEO`;
    const result = await connection.execute(q2, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    
    const maxVideoId = result.rows[0]['MAX(TO_NUMBER(VIDEOID))'];
    const query=`INSERT INTO VIDEO VALUES(:videoid,:premium_video,:video_url,:views,:likes,:dislikes,:poster,:uploadedby,:title,SYSTIMESTAMP)`;
    const r=await connection.execute(query,{
        videoid:maxVideoId+1,
        premium_video:1,
        video_url:c,
        views:0,
        likes:0,
        dislikes:0,
        poster:poster,
        uploadedby:userid,
        title:title
        

    },{autoCommit:true});
    //res.status(200).send("Successful");
    const query2=`SELECT TO_NOTIFY FROM USER_NOTIFICATION WHERE NOTIFICATION_FROM=:USERID`;
    const resul = await connection.execute(query2, { USERID:userid}, {resultSet:true,
      outFormat:oracledb.OUT_FORMAT_OBJECT});
      const rcheck=resul.resultSet;
      const rows = await rcheck.getRows();
      //console.log(rows,34);
      const insertQuery = `INSERT INTO NOTIFICATION_VIDEO (NOTIFIED_USER, VIDEOID) VALUES (:notifiedUser, :videoid)`;
      for (const row of rows) {
        const insertResult = await connection.execute(insertQuery, { notifiedUser: row.TO_NOTIFY, videoid: maxVideoId + 1 },{autoCommit:true});
      }
      const updateQuery = `UPDATE USERS SET notification_count = notification_count + 1 WHERE USERID = :USERID`;

      for (const row of rows) {
        const updateResult = await connection.execute(updateQuery, { USERID: row.TO_NOTIFY }, { autoCommit: true });
      }
      

    await connection.close();

})

app.post('/uploadshorts/:id',upload.single('video'),async(req,res)=>{
 
  req.file.path=req.file.path.replace(/\\/g, '/');
  const c=`/${req.file.path}`;
  const connection = await oracledb.getConnection({
    user: 'YOUTUBELITE',
    password: '2345',
    connectString: 'localhost/orclpdb'
  });
  const query=`INSERT INTO SHORTS(SHORT_ID,SHORTURL,UPLOADED_BY,LIKES,DISLIKES) VALUES(:shortid,:shorturl,:userid,:likes,:dislikes)`;
  const r=await connection.execute(query,{
      shortid:2,
      shorturl:c,
      userid:req.params.id,
      likes:0,
      dislikes:0

  },{autoCommit:true});
  res.send("Successful");
  await connection.close();
})
app.post('/uploadad/:id',upload.single('video'),async(req,res)=>{
    const companyname=req.params.id;
    console.log(companyname);
    console.log(req.file.path);
    req.file.path=req.file.path.replace(/\\/g, '/');
    const c=`/${req.file.path}`;
   // const connection=await oracledb.getConnection();
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    const q2=`SELECT MAX(TO_NUMBER(ADID))  FROM AD`;
    const result = await connection.execute(q2, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    
    const maxVideoId = result.rows[0]['MAX(TO_NUMBER(ADID))'];
    const query=`INSERT INTO AD(ADID,ADURL,TOTALVIEW,COMPANY_NAME) VALUES(:adid,:adurl,:totalview,:company_name)`;
    const r=await connection.execute(query,{
        adid:maxVideoId+1,
        adurl:c,
        totalview:0,
        company_name:companyname

    },{autoCommit:true});
    res.send("Successful");
    await connection.close();
})
// app.get('/get_a_video/:videoid',async(req,res)=>{
//    // const connection=await oracledb.getConnection();
//    //console.log(req.params.videoid);
//     const connection = await oracledb.getConnection({
//       user: 'YOUTUBELITE',
//       password: '2345',
//       connectString: 'localhost/orclpdb'
//     });
//     const query=`SELECT U.USERID,U.USERLOGO,U.NO_OF_SUBSCRIBER,V.VIDEOURL,V.POSTER,V.VIEWS,V.LIKES ,V.CREATED_AT FROM USERS U JOIN VIDEO V ON (U.USERID=V.UPLOADEDBY) WHERE V.VIDEOID=:videoid`;
//     const resultc=await connection.execute(query,{videoid:req.params.videoid},{
//         resultSet:true,
//         outFormat:oracledb.OUT_FORMAT_OBJECT
//     });
//     const rcheck=resultc.resultSet;
//     const rows = await rcheck.getRows();
//     // console.log(rows,123);
//     res.send(rows);

// })
app.get('/get_a_video/:videoid', async (req, res) => {
  const videoid = req.params.videoid;
 

  try {
      const connection = await oracledb.getConnection({
          user: 'YOUTUBELITE',
          password: '2345',
          connectString: 'localhost/orclpdb'
      });

      const result = await connection.execute(
          `BEGIN :cursor := get_a_video(:videoid); END;`,
          {
              cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
              videoid: videoid
          }
      );

      const resultSet = result.outBinds.cursor;
      const rows = await resultSet.getRows();

      resultSet.close();
      // await connection.close();

      const transformedRows = rows.map((row) => ({
          USERID: row[0],
          USERLOGO: row[1],
          NO_OF_SUBSCRIBER: row[2],
          VIDEOURL: row[3],
          POSTER: row[4],
          VIEWS: row[5],
          LIKES: row[6],
          CREATED_AT: row[7]
      }));

     // console.log(transformedRows, 2345);
      res.send(transformedRows);
  } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.get('/all_ad_video', async (req, res) => {
    try {
      const connection = await oracledb.getConnection({
        user: 'YOUTUBELITE',
        password: '2345',
        connectString: 'localhost/orclpdb'
      });
      const query = `SELECT ADID, ADURL, TOTALVIEW, COMPANY_NAME
                     FROM YOUTUBELITE.AD
                     GROUP BY adid, adurl, totalview, company_name`;
      const result = await connection.execute(query, [], {
        outFormat: oracledb.OUT_FORMAT_OBJECT
      });
      
      res.send(result.rows);
    } catch (error) {
      console.error("Error fetching ad videos:", error);
      res.status(500).json({ error: 'Failed to fetch ad videos' });
    }
  });
  app.get('/get_viewed_video/:userid',async(req,res)=>{
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    const query=`SELECT VIEWEDVIDEO FROM RECENTVIEWED WHERE VIEWEDUSER=:userid`;
    const resultc=await connection.execute(query,{userid:req.params.userid},{
        resultSet:true,
        outFormat:oracledb.OUT_FORMAT_OBJECT
    });
    const rcheck=resultc.resultSet;
    const rows = await rcheck.getRows();
   // console.log(rows,123);
    res.send(rows);

  })
  



app.get('/all',async(req,res)=>{
  // console.log(1234);
    const connection=await req.db.getConnection();
    // const connection=await oracledb.getConnection();
    const query=`SELECT U.USERID,U.USERLOGO,V.VIDEOID,V.VIDEOURL,V.VIDEO_TITLE,V.POSTER,V.VIEWS FROM USERS U 
    JOIN VIDEO V ON (U.USERID=V.UPLOADEDBY)`;
    const result=await connection.execute(query,[],{
        resultSet:true,
        outFormat:oracledb.OUT_FORMAT_OBJECT
    })
    const r=result.resultSet;
    const finalr=await r.getRows();
    await r.close();
    connection.release();
    // await connection.close();
   

    res.send(finalr);
})


app.post('/all_ad',async(req,res)=>{
    //console.log("LO");
    //console.log(req.body.company_name);
    

    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    const query=`SELECT * FROM AD WHERE COMPANY_NAME=:company_name`;
    const result=await connection.execute(query,{company_name:req.body.company_name},{
        resultSet:true,
        outFormat:oracledb.OUT_FORMAT_OBJECT
    })
    const r=result.resultSet;
    const finalr=await r.getRows();
    await r.close();
    await connection.close();
    //console.log(finalr);
    res.send(finalr);

})
app.post('/ad_for_video',async(req,res)=>{
  const connection = await oracledb.getConnection({
    user: 'YOUTUBELITE',
    password: '2345',
    connectString: 'localhost/orclpdb'
  });
  //console.log(req.body.videoid,"for check");
  //query te change
  const query=`SELECT A.ADURL,A.ADID FROM AD A JOIN SHOWAD S ON (S.ADSID=A.ADID) WHERE s.VIDEOWITHADID=:videoid`;
  const result=await connection.execute(query,{videoid:req.body.videoid},{
    resultSet:true,
    outFormat:oracledb.OUT_FORMAT_OBJECT
  })
   const r=result.resultSet;
   const finalr=await r.getRows();
   await r.close();
   await connection.close();
//console.log(finalr);
   res.send(finalr);
})

app.post('/increment_AD',async(req,res)=>{
  const connection = await oracledb.getConnection({
    user: 'YOUTUBELITE',
    password: '2345',
    connectString: 'localhost/orclpdb'
  });
  //console.log(req.body.videoid,"for check");
  //query te change
  console.log("eigula ");
  console.log(req.body.videourl);
  console.log(req.body.adid);
  const query=`UPDATE SHOWAD 
          SET VIEWCOUNT=(SELECT VIEWCOUNT+1 FROM SHOWAD s 
              WHERE ADSID =:ad_id AND VIDEOWITHADID = (SELECT VIDEOID FROM VIDEO v
                WHERE VIDEOURL=:video_url))
          WHERE VIDEOWITHADID =(SELECT VIDEOID FROM VIDEO v
            WHERE VIDEOURL=:video_url) AND ADSID =:ad_id`;
  const result=await connection.execute(query,{video_url:req.body.videourl,ad_id:req.body.adid},{
    autoCommit:true
  })
   
   await connection.close();
//console.log(finalr);
  console.log("hoise ad er kaj");
   res.send("");
})

app.post('/all_vid_user', async (req, res) => {
   
    try {
        // console.log("Hello");
        const connection = await oracledb.getConnection({
          user: 'YOUTUBELITE',
          password: '2345',
          connectString: 'localhost/orclpdb'
        });
        
        const query = `SELECT U.USERID AS USERID,U.USERLOGO AS USERLOGO,U.NO_OF_SUBSCRIBER AS NO_OF_SUBSCRIBER,
        A.VIDEOID AS VIDEOID,A.VIDEOURL AS VIDEOURL,A.POSTER AS POSTER,A.VIEWS AS VIEWS,A.LIKES AS LIKES,A.DISLIKES AS DISLIKES,
        A.CREATED_AT AS CREATED_AT FROM
        USERS U,(SELECT * FROM VIDEO WHERE UPLOADEDBY = :userid ORDER BY CREATED_AT DESC)A WHERE A.UPLOADEDBY=U.USERID`;
        const result = await connection.execute(query, { userid: req.body.userid }, {
            resultSet: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });
        
        const r = result.resultSet;
        const finalr = await r.getRows();
        await r.close();
        await connection.close();
        res.send(finalr);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
app.post('/all_vid_popular', async (req, res) => {
  try {
      
      const connection = await oracledb.getConnection({
        user: 'YOUTUBELITE',
        password: '2345',
        connectString: 'localhost/orclpdb'
      });
      
     // console.log("Helloss");
      const query = `SELECT U.USERID AS USERID,U.USERLOGO AS USERLOGO,U.NO_OF_SUBSCRIBER AS NO_OF_SUBSCRIBER,
      A.VIDEOID AS VIDEOID,A.VIDEOURL AS VIDEOURL,A.POSTER AS POSTER,A.VIEWS AS VIEWS,A.LIKES AS LIKES,A.DISLIKES AS DISLIKES,
      A.CREATED_AT AS CREATED_AT FROM
      USERS U,(SELECT * FROM VIDEO WHERE UPLOADEDBY = :userid ORDER BY VIEWS DESC)A WHERE A.UPLOADEDBY=U.USERID`;
      const result = await connection.execute(query, { userid: req.body.userid }, {
          resultSet: true,
          outFormat: oracledb.OUT_FORMAT_OBJECT
      });
      
      const r = result.resultSet;
      const finalr = await r.getRows();
      await r.close();
      await connection.close();
      
     // console.log("Data fetched successfully:", finalr);
      res.send(finalr);
  } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send({ error: 'Internal Server Error' });
  }
});
app.post('/all_vid_old', async (req, res) => {
  //console.log("Fetching data for userid:", req.body.userid);
  try {
      
      const connection = await oracledb.getConnection({
        user: 'YOUTUBELITE',
        password: '2345',
        connectString: 'localhost/orclpdb'
      });
      
     // console.log("Helloss");
      const query = `SELECT U.USERID AS USERID,U.USERLOGO AS USERLOGO,U.NO_OF_SUBSCRIBER AS NO_OF_SUBSCRIBER,
      A.VIDEOID AS VIDEOID,A.VIDEOURL AS VIDEOURL,A.POSTER AS POSTER,A.VIEWS AS VIEWS,A.LIKES AS LIKES,A.DISLIKES AS DISLIKES,
      A.CREATED_AT AS CREATED_AT FROM
      USERS U,(SELECT * FROM VIDEO WHERE UPLOADEDBY = :userid ORDER BY CREATED_AT)A WHERE A.UPLOADEDBY=U.USERID`;
      const result = await connection.execute(query, { userid: req.body.userid }, {
          resultSet: true,
          outFormat: oracledb.OUT_FORMAT_OBJECT
      });
      
      const r = result.resultSet;
      const finalr = await r.getRows();
      await r.close();
      await connection.close();
      
     // console.log("Data fetched successfully:", finalr);
      res.send(finalr);
  } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send({ error: 'Internal Server Error' });
  }
});
app.post('/delete_a_vid',async(req,res)=>{
  const {videoid,userid}=req.body;
 // console.log(videoid,userid);
  try {
    
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    
    const query = `DELETE FROM VIDEO WHERE VIDEOID=:videoid`;
    const resul = await connection.execute(query, { videoid:videoid}, {autoCommit:true});
    
   // console.log("Helloss");
    const query2 = `SELECT * FROM VIDEO WHERE UPLOADEDBY = :userid`;
    const result = await connection.execute(query2, { userid: req.body.userid }, {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    
    const r = result.resultSet;
    const finalr = await r.getRows();
    await r.close();
    await connection.close();
    
   // console.log("Data fetched successfully:", finalr);
    res.send(finalr);
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})

app.get('/watchlater/:id', async (req, res) => {
  const userId = req.params.id; // userId as string

  try {
    const connection = await oracledb.getConnection({
        user: 'YOUTUBELITE',
        password: '2345',
        connectString: 'localhost/orclpdb'
    });

    const result = await connection.execute(
      'BEGIN :cursor := GET_WATCH_LATER_DATA(:userId); END;',
        {
           
          cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
          userId: userId,
        }
    );

    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows();

    resultSet.close();

     
      const transformedResult = rows.map((row) => ({
          USERID: row[0], 
          USERLOGO: row[1],
          VIDEOURL:row[2],
          VIDEOID:row[3],
          POSTER:row[4],
          CREATED_AT:row[5]
          
      }));
     // console.log(transformedResult,"koi");
      res.send(transformedResult);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send({ error: 'Internal Server Error' });
  }
});



app.post('/removewatchlater/:id',async(req,res)=>{
  try {
    
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    console.log(req.body.videoid,req.params.id);
    const query = `DELETE FROM WATCHLATER WHERE VIDEOSID=:videoid AND USERSID=:userid`;
    const resul = await connection.execute(query, { videoid:req.body.videoid,userid:req.params.id}, {autoCommit:true});
   // console.log("successful");
    
   
    res.send("ok");
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}


})
app.post('/update_view',async(req,res)=>{
  try {
    
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const query = `UPDATE VIDEO SET VIEWS=(SELECT SUM(VIEWS) FROM VIDEO WHERE VIDEOID=:videoid)+1 WHERE VIDEOID=:videoid`;
    const resul = await connection.execute(query, { videoid:req.body.videoid}, {autoCommit:true});
   // console.log("successful");
    res.send("ok");
  
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}


})
app.post('/get_viewed_video',async(req,res)=>{
  //console.log(req.params.id,1234);
  try {
    //console.log("hei123344");
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const query = `SELECT VIEWEDVIDEO FROM RECENTVIEWED WHERE VIEWEDUSER=:userid`;
    const result = await connection.execute(query, { userid:req.body.userid}, {autoCommit:true});
  // console.log(result);
    const finalr = result.rows;
    //console.log(finalr);
    
    await connection.close();
    res.send(finalr);
    
  
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/add_in_recentview',async(req,res)=>{
  try {
    console.log(req.body.videoid,req.body.userid);
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const query = `INSERT INTO RECENTVIEWED(VIEWEDUSER,VIEWEDVIDEO) VALUES(:userid,:videoid)`;
    const resul = await connection.execute(query, { videoid:req.body.videoid,userid:req.body.userid}, {autoCommit:true});
    //console.log("successful");
    res.send("ok");
  
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}



})
app.post('/add_comment',async(req,res)=>{
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    const q2=`SELECT MAX(COMM_ID)  FROM COMMENT_DATA`;
    const result3 = await connection.execute(q2, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    
    const maxcomId = result3.rows[0]['MAX(COMM_ID)'];
    //console.log(req.body.commentedby,req.body.comment);
    const query = `INSERT INTO COMMENT_DATA(COMM_ID,USERID,VIDEOID)  VALUES(:comm_id,:userid,:videoid)`;
    const result= await connection.execute(query, { comm_id:maxcomId+1,userid:req.body.commentedby,videoid:req.body.video}, {autoCommit:true});
    
   
    const query2 = `INSERT INTO COMMENTS (COMM_ID,TIME,COMMENT_DESCRIPTION) VALUES(:comm_id,SYSTIMESTAMP,:description)`;
    const resul2 = await connection.execute(query2, { comm_id:maxcomId+1,description:req.body.comment}, {autoCommit:true});
    res.send("ok");
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}



})
app.post('/get_comment',async(req,res)=>{
  try {

    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    //console.log("jo",req.body.video);
   
    const query = `
    SELECT U.USERID AS USERID, U.USERLOGO AS USERLOGO, B.TIME AS TIME, B.COMMENT_DESCRIPTION AS COMMENT_DESCRIPTION,B.COMM_ID AS COMM_ID
    FROM USERS U
    JOIN (
      SELECT A.USERID AS USERID, C.TIME AS TIME, C.COMMENT_DESCRIPTION AS COMMENT_DESCRIPTION,C.COMM_ID AS COMM_ID
      FROM COMMENTS C
      JOIN (
        SELECT USERID AS USERID, COMM_ID AS CI
        FROM COMMENT_DATA
        WHERE VIDEOID = :videoid
      ) A ON C.COMM_ID = A.CI
    ) B ON U.USERID = B.USERID
  `;
    const result = await connection.execute(query, { videoid:req.body.video},{
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT
  });
  const r=result.resultSet;
  const finalr=await r.getRows();
  await connection.close();
   // console.log(finalr);
    res.send(finalr);
    
  
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/get_reply',async(req,res)=>{
  try {
   
   //console.log(req.body.commentId);
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    //console.log("jo",req.body.video);
   
    const query = `
    SELECT R.USERID AS USERID,U.USERLOGO AS USERLOGO ,R.REPLY AS REPLY FROM REPLIES R JOIN USERS U 
    ON (U.USERID=R.USERID) WHERE R.COMM_ID=:comm_id
  `;
    const result = await connection.execute(query, { comm_id:req.body.commentId},{
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT
  });
  const r=result.resultSet;
  const finalr=await r.getRows();
  await connection.close();
   // console.log(finalr);
    res.send(finalr);
    
  
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/add_reply',async(req,res)=>{
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   // console.log(12345);
    
    const query = `INSERT INTO REPLIES(COMM_ID,USERID,REPLY,TIME)  VALUES(:comm_id,:userid,:reply,SYSTIMESTAMP)`;
    const result= await connection.execute(query, { comm_id:req.body.commentid,userid:req.body.repliedby,reply:req.body.reply}, {autoCommit:true});
    
    res.json({ replies:req.body.reply });
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}



})
app.post('/add_to_subscription',async(req,res)=>{
  try {
    // console.log(req.body.subscribeid,req.body.subscriberid);
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const query = `INSERT INTO SUBSCRIBEDCHANNEL VALUES(:subscribeid,:subscriberid)`;
    const resul = await connection.execute(query, { subscribeid:req.body.subscribeid,subscriberid:req.body.subscriberid}, {autoCommit:true});
   // console.log("successful");
  
 
  //const query2 = `UPDATE USERS SET NO_OF_SUBSCRIBER=(SELECT SUM(NO_OF_SUBSCRIBER) FROM USERS WHERE USERID=:subscribeid)+1 WHERE USERID=:subscribeid`;
  //const resul2 = await connection.execute(query2, { subscribeid:req.body.subscribeid}, {autoCommit:true});
  
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.get('/get_subscribed_channel/:id',async(req,res)=>{
  const a=req.params.id;
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    
    const query = `SELECT SUBSCRIBE_ID FROM SUBSCRIBEDCHANNEL WHERE SUBSCRIBER_ID=:userid`;

    const result = await connection.execute(query,{userid:a}, {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    
    const r = result.resultSet;
    const finalr = await r.getRows();
    await r.close();
    await connection.close();
    
   // console.log("Data fetched successfully:", finalr);
    res.send(finalr);
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/unsubscribe',async(req,res)=>{
  try {
    
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    console.log(req.body.subscribeid,req.body.subscriberid);
    const query = `DELETE FROM SUBSCRIBEDCHANNEL WHERE SUBSCRIBE_ID=:subscribeid AND SUBSCRIBER_ID=:subscriberid`;
    const resul = await connection.execute(query, { subscribeid:req.body.subscribeid,subscriberid:req.body.subscriberid}, {autoCommit:true});
    //console.log("successful");
    
    const query2 = `DELETE FROM USER_NOTIFICATION WHERE TO_NOTIFY=:subscriberid AND NOTIFICATION_FROM=:subscribeid`;
    const result = await connection.execute(query2, { subscribeid:req.body.subscribeid,subscriberid:req.body.subscriberid}, {autoCommit:true});
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.get('/all_subscribe_video/:id',async(req,res)=>{
  // console.log(987);
  const a=req.params.id;
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    
    const query = `
    SELECT V.VIDEOID AS VIDEOID,V.VIDEOURL AS VIDEOURL,V.POSTER AS POSTER,V.CREATED_AT AS CREATED_AT,V.UPLOADEDBY AS UBY
    FROM VIDEO V,( SELECT SUBSCRIBE_ID AS SI FROM SUBSCRIBEDCHANNEL WHERE SUBSCRIBER_ID = :userid) A WHERE
    V.UPLOADEDBY = A.SI ORDER BY CREATED_AT DESC
  `;

    const result = await connection.execute(query,{userid:a}, {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    
    const r = result.resultSet;
    const finalr = await r.getRows();
    await r.close();
    // await connection.close();
    
   // console.log("Data fetched successfully:", finalr);
    res.send(finalr);
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/update_subscriber_no',async(req,res)=>{
  try {
    
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const query = `UPDATE USERS SET NO_OF_SUBSCRIBER=(SELECT SUM(NO_OF_SUBSCRIBER) FROM USERS WHERE USERID=:subscribeid)+1 WHERE USERID=:subscribeid`;
    const resul = await connection.execute(query, { subscribeid:req.body.subscribeid}, {autoCommit:true});
   // console.log("successful345");
    res.send("ok");
  
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/reduce_sub', async (req, res) => {
  try {
    
    
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const query = `UPDATE USERS SET NO_OF_SUBSCRIBER=(NO_OF_SUBSCRIBER-1) WHERE USERID=:subscribeid`;
    await connection.execute(query, { subscribeid: req.body.subscribeid }, { autoCommit: true });
    await connection.commit();
   // console.log("successful1234");
    res.send("ok");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
app.post('/add_notify',async(req,res)=>{
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    //console.log(req.body.tonotify,req.body.notification_from);
    const query = `INSERT INTO USER_NOTIFICATION(TO_NOTIFY,NOTIFICATION_FROM)  VALUES(:to_notify,:notification_from)`;
    const result= await connection.execute(query, { to_notify:req.body.tonotify,notification_from:req.body.notification_from}, {autoCommit:true});
    
    // res.json({r:"ok" });
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/get_notify',async(req,res)=>{
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const query = `SELECT U.USERID AS USERID,U.USERLOGO AS USERLOGO,A.VIEWS AS VIEWS,A.VIDEOURL AS VIDEOURL,A.VIDEOID AS VIDEOID,
    A.POSTER AS POSTER,A.CR AS CREATED_AT FROM USERS U,
    (SELECT V.UPLOADEDBY AS UPLOADEDBY,V.VIEWS AS VIEWS,V.VIDEOURL AS VIDEOURL,V.VIDEOID AS VIDEOID,
      V.POSTER AS POSTER,V.CREATED_AT AS CR FROM VIDEO V JOIN NOTIFICATION_VIDEO NV
    ON (V.VIDEOID=NV.VIDEOID) WHERE NV.NOTIFIED_USER=:notify ORDER BY V.CREATED_AT DESC)A WHERE U.USERID=A.UPLOADEDBY`;
    const result = await connection.execute(query,{notify:req.body.notify}, {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT
  });
  
  const r = result.resultSet;
  const finalr = await r.getRows();
  await r.close();
  await connection.close();
  

  res.send(finalr);
    
   
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/get_admin_notify',async(req,res)=>{
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   console.log(req.body.notify);
    const query = `SELECT * FROM ADMIN_NOTIFICATION WHERE TO_NOTIFY=:userid`;
    const result = await connection.execute(query,{userid:req.body.notify}, {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT
  });
  
  const r = result.resultSet;
  const finalr = await r.getRows();
  await r.close();
  await connection.close();
  
  console.log(finalr);
  res.send(finalr);
    
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/notification_count',async(req,res)=>{
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const query = `SELECT NOTIFICATION_COUNT FROM USERS WHERE USERID=:userid`;
    const result = await connection.execute(query,{userid:req.body.userid}, {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT
  });
  
  const r = result.resultSet;
  const finalr = await r.getRows();
  await r.close();
  await connection.close();
  
  //console.log(finalr);
  res.send(finalr);
    
   
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

});
app.post('/admin_notification_count',async(req,res)=>{
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const query = `SELECT ADMIN_NOTIFICATION_COUNT FROM USERS WHERE USERID=:userid`;
    const result = await connection.execute(query,{userid:req.body.userid}, {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT
  });
  
  const r = result.resultSet;
  const finalr = await r.getRows();
  await r.close();
  await connection.close();
  
  console.log(finalr);
  res.send(finalr);
    
   
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/reduce_notification_count',async(req,res)=>{
  try {
   
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const updateQuery = `UPDATE USERS SET notification_count = 0 WHERE USERID = :USERID`;
    const updateResult = await connection.execute(updateQuery, { USERID: req.body.userid}, { autoCommit: true });
   
  await connection.close();  
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}
})
app.post('/reduce_admin_notification_count',async(req,res)=>{
  try {
   
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const updateQuery = `UPDATE USERS SET admin_notification_count = 0 WHERE USERID = :USERID`;
    const updateResult = await connection.execute(updateQuery, { USERID: req.body.userid}, { autoCommit: true });
   
  await connection.close();  
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}
})
app.post('/subscribed_channel',async(req,res)=>{
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const query = `SELECT U.USERID AS USERID,U.USERLOGO AS USERLOGO FROM USERS U,
    (SELECT SUBSCRIBE_ID FROM SUBSCRIBEDCHANNEL WHERE SUBSCRIBER_ID=:userid)A WHERE U.USERID=A.SUBSCRIBE_ID`;
    const result = await connection.execute(query,{userid:req.body.userid}, {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT
  });
  
  const r = result.resultSet;
  const finalr = await r.getRows();
  await r.close();
  await connection.close();
  
  //console.log(finalr);
  res.send(finalr);
    
   
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.get('/getshorts',async(req,res)=>{
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const query = `SELECT * FROM SHORTS`;
    const result = await connection.execute(query,[], {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT
  });
  
  const r = result.resultSet;
  const finalr = await r.getRows();
  await r.close();
  await connection.close();
  
 
  res.send(finalr);
    
   
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}
})
app.post('/add_to_history',async(req,res)=>{
  try {
    console.log(req.body.videoid,req.body.userid,1234);
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });

    const query = `INSERT INTO HISTORY(VIEWEDVIDEO,VIEWEDUSER,VIEWED_AT)  VALUES(:videoid,:userid,SYSTIMESTAMP)`;
    const result= await connection.execute(query, { videoid:req.body.videoid,userid:req.body.userid}, {autoCommit:true});
    
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.get('/get_history/:id',async(req,res)=>{
  const a=req.params.id;
 // console.log(req.params.id,5678);
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    
    const query = `
   SELECT V.VIEWS AS VIEWS,V.CREATED_AT AS CREATED_AT,V.VIDEO_TITLE AS VIDEO_TITLE,V.VIDEOID AS VIDEOID,V.VIDEOURL AS VIDEOURL,A.VIEWED_AT AS VIEWED_AT FROM VIDEO V ,(SELECT VIEWEDVIDEO AS ID,VIEWED_AT AS VIEWED_AT FROM HISTORY WHERE VIEWEDUSER=:userid  ORDER BY VIEWED_AT DESC)A
   WHERE V.VIDEOID=A.ID
  `;

    const result = await connection.execute(query,{userid:a}, {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    
    const r = result.resultSet;
    const finalr = await r.getRows();
    await r.close();
    await connection.close();
    
   //console.log("Data fetched successfully:", finalr);
    res.send(finalr);
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/perdayview',async(req,res)=>{
  try {
    // console.log(req.body.videoid,req.body.date);
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    const dates = new Date(req.body.date);
    console.log(dates,req.body.date);
    const query = `INSERT INTO PERDAYVIEW(VIEWEDVIDEO,VIEWDATE)  VALUES(:videoid,TO_DATE(:viewdate, 'MM/DD/YYYY'))`;
    const result= await connection.execute(query, { videoid:req.body.videoid,viewdate:req.body.date}, {autoCommit:true});
    
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/getperdayview',async(req,res)=>{
  
  try {
   // console.log(req.body.videoid,"come");
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    
    const query = `
    SELECT VIEWEDVIDEO,VIEWDATE,COUNT(*) AS VIEWC FROM PERDAYVIEW
    GROUP BY VIEWEDVIDEO,VIEWDATE HAVING VIEWEDVIDEO=:videoid
  `;

    const result = await connection.execute(query,{videoid:req.body.videoid}, {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    
    const r = result.resultSet;
    const finalr = await r.getRows();
    await r.close();
    await connection.close();
    
  // console.log("Data fetched successfully:", finalr);
    res.send(finalr);
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/like',async(req,res)=>{
  try {
    console.log(req.body.videoid,req.body.userid,1234);
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });

    const query = `INSERT INTO LIKEDVIDEO(LIKEDVIDEO,LIKEDUSER)  VALUES(:videoid,:userid)`;
    const result= await connection.execute(query, { videoid:req.body.videoid,userid:req.body.userid}, {autoCommit:true});
    res.status(200).json({ message: 'Video liked successfully' });
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/dislike',async(req,res)=>{
  try {
    console.log(req.body.videoid,req.body.userid,1234);
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });

    const query = `INSERT INTO DISLIKEDVIDEO(DISLIKEDVIDEO,DISLIKEDUSER)  VALUES(:videoid,:userid)`;
    const result= await connection.execute(query, { videoid:req.body.videoid,userid:req.body.userid}, {autoCommit:true});
    res.status(200).json({ message: 'Video liked successfully' });
    
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/getlikedvideo',async(req,res)=>{
  
  try {
    // console.log(req.body.userid,"come");
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    
    const query = `
    SELECT LIKEDVIDEO FROM LIKEDVIDEO WHERE LIKEDUSER=:userid
  `;

    const result = await connection.execute(query,{userid:req.body.userid}, {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    
    const r = result.resultSet;
    const finalr = await r.getRows();
    await r.close();
    await connection.close();
    
  // console.log("Data fetched successfully:", finalr);
    res.send(finalr);
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/changethumbnail',async(req,res)=>{
  try {
    console.log(req.body.videoid,req.body.poster);
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   
    const updateQuery = `UPDATE VIDEO SET poster=:poster  WHERE VIDEOID = :videoid`;
    const updateResult = await connection.execute(updateQuery, {POSTER:req.body.poster, VIDEOID: req.body.videoid}, { autoCommit: true });
   
  await connection.close();  
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})

//amr update
app.post('/Admin_Signin', async (req, res) => {
  try {
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });

    const query = `SELECT * FROM ADMIN_PANEL WHERE EMAIL = :email`;
    const resultc = await connection.execute(
      query,
      { email: req.body.email },
      {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
      }
    );

    const rcheck = resultc.resultSet;
    const rows = await rcheck.getRows();

    if (rows.length === 0 || req.body.password !== rows[0].PASSWORD) {
      // No rows found or password doesn't match, respond with null
      res.json(null);
    } else {
      // User found and password matched, respond with user data
      res.json(rows[0]);
    }
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

app.get('/Admin_Show_User',async(req,res)=>{
  const connection=await oracledb.getConnection();
  const query=`SELECT U.USERID,U.USERLOGO,U.EMAIL,U.AD_COUNT FROM USERS U`;
  const result=await connection.execute(query,[],{
      resultSet:true,
      outFormat:oracledb.OUT_FORMAT_OBJECT
  })
  const r=result.resultSet;
  const finalr=await r.getRows();
  await r.close();
  await connection.close();
  res.send(finalr);
});
app.get('/Admin_Show_Company',async(req,res)=>{
  const connection=await oracledb.getConnection();
  const query=`SELECT COMPANY_NAME,EMAIL,DEADLINE FROM COMPANY c `;
  const result=await connection.execute(query,[],{
      resultSet:true,
      outFormat:oracledb.OUT_FORMAT_OBJECT
  })
  const r=result.resultSet;
  const finalr=await r.getRows();
  await r.close();
  await connection.close();
  res.send(finalr);
});

app.post("/user_videos", async(req, res) => {
  console.log("vd");
  console.log(req.body.userId);
  console.log("eikhane");
  const connection=await oracledb.getConnection();
  const query='SELECT VIDEOURL,VIDEO_TITLE FROM VIDEO v WHERE UPLOADEDBY = :userId';
  const result=await connection.execute(query,{userId:req.body.userId},{
      resultSet:true,
      outFormat:oracledb.OUT_FORMAT_OBJECT
  })
  const r=result.resultSet;
  const finalr=await r.getRows();
  await r.close();
  await connection.close();
  res.send(finalr);
});

app.post("/admin_show_ads", async(req, res) => {
  console.log("here");
  console.log(req.body.companyname);
  const connection=await oracledb.getConnection();
  const query='SELECT * FROM AD ad WHERE COMPANY_NAME =:company_name';
  const result=await connection.execute(query,{company_name:req.body.companyname},{
      resultSet:true,
      outFormat:oracledb.OUT_FORMAT_OBJECT
  })
  const r=result.resultSet;
  const finalr=await r.getRows();
  await r.close();
  await connection.close();
  res.send(finalr);
});

app.get("/Admin_Panel_problem",async(req,res)=>{
  const connection=await oracledb.getConnection();
  const query='SELECT * FROM PROBLEM_BOX pb ORDER BY "TIME" DESC';
  const result=await connection.execute(query,[],{
      resultSet:true,
      outFormat:oracledb.OUT_FORMAT_OBJECT
  })
  const r=result.resultSet;
  const finalr=await r.getRows();
  await r.close();
  await connection.close();
  res.send(finalr);
});

app.get("/Admin_Panel_reports",async(req,res)=>{
  const connection=await oracledb.getConnection();
  const query=
  `SELECT RV.USERID ,RV.VIDEOID ,RV.NOTES,RV.TIME ,V.VIDEOURL 
    FROM REPORT_VIDEOS rv 
    JOIN VIDEO v 
    ON V.VIDEOID = RV.VIDEOID 
    ORDER BY TIME`;
  const result=await connection.execute(query,[],{
      resultSet:true,
      outFormat:oracledb.OUT_FORMAT_OBJECT
  })
  const r=result.resultSet;
  const finalr=await r.getRows();
  await r.close();
  await connection.close();
  res.send(finalr);
})

app.post("/Admin_delete", async (req, res) => {
  console.log("here");
  const connection = await oracledb.getConnection();
  const message2 = "Thanks for your cooperation. Your report on this video "+req.body.videoid+" was helpful"; 

  console.log(message2);
  console.log(req.body.videoid);

  const query = `BEGIN
                    ADMIN_DELETE(:video_id, :user_id, :msg1, :msg2);
                END;`;

  const result = await connection.execute(
      query,
      {
          video_id: req.body.videoid,
          user_id: req.body.userid,
          msg1: req.body.warningMessage,
          msg2: message2,
      },
      {
          resultSet: true,
          outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
  );
  await connection.commit();
  await connection.close();
  console.log("hoise");
  res.send();
});

app.post("/report_video", async (req, res) => {
  console.log("here");
  const connection = await oracledb.getConnection();


  const query = 'INSERT INTO REPORT_VIDEOS rv VALUES(:userid,:videoid,:notes,SYSDATE)';

  const result = await connection.execute(
      query,
      {
          videoid: req.body.videoid,
          userid: req.body.userid,
          notes: req.body.notes,
      },
      {
          resultSet: true,
          outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
  );
  await connection.commit();
  await connection.close();
  console.log("hoise");
  res.send();
});
app.post("/payment", async (req, res) => {
  console.log("here");
  const connection = await oracledb.getConnection();

  const query = `BEGIN
	                PAYMENT(:msg,:company_name);
                END;`;

  const result = await connection.execute(
      query,
      {
          msg:"Dollar has been added to your account from "+req.body.phoneNumber,
          company_name:req.body.company_name,
      },
      {
          resultSet: true,
          outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
  );
  await connection.commit();
  await connection.close();
  console.log("hoise");
  res.send();
});

app.post('/changepassword',async(req,res)=>{
  try {
    console.log(req.body.password,req.body.userid);
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
    const passwords = await bcrypt.hash(req.body.password, 10);
    const updateQuery =` UPDATE USERS SET PASSWORD=:password  WHERE USERID = :userid`;
    const updateResult = await connection.execute(updateQuery, {password:passwords, userid:req.body.userid}, { autoCommit: true });
   
  await connection.close();  
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

})
app.post('/namechange',async(req,res)=>{
  try {
    console.log(req.body.name,req.body.userid);
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   // const passwords = await bcrypt.hash(req.body.password, 10);
    const updateQuery = `UPDATE USERS SET USERID=:newuserid  WHERE USERID = :olduserid`;
    const updateResult = await connection.execute(updateQuery, {newuserid:req.body.name, olduserid:req.body.userid}, { autoCommit: true });
   
  await connection.close();  
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}

});

app.get('/search', async (req, res) => {
  const { q } = req.query;

  try {
    // Establish a connection to Oracle Database
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });

    const query = `
    SELECT U.USERID,U.USERLOGO,V.VIDEOID,V.VIDEOURL,V.VIDEO_TITLE,V.POSTER,V.VIEWS FROM USERS U 
    JOIN VIDEO V ON (U.USERID=V.UPLOADEDBY)
    WHERE V.VIDEO_TITLE LIKE :searchQuery`;

    const result = await connection.execute(query, [`%${q}%`]);

    await connection.close();

    const searchResults = result.rows.map((row) => ({
      USERID: row[0],
      USERLOGO: row[1],
      VIDEOID: row[2],
      VIDEOURL: row[3],
      VIDEO_TITLE: row[4],
      POSTER: row[5],
      VIEWS: row[6]
    }));

    //console.log(searchResults);
    res.json(searchResults);
  } catch (error) {
    console.error('Error executing search query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/problem_box',async(req,res)=>{
  try {
    console.log(req.body.userid);
    const connection = await oracledb.getConnection({
      user: 'YOUTUBELITE',
      password: '2345',
      connectString: 'localhost/orclpdb'
    });
   // const passwords = await bcrypt.hash(req.body.password, 10);
    const Query = `INSERT INTO PROBLEM_BOX pb VALUES(:userid,:msg,SYSDATE)`;
    const updateResult = await connection.execute(Query, {userid:req.body.userid,msg:req.body.msg},
      {autoCommit:true});
   
  await connection.close();  
    
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
}
});


app.listen(5000);