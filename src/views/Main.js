import React from 'react';
import spacetime from 'spacetime';
import Piechart from '../components/Piechart.jsx'
import Map from '../components/Map';

import { BASE_COLOR, BORDER_COLOR, HOVER_COLOR, HOVER_BORDER_COLOR, PRESSED_COLOR, PRESSED_BORDER_COLOR, SELECTED_COLOR } from '../constants/colors';

import { getShadedColor } from '../utils/color';

class Main extends React.Component {
  state = {
    selected: {},
    hour:'',
    minute:'',
    seconds:'',
    dayTime:''
  };

  getMapStyles = (geography, index) => {
    return {
      default: {
        outline: 'none',
        transition: '.5s',
        stroke: BORDER_COLOR,
        fill: this.state.selected.id === geography.id ? SELECTED_COLOR : getShadedColor(BASE_COLOR, index)
      },
      hover: {
        outline: 'none',
        cursor: 'pointer',
        stroke: HOVER_BORDER_COLOR,
        fill: this.state.selected.id === geography.id ? SELECTED_COLOR : HOVER_COLOR
      },
      pressed: {
        outline: 'none',
        cursor: 'pointer',
        fill: PRESSED_COLOR,
        stroke: PRESSED_BORDER_COLOR,
      }
    };
  };

  getCurrentTime = timezone => {
    const time = spacetime.now(timezone);
    //:mm:ss a
    this.state.selected.id ?  (
     this.setState(() => ({
      hour:time.unixFmt('h'),
      minute:time.unixFmt('mm'),
      seconds:time.unixFmt('ss'),
      dayTime:time.unixFmt('a')
    }))):(
      this.setState(() => ({
        hour:'',
        minute:'',
        seconds:'',
        dayTime:''
      }))
    )
    ;
  };

  handleClick = geography => {
    const time = spacetime.now(geography.id);

    this.setState(prevState => ({
      selected: prevState.selected.id !== geography.id ? geography : {},
      hour:prevState.selected.id !== geography.id ? (time.unixFmt('h')):'',
      minute:prevState.selected.id !== geography.id ? time.unixFmt('mm'):'',
      seconds:prevState.selected.id !== geography.id ? time.unixFmt('ss'):'',
      dayTime:prevState.selected.id !== geography.id ?time.unixFmt('a'):''
    }));
    console.log(this.state.selected.id)
    //this.getCurrentTime(this.state.selected.id)
  };

  render() {
    return (
      <div>
        <div className='chart-div' >
        <Piechart x={150} y={100} outerRadius={100} innerRadius={10}
          data={[ {value: 30, label: this.state.minute},
          {value: 30, label: this.state.seconds},
          {value: 30, label: this.state.dayTime },
          {value: 30, label: this.state.hour}]} />
        <p style={{textAlign: 'center'}}>{this.state.selected.id}</p>
                 </div>
        <Map getStyles={this.getMapStyles} onClick={this.handleClick} />

      </div>
    );
  }
}

export default Main;
