import React from 'react';
import { render } from 'react-dom';

import ProgressStage from 'progress/components/ProgressStage';


export default class Progress extends React.Component {

    render () {
        return (
            <div className="Progress col-sm-8 col-sm-offset-2">
                <ProgressStage
                    title={'1. Scraping Tweets'}
                    description={'We\'re collecting as many tweets as we can from your timeline. This may take a few minutes.'}
                    isLoading={!this.props.isScrapingDone}
                />
                 <ProgressStage
                    title={'2. Analysing Tweets'}
                    description={'We\'re looking over your tweets for posts that you won\'t want to be public.'}
                    isLoading={!this.props.isAnalysisDone}
                />
                {this.renderResultsButton()}
            </div>
        );
    }

    renderResultsButton () {
        if (!this.props.isScrapingDone || !this.props.isAnalysisDone) return null;

        return (
            <a href='/me/report/' className='Progress-seeResultsBtn'>
                View Results
            </a>
        );
    }

}
