import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './custom-toolbar.css';

interface CustomToolbarProps {
  // Das aktuell angezeigte Datum (wird z. B. von der Calendar-Komponente geliefert)
  date: Date;
  // Aktuelle Ansicht: "month", "week", "day" oder "agenda"
  view: 'month' | 'week' | 'day' | 'agenda';
  /**
   * onNavigate ermöglicht das Wechseln des angezeigten Datums.
   * Action kann bspw. 'TODAY' oder 'SET_DATE' sein; newDate wird übergeben, wenn benötigt.
   */
  onNavigate: (action: string, newDate?: Date) => void;
  // onView wechselt die Ansicht
  onView: (newView: 'month' | 'week' | 'day' | 'agenda') => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ date, view, onNavigate, onView }) => {
  
  // Hilfsfunktion, um die ISO-Wochennummer eines Datums zu ermitteln
  const getISOWeek = (date: Date): number => {
    const tmp = new Date(date.getTime());
    // Verschiebe das Datum so, dass der nächste Donnerstag erreicht wird (ISO: Woche beginnt am Montag)
    tmp.setDate(tmp.getDate() + 4 - (tmp.getDay() || 7));
    const yearStart = new Date(tmp.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((tmp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  };

  // Neue Funktion: Ermittelt das ISO-Wochenjahr eines Datums.
  // Das ISO-Wochenjahr entspricht dem Jahr des Donnerstags in dieser Woche.
  const getISOWeekYear = (date: Date): number => {
    const tmp = new Date(date.getTime());
    tmp.setDate(tmp.getDate() + 4 - (tmp.getDay() || 7));
    return tmp.getFullYear();
  };

  // Ermittelt die Anzahl der ISO-Wochen im Jahr
  const getISOWeeksInYear = (year: number): number => {
    const d = new Date(year, 11, 31);
    const week = getISOWeek(d);
    return week === 1 ? getISOWeek(new Date(year, 11, 24)) : week;
  };

  /* 
    Berechnet den Montag der gewünschten ISO-Woche eines Jahres.
    Wir ermitteln zunächst den ersten Montag der ersten ISO-Woche und addieren dann (week - 1) * 7 Tage.
  */
  const getDateOfISOWeek = (week: number, year: number): Date => {
    const jan1 = new Date(year, 0, 1);
    const dayOfWeek = jan1.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    let firstMonday: Date;
    if (isoDayOfWeek <= 4) {
      // Jan 1 gehört zur ersten ISO-Woche – bestimme den Montag dieser Woche
      firstMonday = new Date(year, 0, 1 - isoDayOfWeek + 1);
    } else {
      // Andernfalls liegt der erste Montag in der darauffolgenden Woche
      firstMonday = new Date(year, 0, 1 + (8 - isoDayOfWeek));
    }
    firstMonday.setDate(firstMonday.getDate() + (week - 1) * 7);
    return firstMonday;
  };

  // Lokaler State für Woche und ISO-Wochenjahr (statt des reinen Kalenderjahrs)
  const [selectedWeek, setSelectedWeek] = useState<number>(getISOWeek(date));
  const [selectedYear, setSelectedYear] = useState<number>(getISOWeekYear(date));

  // Aktualisiere die Auswahl, wenn sich die Prop "date" ändert
  useEffect(() => {
    setSelectedWeek(getISOWeek(date));
    setSelectedYear(getISOWeekYear(date));
  }, [date]);

  // Für die Dropdown-Liste der Wochen: Liste von 1 bis totalWeeks
  const totalWeeks = getISOWeeksInYear(selectedYear);
  const weekOptions = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  // Beispielhafte Jahresliste: aktuelles ISO-Wochenjahr ± 10
  const yearOptions = Array.from({ length: 21 }, (_, i) => selectedYear - 10 + i);

  // Berechne den Start (Montag) und das Ende (Sonntag) der aktuell angezeigten Woche
  const weekStartDate = getDateOfISOWeek(selectedWeek, selectedYear);
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekStartDate.getDate() + 6);

  // Ermittele Monat und Jahr von Start- und Enddatum (normales Kalenderjahr)
  const monthStart = format(weekStartDate, 'MMMM');
  const monthEnd = format(weekEndDate, 'MMMM');
  const yearAtStart = format(weekStartDate, 'yyyy');
  const yearAtEnd = format(weekEndDate, 'yyyy');

  // Erstelle das Label:
  // 1. Falls der Wochenanfang und das Wochenende in unterschiedlichen Jahren liegen,
  //    wird z. B. "Dezember 2025 - Januar 2026" angezeigt.
  // 2. Liegen beide im gleichen Jahr, wird unterschieden zwischen gleichem Monat und unterschiedlichem Monat.
  let dateLabel: string;
  if (yearAtStart !== yearAtEnd) {
    dateLabel = `${monthStart} ${yearAtStart} - ${monthEnd} ${yearAtEnd}`;
  } else if (monthStart !== monthEnd) {
    dateLabel = `${monthStart} - ${monthEnd} ${yearAtStart}`;
  } else {
    dateLabel = `${monthStart} ${yearAtStart}`;
  }

  // Handler zum Wechseln der Ansicht
  const handleViewChange = (newView: 'month' | 'week' | 'day' | 'agenda') => {
    onView(newView);
  };

  // "Today"-Button: setzt das Datum auf das heutige Datum (unter Verwendung des ISO-Wochenjahrs)
  const handleToday = () => {
    const today = new Date();
    setSelectedWeek(getISOWeek(today));
    setSelectedYear(getISOWeekYear(today));
    onNavigate('TODAY', today);
  };

  // Wechselt zur vorherigen Woche. Bei Woche < 1, wird ins Vorjahr gewechselt.
  const handlePrevWeek = () => {
    let newWeek = selectedWeek - 1;
    let newYear = selectedYear;
    if (newWeek < 1) {
      newYear = selectedYear - 1;
      newWeek = getISOWeeksInYear(newYear);
    }
    setSelectedWeek(newWeek);
    setSelectedYear(newYear);
    const newDate = getDateOfISOWeek(newWeek, newYear);
    onNavigate('SET_DATE', newDate);
  };

  // Wechselt zur nächsten Woche. Überschreitet die Woche die maximale Zahl, wechselt ins nächste Jahr.
  const handleNextWeek = () => {
    let newWeek = selectedWeek + 1;
    let newYear = selectedYear;
    if (newWeek > getISOWeeksInYear(selectedYear)) {
      newYear = selectedYear + 1;
      newWeek = 1;
    }
    setSelectedWeek(newWeek);
    setSelectedYear(newYear);
    const newDate = getDateOfISOWeek(newWeek, newYear);
    onNavigate('SET_DATE', newDate);
  };

  // Handler, wenn der Nutzer über das Dropdown eine Woche auswählt
  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newWeek = parseInt(event.target.value, 10);
    setSelectedWeek(newWeek);
    const newDate = getDateOfISOWeek(newWeek, selectedYear);
    onNavigate('SET_DATE', newDate);
  };

  // Handler, wenn der Nutzer über das Dropdown ein Jahr auswählt
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setSelectedYear(newYear);
    const totalWeeksInNewYear = getISOWeeksInYear(newYear);
    const newWeek = Math.min(selectedWeek, totalWeeksInNewYear);
    setSelectedWeek(newWeek);
    const newDate = getDateOfISOWeek(newWeek, newYear);
    onNavigate('SET_DATE', newDate);
  };

  return (
    <div className="custom-toolbar" style={{ display: 'flex', flexDirection: 'initial', gap: '8px' }}>
      {/* Anzeige des Datums-Labels */}
      <div className="current-date" style={{ fontWeight: 'bold' }}>
        {dateLabel}
      </div>

      {/* Ansicht wechseln */}
      <div className='view-change'>
        <div className="view-switcher" style={{ display: 'flex', gap: '8px' }}>
          <button disabled={view === 'month'} onClick={() => handleViewChange('month')}>Month</button>
          <button disabled={view === 'week'} onClick={() => handleViewChange('week')}>Week</button>
          <button disabled={view === 'day'} onClick={() => handleViewChange('day')}>Day</button>
          <button disabled={view === 'agenda'} onClick={() => handleViewChange('agenda')}>Agenda</button>
        </div>
      </div>

      <div className="right-section" style={{ display: 'flex', flexDirection: 'initial', gap: '8px' }}>
        {/* Navigationsbuttons */}
        <div className="navigation-controls" style={{ display: 'flex', gap: '8px' }}>
          <div className="handleWeek">
            <button onClick={handlePrevWeek}>&lt;</button>
            <button onClick={handleNextWeek}>&gt;</button>
          </div>
          <div className="today">
            <button onClick={handleToday}>Today</button>
          </div>
        </div>

        {/* DropDowns für Woche und Jahr */}
        <div className="dropdowns" style={{ display: 'flex', gap: '8px' }}>
          <select value={selectedWeek} onChange={handleWeekChange}>
            {weekOptions.map((week) => (
              <option key={week} value={week}>
                Week {week}
              </option>
            ))}
          </select>
          <select value={selectedYear} onChange={handleYearChange}>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CustomToolbar;
