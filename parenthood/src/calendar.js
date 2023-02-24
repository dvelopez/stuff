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
            const weekDay = this.weekDayStart < 7 ? i + this.weekDayStart : i - 7 + this.weekDayStart;
            
            if (weekDay === c.isoWeekday()) {
                break;
            }
            const calendarDay = document.createElement('div');
            this.renderWrapper.appendChild(calendarDay);
        }

        // Días calendario
        while (c.month() == month) {
            let title = '';
            const calendarDay = document.createElement('div');
            calendarDay.classList.add('day');
            let innerHTML = '<div class="month-day">' + c.date() + '</div>';

            // Marcar findes
            if([6,7].includes(c.isoWeekday())) {
                calendarDay.classList.add('weekend');
            }

            // Marcar festivos
            if(this.data.holidays) {
                this.data.holidays.forEach(item => {
                    if(c.format() === item.date) {
                        calendarDay.classList.add('holiday');
                        title += item.description;
                    }
                });
            }

            // Marcar evento
            if(this.data.plan) {
                this.data.plan.forEach(item => {
                    if(c.format() == moment(item.date, moment.defaultFormat).format()) {
                    //if(c.isBetween(moment(item.dateFrom,moment.defaultFormat),moment(item.dateTo,moment.defaultFormat),'day','[]')) {
                        calendarDay.style.backgroundColor = item.color;
                        title += title.length ? ' - ' + item.title : item.title;
                    }
                });
            }
            
            // Marca fecha de hoy
            if (c.format() === moment().format()) {
                calendarDay.classList.add('today');
            }

            // Set title
            if (title.length) {
                calendarDay.setAttribute('title',title);
            }

            calendarDay.innerHTML = innerHTML;
            this.renderWrapper.appendChild(calendarDay);

            // Suma un día
            c.add(1,'day');
        }
    }
}
