import moment from "moment";
import Calendar from "./calendar";
import { planningData, countryHolidays } from "./data";

import './styles.scss';



// Moment configuration
moment().locale('es');
moment.defaultFormat = "DD/MM/YYYY";

window.moment = moment;

// Fecha nacimiento por defecto
let bornDate = moment('16/03/2023', moment.defaultFormat);

// Referenciar inputs
const bornDateInput = document.querySelectorAll('#borndate input')[0];
const bornDateButton = document.querySelectorAll('#borndate button')[0];

// Validar y establecer fecha de nacimiento
const setBornDate = (date = bornDate.format()) => {
    let pDate = moment(date, moment.defaultFormat);
    if (pDate.isValid()) bornDate = pDate;
    bornDateInput.value = bornDate.format();
}

let planningDates = null;

const composeDatesFromPlanning = (pBornDate, pPlanningData, pCountryHolidays) => {
    let timer = pBornDate; // Moment object
    const planningDates = [];
    let order = 1;
    pPlanningData.sort((a,b) => a.id - b.id); // Ordenar por ID
    
    // Recorrer planning
    pPlanningData.forEach(item => {
        const time_units = parseInt(item.time.split(' ')[0]);
        const time_period = '' + item.time.split(' ')[1];

        while([6,7].includes(timer.isoWeekday()) && order !== 1) {
            timer.add(1, 'day');
        }
        
        if ((time_period != 'day') && (time_period != 'days')) {
            const endDate = moment(timer).add(time_units, time_period);
            do {
                planningDates.push({
                    order: order,
                    date: timer.format(),
                    title: item.title,
                    subject: item.subject,
                    color: item.color,
                });
                timer.add(1, 'day');
                order++;
            } while (timer.isBefore(endDate));
            
        } else {
            let counter = 0;
            do {
                // si el día no es festivo ni fin de semana
                if (
                    (!pCountryHolidays.find(item => item.date == timer.format())) &&
                    (timer.isoWeekday() < 6)
                    ) {
                    counter ++;
                    planningDates.push({
                    order: order,
                    date: timer.format(),
                    title: item.title,
                    subject: item.subject,
                    color: item.color,
                });
                }
                timer.add(1, 'day');
                order++;
            }
            while (counter < time_units);
        }
    });
    return planningDates;
}

document.addEventListener('DOMContentLoaded', () => {
    
    bornDateButton.addEventListener('click', (e) => {
        e.preventDefault();
        setBornDate(bornDateInput.value);
        planningDates = composeDatesFromPlanning(bornDate, planningData, countryHolidays);
        renderPlanningDates(planningDates);
        renderCalendar(planningDates);
    });

    // Initial
    setBornDate(bornDateInput.value);
    planningDates = composeDatesFromPlanning(bornDate, planningData, countryHolidays);
    renderPlanningDates(planningDates);
    renderCalendar(planningDates);
    
});

const renderPlanningDates = (pPlanningDates) => {
    const planningResume = document.getElementById('planning-resume');
    planningResume.innerHTML = ''; // Clear list
    const planningList = document.createElement('ul');
    let color, title, dateFrom, dateTo, lastDate;
    pPlanningDates.forEach((item, index) => {
        if (index == 0) {
            color = item.color;
            title = item.title;
            dateFrom = moment(item.date, moment.defaultFormat).format('D [de] MMMM');
            lastDate = dateFrom;
        } else if ((color !== item.color)  && (title !== item.title) || (index == pPlanningDates.length - 1)) {
            const planningListItem = document.createElement('li');
            const dateTo = moment(lastDate, moment.defaultFormat).format('D [de] MMMM');
            planningListItem.innerHTML = 'Del ' + dateFrom + ' al ' + dateTo + '<br> <strong>' + title + '</strong>';
            planningListItem.style.backgroundColor = color;
            planningList.appendChild(planningListItem);

            color = item.color;
            title = item.title;
            dateFrom = moment(item.date, moment.defaultFormat).format('D [de] MMMM');
        }
        lastDate = item.date;
    });
    planningResume.append(planningList);
}

const renderCalendar = (pPlanningDates = {}) => {
    const options = {    
        weekDayStart: 1,
        data: {
            plan: pPlanningDates,
            holidays: countryHolidays,
        }
    }
    const calWrapper = document.getElementsByClassName('calendar-view')[0];
    calWrapper.innerHTML = '';
    // Get first, last date and set currentDate operator
    const firstDate = moment(pPlanningDates[0].date,'DD/MM/YYYY');
    const lastDate = moment(pPlanningDates[pPlanningDates.length - 1].date,'DD/MM/YYYY');
    const currentDate = firstDate.startOf('month');
    
    // Calculate months to show
    const monthsToRender = Math.ceil(lastDate.diff(firstDate, 'months',true));

    // Render each month
    for(let i=0; i<monthsToRender; i++) {
        
        const calendarMonth = document.createElement('div');
        calendarMonth.classList.add('calendar-month');
        calWrapper.appendChild(calendarMonth);
        
        const c = new Calendar(currentDate.format(),calendarMonth, options);
        c.render();

        currentDate.add(1,'month');
    }
}
