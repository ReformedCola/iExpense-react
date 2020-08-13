import * as React from 'react';
import styled from 'styled-components';
import dayjs, {Dayjs} from 'dayjs';

type TProps = {
  value: Dayjs
  closeDrawer: () => void
  onSubmit: (newMonth: Dayjs) => void
}

type TMonthItem = {
  selected: boolean
}

const StyledMonthPanel = styled.section`
  padding: 0 16px;
  background:  #FAFAFA;
`;

const Year = styled.section`
  > p {
    padding: 16px 0;
    text-align: center;
    color: ${props => props.theme.$subText};
  }
`;

const MonthList = styled.ul`
  padding-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`;

const MonthItem = styled.li<TMonthItem>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 4px solid #FAFAFA;
  width: 25%;
  font-size: 1.1em;
  padding: 16px;
  background: ${props => props.selected ? props.theme.$success : 'white'};
  color: ${props => props.selected ? 'white' : props.theme.$normalText}
`;

export const getPrevMonths = () => {
  const DURATION = dayjs().month() + 1;

  return [...Array(DURATION)].map((_, index) => dayjs().subtract(index, 'month'));
};

const MonthPanel: React.FC<TProps> = (props) => {
  const {closeDrawer, value, onSubmit} = props;

  const thisYear = dayjs();
  const prevYear = dayjs().subtract(1, 'year');

  const prevMonths = getPrevMonths();
  const prevYearMonths = prevMonths.filter(m => m.isSame(prevYear, 'year'));
  const thisYearMonths = prevMonths.filter(m => m.isSame(thisYear, 'year'));

  const submit = (newMonth: Dayjs) => {
    onSubmit(newMonth);
    closeDrawer();
  };

  return (
    <StyledMonthPanel>
      {/*Months from this year*/}
      {
        thisYearMonths &&
        <Year>
          <p>{thisYear.get('year')}</p>
          <MonthList>
            {thisYearMonths.map(m =>
              <MonthItem selected={m.isSame(value, 'date')}
                         key={m.get('month')}
                         onClick={() => submit(m)}>
                {m.format('MMM')}
              </MonthItem>
            )}
          </MonthList>
        </Year>
      }

      {/*Months from last year*/}
      {
        prevYearMonths.length !== 0 &&
        <Year>
          <p>{prevYear.get('year')}</p>
          <MonthList>
            {prevYearMonths.map(m =>
              <MonthItem selected={m.isSame(value, 'date')}
                         key={m.get('month')}
                         onClick={() => submit(m)}>
                {m.format('MMM')}
              </MonthItem>
            )}
          </MonthList>
        </Year>
      }
    </StyledMonthPanel>
  );
};

export {MonthPanel};
