import React from 'react';
import { render } from 'react-dom';
import dformat from 'dateformat';

export default class Profile extends React.Component {

    render () {
        return (
            <div className="Profile">
                <div className="Profile-left">
                    <div className="Profile-imgWrapper">
                        <img className="Profile-img" src={this.props.profileImg} />
                    </div>
                    <header className="Profile-header">
                        <h3 className="Profile-name">{this.props.name}</h3>
                        <p className="Profile-screenName">@{this.props.screenName}</p>
                    </header>
                </div>
                <div className="Profile-right">
                    <div className="Profile-twtInfo">
                        <div className="Profile-twtInfoRow">
                            <span className="Profile-twtInfoLabel">Followers</span>
                            <span className="Profile-twtInfoDetail">{this.props.followers}</span>
                        </div>
                        <div className="Profile-twtInfoRow">
                            <span className="Profile-twtInfoLabel">Following</span>
                            <span className="Profile-twtInfoDetail">{this.props.following}</span>
                        </div>
                    </div>
                </div>
                <div className="Profile-right">
                    <div className="Profile-twtInfo">
                        <div className="Profile-twtInfoRow">
                            <span className="Profile-twtInfoLabel">Posts</span>
                            <span className="Profile-twtInfoDetail">{this.props.postsCount}</span>
                        </div>
                        <div className="Profile-twtInfoRow">
                            <span className="Profile-twtInfoLabel">Analysed</span>
                            <span className="Profile-twtInfoDetail">
                                {this.props.lastAnalysed}
                            </span>
                        </div>
                    </div>    
                </div>
            </div>
        );
    }

}
