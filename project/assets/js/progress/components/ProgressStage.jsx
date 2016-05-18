import React from 'react';
import { render } from 'react-dom';


export default class Progress extends React.Component {

    render () {
        let className = this.props.isLoading ? 'is-loading' : '';
        return (
            <div className={`ProgressStage ${className}`}>
                <span className='ProgressStage-spinner glyphicon glyphicon-repeat'></span>
                <span className='ProgressStage-done glyphicon glyphicon-ok-sign'></span>
                <div className='ProgressStage-inner'>
                    <h3 className='ProgressStage-title'>{this.props.title}</h3>
                    <p className='ProgressStage-description'>{this.props.description}</p>
                </div>
            </div>
        );
    }

}
