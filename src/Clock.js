import React from "react";
import "./Clock.css";

// function component
const AnimatedCard = ({ animation, digit }) => {
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const StaticCard = ({ position, digit }) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const FlipUnitContainer = ({ digit, shuffle, unit }) => {
  // assign digit values
  let currentDigit = digit;
  let previousDigit = digit + 1 + 0;

  // to prevent a negative value
  if (unit !== "hours") {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }

  // add zero
  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`;
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`;
  }

  // shuffle digitss
  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;

  // shuffle animations
  const animation1 = shuffle ? "fold" : "unfold";
  const animation2 = !shuffle ? "fold" : "unfold";

  return (
    <div className={"flipUnitContainer"}>
      <StaticCard position={"upperCard"} digit={currentDigit} />
      <StaticCard position={"lowerCard"} digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  );
};

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

// class component
class FlipClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: props.displayTime.hours,
      minutes: props.displayTime.min,
      seconds: props.displayTime.sec,
      hoursShuffle: true,
      minutesShuffle: true,
      secondsShuffle: true,
      countDown: props.popup ? props.liveTime : props.timeInMS,
      setLiveTime: props.setLiveTime,
      setCountDown: props.setCountDown,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 50);
  }

  componentDidUpdate(prevProps) {
    //if the props change...reset the state....
    //console.log(prevProps, this.state.countDown);
    if (
      this.state.countDown === 0 &&
      this.state.countDown !== prevProps.timeInMS
    ) {
      this.setState({ countDown: prevProps.timeInMS });
    }

    if (prevProps.timeInMS === -1) {
      //console.log("max depth huh");
      this.setState({ countDown: 0 });
      this.state.setCountDown(0);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTime() {
    //update time state....
    //console.log(this.state.countDown);
    if (this.state.countDown > 100) {
      this.setState({ countDown: this.state.countDown - 50 });

      this.state.setLiveTime(this.state.countDown);

      const time = msToTime(this.state.countDown);

      const hours = +time.slice(0, 2);
      const minutes = +time.slice(3, 5);
      const seconds = +time.slice(6, 8);

      // on hour chanage, update hours and shuffle state
      if (hours !== this.state.hours) {
        const hoursShuffle = !this.state.hoursShuffle;
        this.setState({
          hours,
          hoursShuffle,
        });
      }
      // on minute chanage, update minutes and shuffle state
      if (minutes !== this.state.minutes) {
        const minutesShuffle = !this.state.minutesShuffle;
        this.setState({
          minutes,
          minutesShuffle,
        });
      }
      // on second chanage, update seconds and shuffle state
      if (seconds !== this.state.seconds) {
        //console.log(seconds);
        const secondsShuffle = !this.state.secondsShuffle;
        this.setState({
          seconds,
          secondsShuffle,
        });
      }
    } else {
      //return to starting state of 00:00:00
      this.setState({ countDown: 0, seconds: 0, minutes: 0, hours: 0 });
      this.state.setCountDown(0);
    }
  }

  render() {
    // state object destructuring
    const {
      hours,
      minutes,
      seconds,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle,
    } = this.state;

    return (
      <div className={"flipClock"}>
        <FlipUnitContainer
          unit={"hours"}
          digit={hours}
          shuffle={hoursShuffle}
        />
        <FlipUnitContainer
          unit={"minutes"}
          digit={minutes}
          shuffle={minutesShuffle}
        />
        <FlipUnitContainer
          unit={"seconds"}
          digit={seconds}
          shuffle={secondsShuffle}
        />
      </div>
    );
  }
}

export default FlipClock;
