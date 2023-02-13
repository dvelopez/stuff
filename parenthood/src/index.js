import moment from "moment";
import Calendar from "./calendar";
import { planningData } from "./planningData";

import './styles.scss';



// Moment configuration
moment().locale('es');
moment.defaultFormat = "DD/MM/YYYY";

window.moment = moment;
let options = {
    locale: 'en',
    weekDayStart: 1,
    defaultFormat: "MM/YYYY"
}

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

const composeDatesFromPlanning = (pBornDate, pPlanningData) => {
    let timer = pBornDate; // Moment object
    const planningDates = [];
    let order = 1;
    pPlanningData.sort((a,b) => a.id - b.id); // Ordenar por ID
    
    // Recorrer planning
    pPlanningData.forEach(item => {
        const startTime = timer.format();
        const time_units = parseInt(item.time.split(' ')[0]);
        const time_period = '' + item.time.split(' ')[1];
        timer.add(time_units, time_period);
        const endTime = timer.format();
        planningDates.push({
            order: order,
            dateFrom: startTime,
            dateTo: endTime,
            title: item.title,
            subject: item.subject,
            color: item.color,
        });

        timer.add(1, 'day');
        order++;
    });
    return planningDates;
}

document.addEventListener('DOMContentLoaded', () => {
    
    bornDateButton.addEventListener('click', (e) => {
        e.preventDefault();
        setBornDate(bornDateInput.value);
        planningDates = composeDatesFromPlanning(bornDate, planningData);
        renderPlanningDates(planningDates);
        renderCalendar(planningDates);
    });
    
});

const renderPlanningDates = (pPlanningDates) => {
    const planningResume = document.getElementById('planning-resume');
    planningResume.innerHTML = ''; // Clear list
    const planningList = document.createElement('ul');
    pPlanningDates.forEach((item) => {
        const planningListItem = document.createElement('li');
        planningListItem.innerHTML = 'Del ' + item.dateFrom + ' al ' + item.dateTo + '<br> <strong>' + item.title + '</strong>';
        planningList.appendChild(planningListItem);
    });
    planningResume.append(planningList);
}

const renderCalendar = (pPlanningDates = {}) => {
    const calWrapper = document.getElementsByClassName('calendar-view')[0];
    calWrapper.innerHTML = '';
    // Get first, last date and set currentDate operator
    const firstDate = moment(pPlanningDates[0].dateFrom,'DD/MM/YYYY');
    const lastDate = moment(pPlanningDates[pPlanningDates.length - 1].dateTo,'DD/MM/YYYY');
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