import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const SlideIn = Page => {
    return props => 
        <div className='page'>
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionLeave={true}
                transitionAppearTimeout={1000}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={500}
                transitionName="SlideIn"> 
                <Page {...props}/>
            </ReactCSSTransitionGroup>
        </div>
}

export default SlideIn