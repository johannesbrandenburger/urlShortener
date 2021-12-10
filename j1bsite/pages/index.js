import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { } from 'react'
import Terminal from '../components/terminal'

//@ts-check

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentShortcut: null,
      isShortcutInserted: false,
      isShortcutFound: false,
      seconds: 0,
      currentLog:{
        message: "",
        isError: false,
        isWarning: false,
        isSuccess: false
      }
    }
  }

  async componentDidMount() {

    await this.redirectToShortcut();

    // create timer
    this.interval = setInterval(() => {
      this.setState({
        seconds: this.state.seconds + 1,
      });
    }, 1000);

    window.location.href = "https://google.com/";

  }

  redirectToShortcut = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const keys = urlParams.keys();
    var shortLink = "";
    var foundLink = false;
    for (const key of keys) {
      console.log(key);
      shortLink = key;
      break;
    }

    if (keys.length == 0 || shortLink == "") {
      console.log("no shortcut inserted");
      this.terminalLog({message: "no shortcut inserted", isWarning: true});
      this.setState({
        isShortcutInserted: false,
        isShortcutFound: false
      });
    } else {
      this.setState({
        currentShortcut: shortLink,
        isShortcutInserted: true
      });
      this.terminalLog({message: "shortcut inserted: "+shortLink, isSuccess: true});
      const allShortcuts = await this.getAllShortcuts();
      for (const entry in allShortcuts) {
        if (allShortcuts[entry].shortcut == shortLink) {
          this.terminalLog({message: "shortcut found", isSuccess: true});
          this.terminalLog({message: "redirecting to: "+allShortcuts[entry].destination_link});
          window.location.href = allShortcuts[entry].destination_link;
          foundLink = true;
          break;
        }
      }
      if (!foundLink) {
        this.setState({
          isShortcutFound: false
        });
        this.terminalLog({message: "shortcut not found", isError: true});
        this.terminalLog({message: "you can create a new shortcut now"});
      }
    }
  }

  submitNewShortcut = async (event) => {
    event.preventDefault();
    const shortcut = event.target.elements.shortcut.value;
    const destination_link = event.target.elements.destination_link.value;
    const password = event.target.elements.password.value;
    
    // if destination_link is not a valid url add http://
    if (!destination_link.startsWith("https://") && !destination_link.startsWith("http://") && !destination_link.startsWith("www.")) {
      destination_link = "https://"+destination_link;
    }


    // create hash
    const hashedPassword = await this.hash(password);
    console.log("hashedPassword:", hashedPassword);
    if (hashedPassword === "3ff35c7c909323d2f8b43899d127051a2d29b88e9857106a039c8d41b60b7ca0") {
      this.terminalLog({message: "Password correct", isSuccess: true});
      const allShortcuts = await this.getAllShortcuts();
      var shortCutExists = false;
      for (let i = 0; i < allShortcuts.length; i++) {
        if (allShortcuts[i].shortcut === shortcut) {
          this.terminalLog({message: "Shortcut already exists", isWarning: true});
          shortCutExists = true;
          return;
        }
      };
      
      if (!shortCutExists) {
        await this.uploadNewShortcut(shortcut, destination_link);
      }    
    } else {
      this.terminalLog({message: "Password incorrect", isError: true});
    }
  }

  

  render() {
    const headerText = "j1b.site";
    if (this.state.isShortcutInserted && !this.state.isShortcutFound) {
      headerText = "Shortcut " + this.state.currentShortcut + " not found";
    } else if (this.state.isShortcutFound) {
      headerText = "Redirecting... ";
    }

    return (
      <div>
        <div id="header" className="header">
          <h1 className="h1">{headerText}</h1>
        </div>
        <br/>
        <div id="formAndTerminal">
          <form onSubmit={(event) => {this.submitNewShortcut(event)}}>
            <div className="form-group">
              <input className="inputC" id="shortcut" name="shortcut" type="text" required />
              <label className="inputLabel" htmlFor="shortcut">Shortcut</label>
            </div>
            <div className="form-group">        
              <input className="inputC" id="destination_link" name="destination_link" type="text" required />
              <label className="inputLabel" htmlFor="destination_link">URL</label>
            </div>
            <div className="form-group">
              <input className="inputC" id="password" name="password" type="password"required />        
              <label className="inputLabel" htmlFor="password">Password</label>
            </div>
            <button className="buttonC" type="submit">Submit</button>
          </form>
          <br/>
          <div id="terminal">
            <Terminal currentLog={this.state.currentLog} lines={5}> </Terminal>
          </div>
        </div>
        <br/>
        <br/>
        <div>
          <h4 className="h4">j1b.site</h4>        
          <div>
            <p className="grey">Link Shortener </p> 
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


  terminalLog = ({message, isError=false, isWarning=false, isSuccess=false}) => {
    this.setState({
      currentLog: {
        message: message,
        isError: isError,
        isWarning: isWarning,
        isSuccess: isSuccess
      }
    })
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
    this.terminalLog({message: "fetching database to get all shortcuts..."});
    return await (await this.fetchData("all-shortcuts")).shortcutList;
  }

  fetchData = async (handlerName) => {
    var fetchPath = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/' + handlerName;
    const response = await fetch(fetchPath);
    const data = await response.json();
    if (response.ok) this.terminalLog({message: "fetched data successfully", isSuccess: true});
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
    if (response.ok) {
      this.terminalLog({message: "uploaded new shortcut: "+shortcut, isSuccess: true});
      this.terminalLog({message: "your shortlink: https://j1b.site/?"+shortcut, isSuccess: true});
  }
    else this.terminalLog({message: "Error while uploading new shortcut", isError: true});
  }




}

