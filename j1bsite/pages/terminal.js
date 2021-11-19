import React, {forwardRef, useRef, useImperativeHandle} from "react";

//@ts-check

export default class Terminal extends React.Component {
    constructor(props) {
        super(props)
        this.allLogs = []
    }

    componentDidMount = () => {
    }


    render() {
        var tempLog = {
            message: "",
            isError: false,
            isWarning: false,
            isSuccess: false
        }

        tempLog.message = this.props.currentLog.message ? this.props.currentLog.message : "";
        tempLog.isError = this.props.currentLog.isError ? this.props.currentLog.isError : false;
        tempLog.isWarning = this.props.currentLog.isWarning ? this.props.currentLog.isWarning : false;
        tempLog.isSuccess = this.props.currentLog.isSuccess ? this.props.currentLog.isSuccess : false;

        var currentLog = tempLog;

        var allLogs = this.allLogs;

        const lastLog = allLogs[allLogs.length - 1]

        var logIsNew = true;
        if (lastLog !== undefined) {
            if (currentLog.message === lastLog.message && currentLog.isError === lastLog.isError && currentLog.isWarning === lastLog.isWarning && currentLog.isSuccess === lastLog.isSuccess) {
                logIsNew = false;
            }
        }
        
        if (logIsNew && currentLog.message !== "") {
            allLogs.push(currentLog)
        }

        const linesToFill = this.props.lines - allLogs.length;

        var htmlLogs = [];

        for (var i = 0; i < linesToFill; i++) {
            htmlLogs.push(<div className="log" key={htmlLogs.length}>&nbsp;</div>)
        }

        for (var i = 0; i < allLogs.length; i++) {
            var log = allLogs[i]
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


        this.allLogs = allLogs;

        // limit htmllogs to max lines
        if (htmlLogs.length > this.props.lines) {
            htmlLogs = htmlLogs.slice(htmlLogs.length - this.props.lines)
        }

        return (
            <div>
                <div className="terminalLogs">
                    {
                        htmlLogs.map((log, index) => {
                            return log
                        })
                    }
                </div>
            </div>
        )
    }
}