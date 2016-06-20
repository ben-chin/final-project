import React from 'react';
import { connect } from 'react-redux';

import AnalysisOverview from 'report/components/AnalysisOverview';

class AnalysisOverviewContainer extends React.Component {

    render () {
        return (
            <AnalysisOverview
                profileUrl={this.props.profileUrl}
                hasReport={this.props.hasReport}
                isAnalysing={this.props.isAnalysing}
            />
        );
    }

}

const mapStateToProps = (state) => {
    if (!state.user) return {};

    return {
        profileUrl: state.user.profile.profile_img,
        hasReport: !!state.user.profile.last_analysed,
        isAnalysing: state.isAnalysing,
    };
};


export default connect(
    mapStateToProps
)(AnalysisOverviewContainer)
