import moment from 'moment';

export const getStartTime = () => {
  const tempDate = moment().add(1, 'h');
  let currentHour = tempDate.get('hour');
  currentHour += currentHour % 2;

  const startTime = moment()
    .set('hour', currentHour)
    .set('minute', 30)
    .set('second', 0);

  return startTime;
};

export const getDateArr = () => {
  const newDateArr = [];
  let tempDate = '';
  for (let i = 0; i < 14; i++) {
    const today = moment();
    tempDate = today.add(i, 'd');
    newDateArr.push(tempDate);
  }

  return newDateArr;
};
export const getTimeArr = (getWholeDayTimeInterval = false) => {
  const newTimeArr = [];
  const minStartTime = moment()
    .set('hour', '06')
    .set('minute', 30)
    .set('second', 0);
  const startTime = moment().isBefore(minStartTime)
    ? minStartTime
    : getStartTime();

  let tempDate = getWholeDayTimeInterval ? minStartTime : startTime;

  while (tempDate.get('h') <= 22 && tempDate.get('h') > 0) {
    newTimeArr.push(moment(tempDate));
    tempDate.add(2, 'h');
  }

  return newTimeArr;
};
