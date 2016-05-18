import React from 'react';
import { render } from 'react-dom';


export default class Progress extends React.Component {

    render () {
        return (
            <div>
                <p>is Scraping done: {`${this.props.isScrapingDone}`}</p>
                <p>is Analysis done: {`${this.props.isAnalysisDone}`}</p>
            </div>
        );
    }

}
