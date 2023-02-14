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
        this.data = options.data || {};

        this.renderWrapper = wrapper;
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
        for (let i = 0; i < 7; i++) {
            const weekDay = i + this.weekDayStart < 7 ? i + this.weekDayStart : i - 7 + this.weekDayStart;
            if (weekDay === c.isoWeekday()) {
                break;
            }
            const calendarDay = document.createElement('div');
            this.renderWrapper.appendChild(calendarDay);
        }

        // Días calendario
        while (c.month() == month) {
            const calendarDay = document.createElement('div');
            calendarDay.classList.add('day');
            let innerHTML = '<div class="month-day">' + c.date() + '</div>';

            // Marcar evento
            this.data.forEach(item => {
                if(c.isBetween(moment(item.dateFrom,moment.defaultFormat),moment(item.dateTo,moment.defaultFormat),'day','[]')) {
                    calendarDay.style.backgroundColor = item.color;
                }
            });
            
            // Marca fecha de hoy
            if (c.format() === moment().format()) {
                calendarDay.classList.add('today');
            }

            calendarDay.innerHTML = innerHTML;
            this.renderWrapper.appendChild(calendarDay);

            // Suma un día
            c.add(1,'day');
        }
    }
}
