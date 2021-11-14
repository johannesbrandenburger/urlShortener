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


    // await this.uploadNewShortcut("testone", "https://dev-chat.me");

    console.log("this.state after componentDidMount():", this.state);
  }



  render() {
    return (
      <div>

      </div>
    )
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
