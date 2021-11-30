import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { } from 'react'


//@ts-check

export default class VSCodeStarter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        password: '',
    }
  }

  // hash a value with sha256
  hash = async (value) => {
    const { createHmac } = await import('crypto');
    const hash = createHmac('sha256', value);
    return hash.digest('hex');  
  }

  render() {
    return (
      <div className={styles.hideScrollbar}>
        <div className={styles.container} >
          <Head>
            <title>VSCodeStarter</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <form onSubmit={async (event) => { this.checkPasswordAndRedirect(this.state.password) }}>
            <div className="form-group">
              <input onChange={value => {
                  this.setState({ password: value.target.value })
                  this.checkPasswordAndRedirect(value.target.value);
            }} className="inputC" id="password" name="password" type="password"required />        
              <label className="inputLabel" htmlFor="password">Password</label>
            </div>
            <button className="buttonC" type="submit">Submit</button>
          </form>
          
        </div>
      </div>
    )
  }

  async checkPasswordAndRedirect(password) {
    const hashedPassword = await this.hash(password);
    console.log("hashedPassword:", hashedPassword);
    if (hashedPassword === "9ffafcadda529df8d815fd787df39a42a9eaa1b13a1f14501fe1295413177bff") {
      navigator.clipboard.writeText("?tkn=johannes");
      window.location.href = "http://jbserver01.ddns.net" + "?tkn=johannes";
    }
  }


}

