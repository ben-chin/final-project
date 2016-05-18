import React from 'react';
import { connect } from 'react-redux';

import Pusher from 'pusher-js';

import {
    markScrapingDone,
    markAnalysisDone,
} from 'progress/actions/creators';
import Progress from 'progress/components/Progress';

class ProgressContainer extends React.Component {

    constructor (props) {
        super(props);
        this.pusher = new Pusher('24f40a1d963e3f8c8ca1', {
            cluster: 'eu',
            encrypted: true,
        });
    }

    componentDidMount () {
        let channel = this.pusher.subscribe('test_channel');
        channel.bind('my_event', (data) => {
            console.debug('my_event', data, this);
            if (data.isDone === 'scraping') {
                this.props.dispatch(markScrapingDone());
            } else if (data.isDone === 'analysis') {
                this.props.dispatch(markAnalysisDone());
            }
        });
    }

    render () {
        return (
            <Progress
                isScrapingDone={this.props.isScrapingDone}
                isAnalysisDone={this.props.isAnalysisDone}
            />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isScrapingDone: state.isScrapingDone,
        isAnalysisDone: state.isAnalysisDone,
    };
};

export default connect(
    mapStateToProps
)(ProgressContainer)
