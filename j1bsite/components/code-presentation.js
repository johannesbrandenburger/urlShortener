import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { } from 'react'
import Code from 'react-code-prettify';
import Prism from 'prismjs';
import { CodeBlock, dracula } from "react-code-blocks";



//@ts-check

export default class CodeSlideShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            slideIndex: 0,
            codeSnippet: this.props.codeSnippets[0]["code"],
        }
    }

    async componentDidMount() {
        // listen on keypress arrow left and arrow right
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 37) {
                this.prevSlide()
            } else if (e.keyCode === 39) {
                this.nextSlide()
            }
        });

        Prism.highlightAll();
    }

    prevSlide = () => {
        if (this.state.slideIndex > 0) {
            this.setState({
                slideIndex: this.state.slideIndex - 1
            })
        }
    }

    nextSlide = () => {
        if (this.state.slideIndex < this.props.codeSnippets.length - 1) {
            this.setState({
                slideIndex: this.state.slideIndex + 1
            })
        }
    }

    render() {
        const codeText = this.props.codeSnippets[this.state.slideIndex]["code"];
        const codeLanguage = this.props.codeSnippets[this.state.slideIndex]["language"];
        return (
            <div>
                <CodeBlock
                    text={codeText}
                    language={codeLanguage}
                    showLineNumbers={true}
                    theme={dracula}
                />
            </div>
        )
    }




}

