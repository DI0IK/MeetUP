import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './custom-toolbar.css';
import { Button } from '@/components/custom-ui/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomToolbarProps {
  //Aktuell angezeigtes Datum
  date: Date;
  //Aktuelle Ansicht
  view: 'month' | 'week' | 'day' | 'agenda';

  onNavigate: (action: string, newDate?: Date) => void;
  //Ansichtwechsel
  onView: (newView: 'month' | 'week' | 'day' | 'agenda') => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  date,
  view,
  onNavigate,
  onView,
}) => {
  //ISO-Wochennummer eines Datums ermitteln
  const getISOWeek = (date: Date): number => {
    const tmp = new Date(date.getTime());
    //Datum so verschieben, dass der nächste Donnerstag erreicht wird (ISO: Woche beginnt am Montag)
    tmp.setDate(tmp.getDate() + 4 - (tmp.getDay() || 7));
    const yearStart = new Date(tmp.getFullYear(), 0, 1);
    const weekNo = Math.ceil(
      ((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
    );
    return weekNo;
  };

  //ISO-Wochenjahr eines Datums ermitteln
  const getISOWeekYear = (date: Date): number => {
    const tmp = new Date(date.getTime());
    tmp.setDate(tmp.getDate() + 4 - (tmp.getDay() || 7));
    return tmp.getFullYear();
  };

  //Ermittlung der Anzahl der Wochen im Jahr
  const getISOWeeksInYear = (year: number): number => {
    const d = new Date(year, 11, 31);
    const week = getISOWeek(d);
    return week === 1 ? getISOWeek(new Date(year, 11, 24)) : week;
  };

  const getDateOfISOWeek = (week: number, year: number): Date => {
    const jan1 = new Date(year, 0, 1);
    const dayOfWeek = jan1.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    let firstMonday: Date;
    if (isoDayOfWeek <= 4) {
      //1. Januar gehört zur ersten ISO-Woche (Montag dieser Woche bestimmen)
      firstMonday = new Date(year, 0, 1 - isoDayOfWeek + 1);
    } else {
      //Ansonsten liegt der erste Montag in der darauffolgenden Woche
      firstMonday = new Date(year, 0, 1 + (8 - isoDayOfWeek));
    }
    firstMonday.setDate(firstMonday.getDate() + (week - 1) * 7);
    return firstMonday;
  };

  //Lokaler State für Woche und ISO-Wochenjahr (statt des reinen Kalenderjahrs)
  const [selectedWeek, setSelectedWeek] = useState<number>(getISOWeek(date));
  const [selectedYear, setSelectedYear] = useState<number>(
    getISOWeekYear(date),
  );

  //Auswahl aktualisieren, wenn sich die Prop "date" ändert
  useEffect(() => {
    setSelectedWeek(getISOWeek(date));
    setSelectedYear(getISOWeekYear(date));
  }, [date]);

  //Dropdown-Liste der Wochen
  const totalWeeks = getISOWeeksInYear(selectedYear);
  const weekOptions = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  //Jahresliste
  const yearOptions = Array.from(
    { length: 21 },
    (_, i) => selectedYear - 10 + i,
  );

  //Start (Montag) und Ende (Sonntag) der aktuell angezeigten Woche berechnen
  const weekStartDate = getDateOfISOWeek(selectedWeek, selectedYear);
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekStartDate.getDate() + 6);

  //Monat und Jahr von Start- und Enddatum ermitteln
  const monthStart = format(weekStartDate, 'MMMM');
  const monthEnd = format(weekEndDate, 'MMMM');
  const yearAtStart = format(weekStartDate, 'yyyy');
  const yearAtEnd = format(weekEndDate, 'yyyy');

  //Ansichtwechsel
  const handleViewChange = (newView: 'month' | 'week' | 'day' | 'agenda') => {
    onView(newView);
  };

  //Today-Button aktualisiert das Datum im DatePicker auf das heutige
  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setSelectedWeek(getISOWeek(today));
    setSelectedYear(getISOWeekYear(today));
    onNavigate('TODAY', today);
  };

  //Pfeiltaste nach Vorne
  const handleNext = () => {
    let newDate: Date;
    if (view === 'day' || view === 'agenda') {
      newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      let newWeek = selectedWeek + 1;
      let newYear = selectedYear;
      if (newWeek > getISOWeeksInYear(selectedYear)) {
        newYear = selectedYear + 1;
        newWeek = 1;
      }
      setSelectedWeek(newWeek);
      setSelectedYear(newYear);
      newDate = getDateOfISOWeek(newWeek, newYear);
    } else if (view === 'month') {
      newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    } else {
      newDate = new Date(date);
    }
    //Datum im DatePicker aktualisieren
    setSelectedDate(newDate);
    onNavigate('SET_DATE', newDate);
  };

  //Pfeiltaste nach Hinten
  const handlePrev = () => {
    let newDate: Date;
    if (view === 'day' || view === 'agenda') {
      newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      let newWeek = selectedWeek - 1;
      let newYear = selectedYear;
      if (newWeek < 1) {
        newYear = selectedYear - 1;
        newWeek = getISOWeeksInYear(newYear);
      }
      setSelectedWeek(newWeek);
      setSelectedYear(newYear);
      newDate = getDateOfISOWeek(newWeek, newYear);
    } else if (view === 'month') {
      newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    } else {
      newDate = new Date(date);
    }
    //Datum im DatePicker aktualisieren
    setSelectedDate(newDate);
    onNavigate('SET_DATE', newDate);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      if (view === 'week') {
        const newWeek = getISOWeek(date);
        const newYear = getISOWeekYear(date);
        setSelectedWeek(newWeek);
        setSelectedYear(newYear);
        const newDate = getDateOfISOWeek(newWeek, newYear);
        onNavigate('SET_DATE', newDate);
      } else if (view === 'day') {
        onNavigate('SET_DATE', date);
      } else if (view === 'month') {
        const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
        onNavigate('SET_DATE', newDate);
      } else if (view === 'agenda') {
        onNavigate('SET_DATE', date);
      }
    }
  };

  return (
    <div
      className='custom-toolbar'
      style={{ display: 'flex', flexDirection: 'initial', gap: '8px' }}
    >
      <div className='view-change'>
        <div className='view-switcher' style={{ display: 'flex', gap: '8px' }}>
          <Button
            //className='hover:bg-orange-600 hover:text-white'
            type='submit'
            variant='primary'
            onClick={() => handleViewChange('month')}
            size={'default'}
          >
            Month
          </Button>
          <Button
            //className='hover:bg-orange-600 hover:text-white'
            type='submit'
            variant='primary'
            onClick={() => handleViewChange('week')}
            size={'default'}
          >
            Week
          </Button>
          <Button
            //className='hover:bg-orange-600 hover:text-white'
            type='submit'
            variant='primary'
            onClick={() => handleViewChange('day')}
            size={'default'}
          >
            Day
          </Button>
          <Button
            //className='hover:bg-orange-600 hover:text-white'
            type='submit'
            variant='primary'
            onClick={() => handleViewChange('agenda')}
            size={'default'}
          >
            Agenda
          </Button>
        </div>
      </div>

      <div
        className='right-section'
        style={{ display: 'flex', flexDirection: 'initial', gap: '8px' }}
      >
        <div
          className='navigation-controls'
          style={{ display: 'flex', gap: '8px' }}
        >
          <div className='handleWeek'>
            <button onClick={handlePrev}>&lt;</button>
            <button onClick={handleNext}>&gt;</button>
          </div>
          <div className='today'>
            <Button
              //className='hover:bg-orange-600 hover:text-white'
              type='submit'
              variant='secondary'
              onClick={() => handleToday()}
              size={'default'}
            >
              Today
            </Button>
          </div>
        </div>

        <div className='datepicker-box'>
          <DatePicker
            className='datepicker'
            selected={selectedDate}
            onChange={handleDateChange}
            calendarStartDay={1}
            locale='de-DE'
            dateFormat='dd.MM.yyyy'
            showWeekNumbers={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomToolbar;
