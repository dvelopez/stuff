import moment from "moment";

import './styles.scss';

moment().locale('es');

const birthDateInput = document.querySelectorAll('#birthdate input')[0];
const birthDateButton = document.querySelectorAll('#birthdate button')[0];

document.addEventListener('DOMContentLoaded', () => {
    // console.log(moment().format('DD/MM/YYYY HH:mm:ss'));
    
    birthDateButton.addEventListener('click', (e) => {
        e.preventDefault();
        setBirthDate();
    });
});

const setBirthDate = () => {
    console.log(birthDateInput);
}
