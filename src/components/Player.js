import React, { Component } from 'react'
import PlayerButtons from './PlayerButtons'
import PlayerClock from './PlayerClock'
import ReactPlayer from 'react-player'
import PubSub from 'pubsub-js'
import { Card, Col, Row } from 'react-materialize'
import '../styles/PlayerStyle.css'

const pad = (unit) => unit < 10 ? `0${unit.toString()}` : unit.toString()

const timeFormat = (hour, minute, sec) => `${pad(hour)}:${pad(minute)}:${pad(sec)}`

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
    componentWillUpdate(nextProps){
        let currentSeconds = Math.floor(this.state.playedSeconds % 60)
        let currentMinute = Math.floor(this.state.playedSeconds/ 60) % 60
        let currentHour = Math.floor(this.state.playedSeconds / 3600)
        let timeStamp = timeFormat(currentHour, currentMinute, currentSeconds)
        PubSub.publish('TIMESTAMP', timeStamp)
        if(currentMinute !== nextProps.currentMinute) this.props.updateMinutes(currentMinute)
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
        // I only want to update time slider if we are not currently seeking
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
                    <div style={{fontSize: '2.5rem'}} className="center">
                    <div style={{backgroundColor: 'white', padding: '0 .5rem', borderRadius: '5%'}}>
                        <PlayerClock time={this.state.playedSeconds} />
                    </div>
                  </div>
                  <Row>
                      <Col s={1}></Col>
                      <Col s={10}>
                        <input
                            type='range' min={0} max={1} step='any'
                            value={this.state.played}
                            onMouseDown={this.onSeekMouseDown}
                            onChange={this.onSeekChange}
                            onMouseUp={this.onSeekMouseUp}/>
                        </Col>
                        <Col s={1}></Col>
                    </Row>
           
                <PlayerButtons 
                    togglePlay={ this.togglePlay }
                    playing={ this.state.playing }
                    seek={this.seek}/>
              
                <ReactPlayer    url={audioSource} 
                                type="audio/mp3"
                                ref={this.ref}
                                playing={this.state.playing}
                                seekto={15}
                                volume={0.8}
                                muted={this.state.muted}
                                onProgress={this.onProgress}
                                style={{display: 'none'}} />
                </div>
    }
}

export default Player