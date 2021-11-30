import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { } from 'react'
import CodeSlideShow from '../components/code-presentation'


//@ts-check

export default class Presentation extends React.Component {
  constructor(props) {
    super(props)
    this.codeSnippets = [
      {
        code: `#MariaDB Node.js Connector

- um SQL-Statements auf einem Node.js-Server auszuführen
    - einfache Backend-Lösung

- von MariaDB selber
    - nativer JavaScript driver

- default API ist Promise (daher mindestens Node.js 6.0)
    - Promise: eine Art in JavaScript, um mit asynchronen Funktionen zu arbeiten

- über npm installierbar:
  $ npm install mariadb

- oder auf GitHub einsehbar:
  https://github.com/MariaDB/mariadb-connector-nodejs

`,
        language: 'text',
        isNormalText: true
      },
      {
        code: `// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');

// Use dns to get the IP address of the database server
var dns = require('dns');`,
        language: 'javascript',
        isNormalText: false
      },
      {
        code: `// Function to run a SQL statement
const runSQLstatement = async (sqlString) => {

    // Get ip address of server "jbserver01.ddns.net"
    var ip = await dns.promises.lookup('jbserver01.ddns.net');

    // Create a connection pool
    var pool = mariadb.createPool({
        host: ip, 
        port: 3306,
        user: 'johannes', 
        password: 'Password123!',
        database: 'BuchDB'
    });

    try {

        // Get a connection from the pool
        const conn = await pool.getConnection();
        // Query the database
        const rows = await conn.query(sqlString);
        // Release the connection
        conn.end();

        if (rows.affectedRows) {
            // Print the affected rows if SQL statement was INSERT or UPDATE
            console.log(\`\${rows.affectedRows} rows affected\`);
        } else {
            // Print rows if SQL statement was SELECT
            rows.forEach((row,index) => {
                console.table(row);
            });
            // Print how many rows were affected
            console.log(\`\${rows.length} rows affected\`);
        }
        
    } catch (err) { console.log(err); }
}`,
        language: 'javascript',
        isNormalText: false
      },
      {
        code: `const mainAsync = async () => {

    // Run the SELECT SQL statement
    await runSQLstatement(\`
    SELECT Buch.Titel, Buch.Untertitel, Verlag.Name AS Verlag, Buch.Preis
        FROM Buch                 
        JOIN Verlag ON Buch.VerlagId = Verlag.VerlagId
        WHERE Buch.Titel LIKE "%linux%"
        \`
    );

    // Run the INSERT SQL statement
    await runSQLstatement(\`
    INSERT INTO Buch (Titel, Untertitel, VerlagId, Preis , ISBNNummer)
        VALUES ("Linux-Systeme", "", 1, 100, "123456789")
    \`
    );

}


// Call the function to run the async SQL statements and quit the program
mainAsync().then(() => {
    process.exit();
});`,
      language: 'javascript',
      isNormalText: false
    },
    {
      code:`┌────────────┬─────────────────┐
│  (index)   │     Values      │
├────────────┼─────────────────┤
│   Titel    │ 'Linux-Systeme' │
│ Untertitel │       ''        │
│   Verlag   │   'Oetinger'    │
│   Preis    │       100       │
└────────────┴─────────────────┘
┌────────────┬──────────────────────────────────────────┐
│  (index)   │                  Values                  │
├────────────┼──────────────────────────────────────────┤
│   Titel    │       'Linux Systemadministration'       │
│ Untertitel │ 'Einrichtung. Wartung. Software-Updates' │
│   Verlag   │          'Addison Wesley Longm'          │
│   Preis    │                  45.95                   │
└────────────┴──────────────────────────────────────────┘
2 rows affected
1 rows affected
      `, language: 'javascript', isNormalText: true
    }  

    ]
  }

  async componentDidMount() {
    document.addEventListener('keydown', (e) => {
        if (e.key === ".") {
            this.openVScodePage()
        }
    });
}

openVScodePage = () => {
    const hostnamehostname = window.location.hostname;
    const port = window.location.port;
    const urlToOpen = "http://" + hostnamehostname + ":" + port + "/vscode";
    window.open(urlToOpen, "_blank")
}

  render() {
    return (
      <div className={styles.hideScrollbar}>
        <div className={styles.container} >
          <Head>
            <title>Code-Presentation</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <CodeSlideShow codeSnippets={this.codeSnippets} />
        </div>
      </div>
    )
  }




}

