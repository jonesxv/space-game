import React from 'react';
import './App.css';
import Ship from './Ship';


const keyValue = {
  37:  'left',
  39: 'right',
  38: 'up',
  40: 'down',
  32: 'space'
};
class App extends React.Component {
  
  state =  {
    ctx: null,
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.devicePixelRatio || 1
    },
    keys: {
      left: false,
      right: false,
      up: false,
      down: false,
      space: false
    },
    enemyCount: 2,
    currentScore: 0,
    inGame: false
  }

  ship = [];

  handleKeyPress = (e , keyPress) => {
    this.setState(prevState => {
      return {
        keys: {
          ...prevState.keys,
          [keyValue[e.keyCode]]: keyPress
        }
      }
    })
  }

  handleResize = () => {
    this.setState({
      screen: { 
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
      }
    })
  }

  start = () => {
    this.setState({
      inGame: true,
      currentScore: 0
    })

    let ship = new Ship({
      position: {
        x: this.state.screen.width / 2,
        y: this.state.screen.height - 40
      },
      create: this.createItem
    })
    this.createItem(ship, 'ship')
  }

  createItem = (item, type) => {
    this[type].push(item)
  }

  updateItems = (items, type) => {
    let idx = 0;
    for (let item of items) {
      if (item.delete) {
        this[type].splice(idx, 1);
      } else {
        items[idx].render(this.state)
      }
      idx++;
    }
  }


  renderUpdate = () => {
    const ctx = this.state.ctx;
    const keys = this.state.keys;
    const ship = this.ship[0];

    ctx.save();
    ctx.scale(this.state.screen.ratio, this.state.screen.ratio);

    ctx.fillStyle = '#000';
    ctx.globalAlpha = 0.4;
    ctx.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
    ctx.globalAlpha = 1;

    this.updateItems(this.ship, 'ship')

    ctx.restore();

    requestAnimationFrame(() => this.renderUpdate())
  }

  componentDidMount() {
    window.addEventListener('keyup', e => this.handleKeyPress(e, false))
    window.addEventListener('keydown', e => this.handleKeyPress(e, true))
    window.addEventListener('resize', e => this.handleResize())
    const ctx = this.refs.canvas.getContext('2d')
    this.setState({ ctx })
    this.start()
    requestAnimationFrame(() => this.renderUpdate())
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeys);
    window.removeEventListener('keydown', this.handleKeys);
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div>
        {/* { endgame } */}
        {/* <span className="score current-score" >Score: {this.state.currentScore}</span>
        <span className="score top-score" >Top Score: {this.state.topScore}</span>
        <span className="controls" >
          Use [A][S][W][D] or [←][↑][↓][→] to MOVE<br/>
          Use [SPACE] to SHOOT
        </span>
        <canvas ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        /> */}
        <canvas ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
      </div>
    )
  }
}

export default App;
