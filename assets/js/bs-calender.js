let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calender = document.getElementById('bs-cal-days');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const monthToDisplay = document.getElementById('bs-cal-header-month');
const nextMonthBtn = document.getElementById('bs-cal-header-button-next');
const previousMonthBtn = document.getElementById('bs-cal-header-button-previous');

function load(){
    const dt = new Date();
    if(nav !== 0){
        dt.setMonth(new Date().getMonth() + nav);
    }
    const date = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayInMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayInMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    monthToDisplay.innerText = `${dt.toLocaleDateString('en-us', {
        month: 'long'
    })} ${year}`;


    calender.innerHTML = '';

    for(let i = 1; i <= paddingDays + daysInMonth; i++){
        const dayBox = document.createElement('div');
        dayBox.classList.add('day-box');
        if(i > paddingDays){
            dayBox.innerText = i - paddingDays;
            if(date === (i - paddingDays)){
                dayBox.classList.add('today');
            }
            dayBox.addEventListener("click", ()=>{
                console.log("click");
            });
        }
        else{
            dayBox.classList.add('empty-box');
        }
        calender.appendChild(dayBox);
    }

}

function initButtons(){
    nextMonthBtn.addEventListener('click', ()=>{
        nav++;
        load();
    });
    previousMonthBtn.addEventListener('click', ()=>{
        nav--;
        load();
    });
}

initButtons();
load();