import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { } from 'react'

//@ts-check

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allShortcuts: [],
    }
  }

  async componentDidMount() {

    this.setState({
      allShortcuts: await this.getAllShortcuts(),
    });

    console.log("this.state after componentDidMount():", this.state);
  }

  submitNewShortcut = async (event) => {
    event.preventDefault();
    const shortcut = event.target.elements.shortcut.value;
    const destination_link = event.target.elements.destination_link.value;
    const password = event.target.elements.password.value;
    
    // create hash
    const hashedPassword = await this.hash(password);
    console.log("hashedPassword:", hashedPassword);
    if (hashedPassword === "3ff35c7c909323d2f8b43899d127051a2d29b88e9857106a039c8d41b60b7ca0") {
      const allShortcuts = await this.getAllShortcuts();
      var shortCutExists = false;
      for (let i = 0; i < allShortcuts.length; i++) {
        if (allShortcuts[i].shortcut === shortcut) {
          alert("Shortcut already exists!");
          shortCutExists = true;
          return;
        }
      };
      
      if (!shortCutExists) {
        await this.uploadNewShortcut(shortcut, destination_link);
        this.setState({
          allShortcuts: await this.getAllShortcuts(),
        });
      }    
    } else {
      alert("Incorrect password");
    }
  this.setState({
    allShortcuts: await this.getAllShortcuts(),
  });
  }


  render() {
    return (
      <div>


      <form onSubmit={(event) => {this.submitNewShortcut(event)}}>
        <div className="form-group">
          <input className="inputC" id="shortcut" name="shortcut" type="text" required />
          <label htmlFor="shortcut">Shortcut</label>
        </div>
        <div className="form-group">        
          <input className="inputC" id="destination_link" name="destination_link" type="text" required />
          <label htmlFor="destination_link">URL</label>
        </div>
        <div className="form-group">
          <input className="inputC" id="password" name="password" type="password"required />        
          <label htmlFor="password">Password</label>
        </div>
        <button className="buttonC" type="submit">Submit</button>
      </form>


        <div>
            <h4>j1b.site</h4>        
            <div>
                <p>Link Shortener </p> 
                <p className="grey">©JohannesBrandenburger</p>
            </div>
            <br/>
            <div id="impressum">
                <p className="impressumHeader">Impressum</p>
                <p className="impressum">According to German &quot;TMG&quot; laws §5 TMG</p>
                <p className="impressum">Johannes Brandenburger</p>
                <p className="impressum">Kirchstr. 16</p>
                <p className="impressum">88512 Mengen</p>
                <p className="impressum">Germany</p>
                <p className="impressumHeader">Contact</p>
                <p className="impressum">Phone: +49 152 25366286</p>
                <p className="impressum">E-Mail: johannes0709@icloud.com</p>
            </div>
        </div>
      </div>

    )
  }


  // hash a value with sha256
  hash = async (value) => {
    const { createHmac } = await import('crypto');
    const hash = createHmac('sha256', value);
    return hash.digest('hex');  
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getAllShortcuts = async () => {
    return await (await this.fetchData("all-shortcuts")).shortcutList;
  }

  fetchData = async (handlerName) => {
    var fetchPath = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/' + handlerName;
    const response = await fetch(fetchPath);
    const data = await response.json();
    return data;
  }

  uploadNewShortcut = async (shortcut, destination_link) => {
    var fetchPath = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/' + "new-shortcut";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "shortcut": shortcut,
        "destination_link": destination_link,
      })
    };
    const response = await fetch(fetchPath, requestOptions);
    // const data = await response.json();
  }




}

