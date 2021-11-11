import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { } from 'react'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsSinceCompMount: 0,
      allShortcuts: [],
    }
  }


  fetchData = async (handlerName) => {
    var fetchPath = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/' + handlerName;
    const response = await fetch(fetchPath);
    const data = await response.json();
    return console.log(data);
  }


  componentDidMount() {

    this.setState({
      allShortcuts: this.fetchData("all-shortcuts"),
    });

    this.interval = setInterval(() => {
      this.setState({
        secondsSinceCompMount: this.state.secondsSinceCompMount + 1,
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
