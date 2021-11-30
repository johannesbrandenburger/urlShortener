import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { } from 'react'
import { CodeBlock, dracula, vs2015 } from "react-code-blocks";



//@ts-check

export default class CodeSlideShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            slideIndex: 0,
            codeSnippet: this.props.codeSnippets[0]["code"],
            highlightedLine: 0,
        }
    }

    async componentDidMount() {
        // listen on keypress arrow left and arrow right
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 37) {
                this.prevSlide()
            } else if (e.keyCode === 39) {
                this.nextSlide()
            } else if (e.key === "w" || e.keyCode === 38) {
                this.markUp()
            } else if (e.key === "s" || e.keyCode === 40) {
                this.markDown()
            } else if (e.key === "a") {
                this.prevSlide()
            } else if (e.key === "d") {
                this.nextSlide()
            } else if (e.keyCode === 27) {
                this.setState({ highlightedLine: 0 })
            } else if (e.key === "l") {
                this.mark10Down()
            } else if (e.key === "j") {
                this.mark10Up()
            } else if (e.key === ".") {
                // later in parent component
                this.openVScodePage()
            }
        });
    }

    openVScodePage = () => {
        // password safty not implemented yet
        window.open("http://jbserver01.ddns.net" + "?tkn=johannes", "_blank")
        // const hostnamehostname = window.location.hostname;
        // const port = window.location.port;
        // const urlToOpen = "http://" + hostnamehostname + ":" + port + "/vscode";
        // window.open(urlToOpen, "_blank")
    }


    markDown = () => {
        this.setState({
            highlightedLine: this.state.highlightedLine + 1
        })
    }

    markUp = () => {
        if (this.state.highlightedLine > 0) {
            this.setState({
                highlightedLine: this.state.highlightedLine - 1
            })
        }
    }     
    
    mark10Down = () => {
        this.setState({
            highlightedLine: this.state.highlightedLine + 10
        })
    }

    mark10Up = () => {
        this.setState({
            highlightedLine: this.state.highlightedLine - 10
        })
        if (this.state.highlightedLine < 0) {
            this.setState({
                highlightedLine: 0
            })
        }
    }  

    prevSlide = () => {
        if (this.state.slideIndex > 0) {
            this.setState({
                slideIndex: this.state.slideIndex - 1,
                highlightedLine: 0,
            })
        }
    }

    nextSlide = () => {
        if (this.state.slideIndex < this.props.codeSnippets.length - 1) {
            this.setState({
                slideIndex: this.state.slideIndex + 1,
                highlightedLine: 0,
            })
        }
    }

    render() {
        const codeText = this.props.codeSnippets[this.state.slideIndex]["code"];
        const codeLanguage = this.props.codeSnippets[this.state.slideIndex]["language"];
        const isNormalText = this.props.codeSnippets[this.state.slideIndex]["isNormalText"];
        const highlightedLine = (this.state.highlightedLine !== 0) ? (this.state.highlightedLine).toString() : "";

        return (
            <div>
                <CodeBlock
                    text={codeText}
                    language={codeLanguage}
                    showLineNumbers={isNormalText ? false : true}
                    theme={vs2015}
                    highlight={highlightedLine}

                />
            </div>
        )
    }




}

