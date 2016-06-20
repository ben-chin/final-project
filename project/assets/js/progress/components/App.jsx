import React from 'react';
import { render } from 'react-dom';

import ProgressContainer from 'progress/containers/ProgressContainer';
import ProfileContainer from 'report/containers/ProfileContainer';
import AnalysisOverviewContainer from 'report/containers/AnalysisOverviewContainer';


export default class App extends React.Component {

    render () {
        return (
            <div className='Progress'>
                <ProfileContainer />
                <AnalysisOverviewContainer />
                <ProgressContainer />
            </div>
        );
    }

}