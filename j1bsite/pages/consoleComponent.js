import React, {forwardRef, useRef, useImperativeHandle} from "react";

//@ts-check

export default class Terminal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentLog:{
                message: "",
                isError: false,
                isWarning: false,
                isSuccess: false
            },
            allLogs:[],
            htmlLogs:[]
        };
    }

    componentDidMount = () => {
    }


    render() {
        console.log("Terminal.render()")

        var tempLog = {
            message: "",
            isError: false,
            isWarning: false,
            isSuccess: false
        }

        tempLog.message = this.props.message ? this.props.message : "";
        tempLog.isError = this.props.isError ? this.props.isError : false;
        tempLog.isWarning = this.props.isWarning ? this.props.isWarning : false;
        tempLog.isSuccess = this.props.isSuccess ? this.props.isSuccess : false;

        this.state.currentLog = tempLog;

        const lastLog = this.state.allLogs[this.state.allLogs.length - 1]

        var logIsNew = true;
        if (lastLog !== undefined) {
            if (this.state.currentLog.message === lastLog.message && this.state.currentLog.isError === lastLog.isError && this.state.currentLog.isWarning === lastLog.isWarning && this.state.currentLog.isSuccess === lastLog.isSuccess) {
                logIsNew = false;
            }
        }

        console.log("logIsNew: " + logIsNew)
        
        if (logIsNew && this.state.currentLog.message !== "") {
            this.state.allLogs.push(this.state.currentLog)
        }

        const linesToFill = this.props.lines - this.state.allLogs.length;

        var htmlLogs = [];

        for (var i = 0; i < linesToFill; i++) {
            htmlLogs.push(<div className="log" key={htmlLogs.length}>&nbsp;</div>)
        }

        for (var i = 0; i < this.state.allLogs.length; i++) {
            var log = this.state.allLogs[i]
            var logClass = "log";
            if (log.isError) {
                logClass = "logerror"
            } else if (log.isWarning) {
                logClass = "logwarning"
            } else if (log.isSuccess) {
                logClass = "logsuccess"
            }
            htmlLogs.push(<div className={logClass} key={htmlLogs.length}>{log.message}</div>)
        }


        // take only the last logs
        // this.state.htmlLogs = this.state.htmlLogs.slice(this.state.htmlLogs.length - this.props.lines, this.state.htmlLogs.length)

        // console.log(this.state.htmlLogs);

        return (
            <div>
                <h1>Terminal</h1>
                <div>
                    {
                        // return all html logs
                        htmlLogs.map((log, index) => {
                            return log
                        })
                    }
                </div>
            </div>
        )
    }
}