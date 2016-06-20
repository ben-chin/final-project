import React from 'react';
import { render } from 'react-dom';

import ProfileContainer from 'report/containers/ProfileContainer';
import AnalysisOverviewContainer from 'report/containers/AnalysisOverviewContainer';


export default class App extends React.Component {

    render () {
        return (
            <div className='YourProfile'>
                <ProfileContainer />
                <AnalysisOverviewContainer />
                <div className="YourProfile-message">
                    <h3 className="YourProfile-messageTitle">
                        You have no results yet
                    </h3>
                    <p className="YourProfile-messageBody">
                        There's nothing here yet. Find out how work-appropriate your Twitter profile is by clicking the analyse button above.
                    </p>
                </div>
            </div>
        );
    }

}