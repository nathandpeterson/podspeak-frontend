import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const FadeIn = Page => {
    return props => 
        <div className='page'>
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionLeave={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                transitionName="fade"> 
                <Page {...props}/>
            </ReactCSSTransitionGroup>
        </div>
}

export default FadeIn