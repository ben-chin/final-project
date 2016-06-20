import React from 'react';
import { render } from 'react-dom';


export default class AnalysisOverview extends React.Component {

    render () {
        return (
            <div className="AnalysisOverview">
                <header className="AnalysisOverview-header">
                    <h3 className="AnalysisOverview-headerTitle">Sentry Analysis</h3>
                </header>
                {this.renderExplanation()}
                {this.renderAnalyseButton()}
            </div>
        );
    }

    renderExplanation () {
        if (this.props.hasReport) {
            return (
                <p className="AnalysisOverview-explanation">
                    We've analysed your <a href={this.props.profileUrl}>Twitter profile</a> and your results are below. You can use the control panel below to automatically delete tweets you no longer want or delete them individually.
                    <br />
                    <br />
                    <strong><em>Happy cleaning!</em></strong>
                </p>
            );
        } else {
            if (this.props.isAnalysing) {
                return (
                    <p className="AnalysisOverview-explanation">
                        We are currently analysing your <a href={this.props.profileUrl}>Twitter profile</a>. This should only take a few minutes, please bear with us!
                        <br/>
                        <br/>
                        You can view the progess of your analysis below. Once it's finished, you'll be able to click to view your report.
                    </p>
                );
            } else {
                return (
                    <p className="AnalysisOverview-explanation">
                        We don't have an analysis for your <a href={this.props.profileUrl}>Twitter profile</a> yet.
                    </p>
                );
            }
        }
    }

    renderAnalyseButton () {
        if (this.props.hasReport || this.props.isAnalysing) return null;

        return (
            <p className="AnalysisOverview-analyse">
                <a href="/me/analyse" className="AnalysisOverview-analyseBtn">
                    Analyse 
                </a>
            </p>
        );
    }

}
