import React, { Component } from 'react'
import PlayerButtons from './PlayerButtons'
import PlayerClock from './PlayerClock'
import ReactPlayer from 'react-player'
import { Row, Col } from 'react-materialize'


class Player extends Component {
    constructor(props){
        super(props)
        this.state = {playing: false,
            currentEpisode: '',
            muted: false,
            played: 0,
            playedSeconds: 0
            }
    }
    togglePlay = () => {
        this.setState({playing: !this.state.playing})
    }

    toggleMute = () => {
        this.setState({muted: !this.state.muted})
    }

    renderPlayStatus = () => {
        return this.state.playing ? "playing" : null
    }

    onSeekMouseDown = e => {
        this.setState({ seeking: true })
      }

    onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
        }

    onSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
      }

    onProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
          this.setState(state)
        }
      }

    ref = player => {
        this.player = player
      }
    seek = (val) => {
        // Seeks a new time by figuring diff between current and input value
        const diff = this.state.playedSeconds + val
        this.player.seekTo(parseFloat(diff))
    }
    
    render(){ 
        if(!this.props.audioSource) return <div />
        const { audioSource } = this.props
         return  <div>
              <Row>
                  <Col s={3}></Col>
                  <Col s={6}>
                  <PlayerClock time={this.state.playedSeconds}/>
                    <input
                        type='range' min={0} max={1} step='any'
                        value={this.state.played}
                        onMouseDown={this.onSeekMouseDown}
                        onChange={this.onSeekChange}
                        onMouseUp={this.onSeekMouseUp}/>
                </Col>
                <Col s={3}></Col>
            </Row>
            <Row>
                     <PlayerButtons 
                        togglePlay={ this.togglePlay }
                        playing={ this.state.playing }
                        seek={this.seek}/>
                </Row>
                    <ReactPlayer    url={audioSource} 
                                    type="audio/mp3"
                                    ref={this.ref}
                                    playing={this.state.playing}
                                    seekTo={15}
                                    volume={0.8}
                                    muted={this.state.muted}
                                    onProgress={this.onProgress}
                                    style={{display: 'none'}} />
                </div>
    }
}

export default Player