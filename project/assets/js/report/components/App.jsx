import React from 'react';
import { render } from 'react-dom';

import ProfileContainer from 'report/containers/ProfileContainer';
import AnalysisOverviewContainer from 'report/containers/AnalysisOverviewContainer';
import ReportContainer from 'report/containers/ReportContainer';


export default class App extends React.Component {

    render () {
        return (
            <div class="App">
                <ProfileContainer />
                <AnalysisOverviewContainer />
                <ReportContainer />
            </div>
        );
    }

}
