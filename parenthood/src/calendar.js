// calendar.js
'use strict';

import moment from "moment";

export default class Calendar {
    static {
        moment.locale('es');
        moment.defaultFormat = 'DD/MM/YYYY';
    }

    constructor(date, wrapper, options = {}) {
        
        this.d = moment(date, moment.defaultFormat);
        this.d.startOf('month');

        // options
        this.weekDayStart = options.weekDayStart || 1;
        this.d.defaultFormat = options.defaultFormat || "DD/MM/YYYY";
        this.d.locale = options.locale || "es";

        this.renderWrapper = wrapper;
    }

    hoy() {
        return this.d().format('LLLL');
    }

    setMonth(month, year) {
        this.d().date(1);
        this.d().month(month);
        this.d().year(year);
    }

    render() {
        let c = this.d.startOf('day');
        const month = c.month();

        // Título del calendario
        const title = c.format('MMMM YYYY');
        const calendarTitle = document.createElement('div');
        calendarTitle.classList.add('month-name');
        calendarTitle.innerHTML = title;
        this.renderWrapper.appendChild(calendarTitle);

        // Días de la semana
        for (let i = 0; i < 7; i++) {
            const dayName = moment.weekdaysMin()[i + this.weekDayStart < 7 ? i + this.weekDayStart : i - 7 + this.weekDayStart];
            const calendarDay = document.createElement('div');
            calendarDay.classList.add('day-name');
            calendarDay.innerHTML = dayName;
            this.renderWrapper.appendChild(calendarDay);
        }

        // Offset Days (días vacíos)
        for (let i = 1; i < c.isoWeekday(); i++) {
            const calendarDay = document.createElement('div');
            this.renderWrapper.appendChild(calendarDay);
            console.log(calendarDay);
        }

        // Días calendario
        while (c.month() == month) {
            const calendarDay = document.createElement('div');
            calendarDay.classList.add('day');
            let innerHTML = '<div class="month-day">' + c.date() + '</div>';

            
            calendarDay.innerHTML = innerHTML;
            this.renderWrapper.appendChild(calendarDay);
            // Marca fecha de hoy
            if (
                c == moment().startOf('day')
            ) {
                calendarDay.classList.add('today');
            }

            // Suma un día
            c = c.add(1,'day');
        }
    }
}
