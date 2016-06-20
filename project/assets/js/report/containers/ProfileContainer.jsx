import dformat from 'dateformat';
import React from 'react';
import { connect } from 'react-redux';

import Profile from 'report/components/Profile';

class ProfileContainer extends React.Component {

    render () {
        return (
            <Profile
                name={this.props.name}
                screenName={this.props.screenName}
                profileImg={this.props.profileImg}
                hasReport={this.props.hasReport}
                followers={this.props.followers}
                following={this.props.following}
                postsCount={this.props.postsCount}
                lastAnalysed={this.props.lastAnalysed}
                isAnalysing={this.props.isAnalysing}
            />
        );
    }

}

const mapStateToProps = (state) => {
    if (!state.user) return {};

    let lastAnalysed = 'Not analysed';
    if (state.isAnalysing) {
        lastAnalysed = 'Performing analysis';
    } else if (state.user.profile.last_analysed) {
        lastAnalysed = dformat(state.user.profile.last_analysed, 'mmmm dS');
    }

    return {
        name: state.user.first_name,
        screenName: state.user.social_auth[0].screen_name,
        profileImg: state.user.profile.profile_img,
        followers: state.user.profile.followers,
        following: state.user.profile.following,
        postsCount: state.user.profile.posts,
        lastAnalysed: lastAnalysed,
        isAnalysing: state.isAnalysing,
    };
};


export default connect(
    mapStateToProps
)(ProfileContainer)
