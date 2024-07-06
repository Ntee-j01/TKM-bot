const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUdaNDBQUmhaODVHL2FSWmNxNzN0UDBMRlJvYXl2Z016Wjl4UFpyUVFFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL3VkRFV3Q0xlMUNCRDl6ZWZxbnAzekFoTWpDRmNVUFVzUGdTcGVDUTRsdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZSWQ2bFhlZWNBSENjRXhCWVdacy9xbmJwT2U0SFRJY1JLZ2hYdVRrTEg4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNNHdxRFM5SVJqUnhMQTlBcmplQ01PZC9QSThSVGRSd2s0Mmord3NqQVRBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlPblh2Tk5sVzl3eFRvbHlQdlJSSVhNSUt3Q2ZqTFNkTXFGdWw4cnd2MGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InA4eUlOYjU5NUU5ZnZSYmZUc3lLRDdieTBHT1JXWFVnRXFXUkw4NjNneTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVB0NEI3cktuZkpOQ1QxdlJ3b1hnZ2JiWThUZTVxZEpyTmpVeHhkc0lIST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkVCdWR5R1ZiREp2T2hrSVhNdXcwRjFYMWtYbWJla1BrNXhJNU1qSVVCaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhoZ1h0aXBqaFBlNkI2a1ovQ043b1JpNlZxdTJBVUJGb1hvMFRlMEpWeGc1RFJYUmsrU0tHZ1BHNDJhWWIzdGdUUEY5ejFhTVlPNVlETVo2K0dBNWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg2LCJhZHZTZWNyZXRLZXkiOiI0UmlNOFJDZThUeFdzNGlmRjdKMVprb3M1MEowVkZiaEFJc1NVY1pYMzBRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIyelczMXBhdlM2ZS1uMWlxX1VKRVlRIiwicGhvbmVJZCI6ImJmZjYwN2NkLWQ4ZTctNGQ3ZC05NWJmLWExNjRkMmM2Y2Y4NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrcC9HVk1CSHJmUXozZncvS3B0QWQvcFV1REk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN1U4NVBCaHg3d3hVZU5hQmRZM0xXU0tiL1pRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjkyWEY2NU5MIiwibWUiOnsiaWQiOiIyNjM3MTQ0OTc1NDU6MjdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ095TmpmTURFTmFLcDdRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImlXanRubXdxdlZYL0x1ODd1VEdCU1ZFcm1VVDF6OVd5ZUY5V2ZnSjJNUkU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlZXdU5MRi9CMW9kLzRCS3FZeXNINkpUaTJVOWFSRTdPeTVwV3duMjJRRVdadmdoNGNzNkFNM1A1K0V3aU05VG5Oc1pPSHI3L0c2WHFBb25pWm4yWUNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ6dUl4OG14L1dTOWtjeU53SWZvSWlTb0QxcElHZlFBdDVjdnNFem42clBmQmd2RFJkclZXSmZ2SEhZM3pITmNkNXBkT3dSV2s1b0QrYjVDc0ZhdUNoUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNDQ5NzU0NToyN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZbG83WjVzS3IxVi95N3ZPN2t4Z1VsUks1bEU5Yy9Wc25oZlZuNENkakVSIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMzA0OTk2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURCRSJ9",
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Nteej",
    NUMERO_OWNER : process.env.OWNER_NUM || "263714497545",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'NTEEJ-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.postimg.cc/FssKzLK7/20240622-140407.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
