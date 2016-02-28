'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} = React;

var {
  width,
  height,
} = Dimensions.get('window');

var WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var HOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
var MINUTES = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 
  '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', 
  '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', 
  '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', 
  '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', 
  '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',];
var AMPM = ['AM', 'PM'];
var MAX_ROWS = 7;
var MAX_COLUMNS = 7;
var getDaysInMonth = function(month, year) {
  var lastDayOfMonth = new Date(year, month + 1, 0);
  return lastDayOfMonth.getDate();
};

var styles = StyleSheet.create({
  calendar: {
    width: width,
    marginTop: 10
  },
  dayWrapper: {
    width: width/7 - 16/7,
    height: width/7 - 16/7,
    borderRadius: (width/7 - 16/7)/2,
    backgroundColor: 'rgba(0,0,0,0.0)'
  },
  dayButton: {
    width: width/7 - 32/7,
    height: width/7 - 32/7,
    borderRadius: (width/7 - 32/7)/2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dayButtonSelected: {
    width: width/7 - 32/7,
    height: width/7 - 32/7,
    borderRadius: (width/7 - 32/7)/2,
    backgroundColor: '#D6BA79',
    alignSelf: 'center'
  },
  dayLabel: {
    fontSize: 14,
    color: '#000',
    alignSelf: 'center'
  },
  dayLabelsWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
    borderColor: 'rgba(0,0,0,0.12)'
  },
  daysWrapper: {
    alignSelf: 'center',
  },
  dayLabels: {
    width: width/7 - 24/7,
    fontSize: 10,
    color: '#000',
    textAlign: 'center',
  },
  selectedDay: {
    width: width/7,
    height: width/7,
    backgroundColor: '#5ce600',
    borderRadius: width/7/2,
    alignSelf: 'center'
  },
  monthLabel: {
    fontSize: 16,
    color: '#000',
    width: width/3,
    textAlign: 'center'
  },
  headerWrapper: {
    alignItems: 'center',  
    flexDirection: 'row',
    alignSelf: 'center',
    width: width,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingBottom: 3,
    backgroundColor: 'rgba(0,0,0,0.0)'
  },
  monthSelector: {
    width: width/3 - 16,
  },
  prev: {
    marginLeft: 8,
    textAlign: 'left',
    fontSize: 16,
  },
  next: {
    marginRight: 8,
    textAlign: 'right',
    fontSize: 16,
  },
  yearLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center'
  },
  weeks: {
    flexDirection: 'column'
  },
  weekRow: {
    flexDirection: 'row'
  }
});

var Day = React.createClass({
  propTypes: {
    onDayChange: React.PropTypes.func,
    selected: React.PropTypes.bool,
    day: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ]).isRequired
  },
  getDefaultProps () {
    return {
      onDayChange () {}
    }
  },
  render() {
    if (this.props.selected) {
      return (
        <View style={styles.dayWrapper}>
          <View style={styles.dayButtonSelected}>
            <TouchableOpacity
              style={styles.dayButton}
              onPress={() => this.props.onDayChange(this.props.day) }>
              <Text style={styles.dayLabel}>
                {this.props.day}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.dayWrapper}>
          <TouchableOpacity
            style={styles.dayButton}
            onPress={() => this.props.onDayChange(this.props.day) }>
            <Text style={styles.dayLabel}>
              {this.props.day}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
});

var Days = React.createClass({
  propTypes: {
    date: React.PropTypes.instanceOf(Date).isRequired,
    month: React.PropTypes.number.isRequired,
    year: React.PropTypes.number.isRequired,
    onDayChange: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      selectedStates: [],
    };
  },

  componentDidMount() {
    this.updateSelectedStates(this.props.date.getDate());
  },

  updateSelectedStates(day) {
    var selectedStates = [],
      daysInMonth = getDaysInMonth(this.props.month, this.props.year),
      i;

    for (i = 1; i <= daysInMonth; i++) {
      if (i === day) {
        selectedStates.push(true);
      } else {
        selectedStates.push(false);
      }
    }

    this.setState({
      selectedStates: selectedStates,
    });

  },

  onPressDay(day) {
    this.updateSelectedStates(day);
    this.props.onDayChange({day: day});
  },

  // Not going to touch this one - I'd look at whether there is a more functional
  // way you can do this using something like `range`, `map`, `partition` and such
  // (see underscore.js), or just break it up into steps: first generate the array for
  // data, then map that into the components
  getCalendarDays() {
    var columns,
      matrix = [],
      i,
      j,
      month = this.props.month,
      year = this.props.year,
      currentDay = 0,
      thisMonthFirstDay = new Date(year, month, 1),
      slotsAccumulator = 0;

    for(i = 0; i < MAX_ROWS; i++ ) { // Week rows
      columns = [];

      for(j = 0; j < MAX_COLUMNS; j++) { // Day columns
        if (slotsAccumulator >= thisMonthFirstDay.getDay()) {
          if (currentDay < getDaysInMonth(month, year)) {
            columns.push(<Day
                      key={j}
                      day={currentDay+1}
                      selected={this.state.selectedStates[currentDay]}
                      date={this.props.date}
                      onDayChange={this.onPressDay} />);
            currentDay++;
          }
        } else {
          columns.push(<Day key={j} day={''}/>);
        }

        slotsAccumulator++;
      }
      matrix[i] = [];
      matrix[i].push(<View style={styles.weekRow}>{columns}</View>);
    }

    return matrix;
  },

  render() {
    return <View style={styles.daysWrapper}>{ this.getCalendarDays() }</View>;
  }

});

var WeekDaysLabels = React.createClass({
  render() {
    return (
      <View style={styles.dayLabelsWrapper}>
        { WEEKDAYS.map((day, key) => { return <Text key={key} style={styles.dayLabels}>{day}</Text> }) }
      </View>
    );
  }
});

var HeaderControls = React.createClass({
  propTypes: {
    month: React.PropTypes.number.isRequired,
    getNextYear: React.PropTypes.func.isRequired,
    getPrevYear: React.PropTypes.func.isRequired,
    onMonthChange: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      selectedMonth: this.props.month
    };
  },

  // Logic seems a bit awkawardly split up between here and the CalendarPicker
  // component, eg: getNextYear is actually modifying the state of the parent,
  // could just let header controls hold all of the logic and have CalendarPicker
  // `onChange` callback fire and update itself on each change
  getNext() {
    var next = this.state.selectedMonth + 1;
    if (next > 11) {
      this.setState({ selectedMonth: 0 },() => {
        this.props.onMonthChange(this.state.selectedMonth);
      });
      this.props.getNextYear();
    } else {
      this.setState({ selectedMonth: next },() => {
        this.props.onMonthChange(this.state.selectedMonth);
      });
    }
  },

  getPrevious() {
    var prev = this.state.selectedMonth - 1;
    if (prev < 0) {
      this.setState({ selectedMonth: 11 },() => {
        this.props.onMonthChange(this.state.selectedMonth);
      });
      this.props.getPrevYear();
    } else {
      this.setState({ selectedMonth: prev }, () => {
        this.props.onMonthChange(this.state.selectedMonth);
      });
    }

  },

  render() {
    return (
      <View style={styles.headerWrapper}>
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={this.getPrevious}>
            <Text style={styles.prev}>{'<'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.monthLabel}>
            { MONTHS[this.state.selectedMonth] } { this.props.year }
          </Text>
        </View>
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={this.getNext}>
            <Text style={styles.next}>{'>'}</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
});

var Time = React.createClass({
  componentWillMount() {
    this.starthour = this.props.hour % 12;
    this.startmin = this.props.minute;
    this.startampm = this.props.hour >= 12 ? 'pm' : 'am';

    this.hour = this.starthour;
    this.minute = this.startmin;
    this.ampm = this.startampm;
  },
  render() {
    return (
      <View
        style={{
          marginVertical: 8,
          marginHorizontal: 4,
          height: 90,
          borderTopWidth: 1,
          borderColor: 'rgba(0,0,0,0.12)',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: (width/6 - 16),
          }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 30,
              alignItems: 'center',
            }}
            snapToInterval={30}
            decelerationRate={0.9}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={false}
            onScroll={this._setHour}
            contentOffset={{
              y: this.starthour == 0
                ? 330
                : (this.starthour - 1) * 30,
            }}
          >
            {HOURS.map(v => {
              return (
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 5.25,
                  }}
                >
                  {v}
                </Text>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: 30 + 5.25,
            width: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
          :
          </Text>
        </View>
        <View
          style={{
            width: (width/6 - 16),
          }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 30,
              alignItems: 'center',
            }}
            snapToInterval={30}
            decelerationRate={0.9}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={false}
            onScroll={this._setMinute}
            contentOffset={{
              y: this.startmin * 30,
            }}
          >
            {MINUTES.map(v => {
              return (
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 5.25,
                  }}
                >
                  {v}
                </Text>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            width: (width/4 - 16),
          }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 30,
              alignItems: 'center',
            }}
            snapToInterval={30}
            decelerationRate={0.998}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={false}
            onScroll={this._setAMPM}
            contentOffset={{
              y: this.startampm == 'am' ? 0 : 30,
            }}
          >
            {AMPM.map(v => {
              return (
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 5.25,
                  }}
                >
                  {v}
                </Text>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  },
  starthour: 0,
  startmin: 0,
  startampm: 'am',
  hour: 0,
  minute: 0,
  ampm: 'am',
  _setHour(e) {
    var check = e.nativeEvent.contentOffset.y;
    if(check % 1 != 0) return;
    var temp = Math.round(check / 30 + 1);
    if(temp < 1 || temp > 12) return;
    this.hour = temp;
    this.props.timeChange(this.hour + (this.ampm == 'am' ? 0 : 12), this.minute);
  },
  _setMinute(e) {
    var check = e.nativeEvent.contentOffset.y;
    if(check % 1 != 0) return;
    var temp = Math.round(check / 30 + 1);
    if(temp < 1 || temp > 60) return;
    this.minute = temp - 1;
    this.props.timeChange(this.hour + (this.ampm == 'am' ? 0 : 12), this.minute);
  },
  _setAMPM(e) {
    var check = e.nativeEvent.contentOffset.y;
    if(check % 1 != 0) return;
    this.ampm = check / 30 < 0.5 ? 'am' : 'pm';
    this.props.timeChange(this.hour + (this.ampm == 'am' ? 0 : 12), this.minute);
  },
});

var DateTimePicker = React.createClass({
  propTypes: {
    selectedDate: React.PropTypes.instanceOf(Date).isRequired,
    onDateChange: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      onDateChange () {}
    }
  },
  getInitialState() {
    this.hour = this.props.selectedDate.getHours();
    this.minute = this.props.selectedDate.getMinutes();
    return {
      date: this.props.selectedDate,
      day: this.props.selectedDate.getDate(),
      month: this.props.selectedDate.getMonth(),
      year: this.props.selectedDate.getFullYear(),
      hour: this.props.selectedDate.getHours(),
      minute: this.props.selectedDate.getMinutes(),
      selectedDay: [],
    };
  },

  onTimeChange(hour, minute) {
    this.hour = hour;
    this.minute = minute;
    this.onDateTimeChange();
  },

  onDayChange(day) {
    this.setState({day: day.day,}, () => {
      this.onDateChange();
    });
  },

  onMonthChange(month) {
    this.setState({month: month,}, () => {
      this.onDateChange();
    });
  },

  getNextYear(){
    this.setState({year: this.state.year + 1,}, () => {
      this.onDateChange();
    });
  },

  getPrevYear() {
    this.setState({year: this.state.year - 1,}, () => {
      this.onDateChange();
    });
  },

  onDateChange() {
    var {
      day,
      month,
      year,
    } = this.state,
      date = new Date(year, month, day);

    this.setState({date: date,}, () => {
      this.onDateTimeChange();
    });
  },

  onDateTimeChange() {
    var date = new Date(this.state.year, this.state.month, this.state.day, this.hour, this.minute);
    this.props.onDateTimeChange(date)
  },

  render() {
    return (
      <View style={[styles.calendar, this.props.style]}>
        <HeaderControls
          year= {this.state.year}
          month={this.state.month}
          onMonthChange={this.onMonthChange}
          getNextYear={this.getNextYear}
          getPrevYear={this.getPrevYear} />

        <WeekDaysLabels />

        <Days
          month={this.state.month}
          year={this.state.year}
          date={this.state.date}
          onDayChange={this.onDayChange} />
        <Time
          hour={this.state.hour}
          minute={this.state.minute}
          timeChange={this.onTimeChange}
        />
      </View>
    );
  },
  hour: 0,
  minute: 0,
});

module.exports = DateTimePicker;
