import React from 'react';
import PropTypes from 'prop-types';

import DateTimePicker from '@react-native-community/datetimepicker';

import {Header, TopIcons, Title} from './styles';

export default function HeaderTitle({
  onChange,
  showDatepicker,
  date,
  mode,
  show,
  navigate,
  day,
  left,
  right,
  middle,
  title,
}) {
  return (
    <>
      <Header AreaFlex>
        <TopIcons name={left} onPress={navigate} />
        <Title>{title}</Title>
        {day ? (
          <TopIcons name={middle} />
        ) : (
          <>
            <TopIcons name={right} onPress={showDatepicker} />
            {show && (
              <DateTimePicker
                locale="pt-BR"
                value={date}
                onChange={onChange}
                mode={mode}
                show={show}
                showDatepicker={showDatepicker}
              />
            )}
          </>
        )}
      </Header>
    </>
  );
}

HeaderTitle.propTypes = {
  onChange: PropTypes.func,
  showDatepicker: PropTypes.func,
  date: PropTypes.object,
  mode: PropTypes.string,
  show: PropTypes.bool,
  navigate: PropTypes.func,
  day: PropTypes.bool,
  left: PropTypes.string,
  right: PropTypes.string,
  middle: PropTypes.string,
  title: PropTypes.string,
};

HeaderTitle.defaultProps = {
  onChange: () => {},
  showDatepicker: () => {},
  date: new Date(),
  mode: 'date',
  show: false,
  navigate: () => {},
  day: false,
  left: 'arrow-left',
  right: 'calendar',
  middle: '',
  title: '',
};

// onChange,
// showMode,
// showDatepicker,
// date,
// mode,
// show,
// navigate,
// day,
// left,
// right,
// middle,
// title,
