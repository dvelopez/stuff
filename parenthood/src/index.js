import moment from "moment";
import Calendar from "./calendar";

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
const calWrapper = document.getElementsByClassName('calendar-view')[0];
const c = new Calendar('2023-02-01',calWrapper, options);

c.render();

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

// Datos del plan de baja
const planningData = [
    {
        id: 1,
        title: "Semanas obligatorias Diego y Candela",
        subject: ["Candela", "Diego"],
        time: "6 weeks",
        color: '#fa0',
    },
    
    {
        id: 2,
        title: "Permiso maternidad Candela",
        subject: ["Candela"],
        time: "10 weeks",
        color: '#dc0',
    },
    
    {
        id: 3,
        title: "Periodo lactancia Candela",
        subject: ["Candela"],
        time: "2 weeks",
        color: '#3d2',
    },
    
    {
        id: 4,
        title: "Periodo paternidad Diego",
        subject: ["Diego"],
        time: "10 weeks",
        color: '#11b',
    },
    
    {
        id: 5,
        title: "Permiso lactancia Diego",
        subject: ["Diego"],
        time: "2 weeks",
        color: '#27f',
    },
    
    {
        id: 6,
        title: "Periodo vacaciones Candela",
        subject: ["Candela"],
        time: "2 weeks",
        color: '#03f',
    },

    {
        id: 7,
        title: "Periodo vacaciones Diego",
        subject: ["Diego"],
        time: "2 weeks",
        color: '#03f',
    },

    {
        id: 8,
        title: "Periodo vacaciones Candela",
        subject: ["Candela"],
        time: "2 weeks",
        color: '#03f',
    },

    {
        id: 9,
        title: "Periodo vacaciones Diego",
        subject: ["Diego"],
        time: "2 weeks",
        color: '#03f',
    },
];

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

const renderMonth = (year, month) => {

    calDate = moment().year(year).month(month).date(1);

    // Reset calendario
    calendar.innerHTML = "";
    
    // Nombre del mes y año
    monthName.innerText = monthNames[calDate.getMonth()] + ' ' + calDate.getFullYear();

    // Días de la semana
    for (i=0; i<7; i++) {
        const dayName = weekDayNames[i + weekDayStart < 7 ? i + weekDayStart : i - 7 + weekDayStart];
        const calendarDay = document.createElement('div');
        calendarDay.classList.add('day-name');
        calendarDay.innerHTML = dayName;
        calendar.appendChild(calendarDay);
    }

    // Offset Days (días vacíos)
    for (i=0; i<7; i++) {
        const weekDay = i + weekDayStart < 7 ? i + weekDayStart : i - 7 + weekDayStart;
        if (weekDay == calDate.getDay()) {
            break;
        }
        const calendarDay = document.createElement('div');
        calendar.appendChild(calendarDay);
    }

    // Días calendario
    while (calDate.getMonth() == month) {
        const calendarDay = document.createElement('div');
        calendarDay.classList.add('day');
        let innerHTML = '<div class="month-day">' + calDate.getDate() + '</div>';
        
        // Semana y dia de embarazo
        const pregnancyWeek = Math.floor((calDate - pregnancyStart) / 24 / 60 / 60 / 7 / 1000);
        const pregnancyRestDay = Math.floor((((calDate - pregnancyStart) / 24 / 60 / 60 / 7 / 1000) % 1) * 7);
        if (pregnancyWeek > -1 && pregnancyWeek <= 42) {
            innerHTML += '<div class="pregnant-week">';
            innerHTML += '<strong>' + pregnancyWeek + '</strong>';
            if (pregnancyRestDay > 0) {
                innerHTML += '+' + pregnancyRestDay;
            }
            innerHTML += '</div>';
        }
        calendarDay.innerHTML = innerHTML;            
        calendar.appendChild(calendarDay);        
        // Marca fecha de hoy
        if (
            calDate.getDate() === today.getDate() && 
            calDate.getMonth() === today.getMonth() && 
            calDate.getFullYear() === today.getFullYear()
        ) {
            calendarDay.classList.add('today');
        }
        
        // Marcar fecha de cumplir embarazo (40 sem)
        if (pregnancyWeek == 40 && pregnancyRestDay == 0) {
            calendarDay.classList.add('fulfill');
        }

        // Suma un día
        calDate.setDate(calDate.getDate() + 1);
    }
}