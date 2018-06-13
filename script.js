//let countdown;
let timeInterval;
const endDate = document.querySelector('input[name="endDate"]');
const clock = document.querySelector('#clock');
const daysSpan = clock.querySelector('.days');
const hoursSpan = clock.querySelector('.hours');
const minutesSpan = clock.querySelector('.minutes');
const secondsSpan = clock.querySelector('.seconds');
//const savedTime = window.localStorage.getItem(countdown) || false;



//if(savedTime){
//    startClock(savedTime);
//    let dated = new Date(savedTime);
//    endDate.valueAsDate = dated;
//}

//FIXME localStorage.setItem doesn't work


endDate.addEventListener('change', function (e) {
    e.preventDefault();
    clearInterval(timeInterval);
//    console.dir(this);
    const endDateTemp = new Date(this.value); //TODO change end time depeding on time zone
//    window.localStorage.setItem('countdown', endDateTemp);
//    console.log(window.localStorage.getItem(countdown));
    startClock(endDateTemp);
});

function startClock(endTime) {
    let correctDate;

    function updateCounter() {
        let t = timeRemaining(endTime);
        if (t.total <= 0) {
            correctDate = false;
            //TODO change date input field to red, then change it back to blue
            alert("Choose future date, please :)")
            clearInterval(timeInterval);
            daysSpan.innerHTML = "-";
            hoursSpan.innerHTML = "-";
            minutesSpan.innerHTML = "-";
            secondsSpan.innerHTML = "-";
        } else {
            correctDate = true;
            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        }

    }
    updateCounter();
    if (correctDate)
        timeInterval = setInterval(updateCounter, 1000);
}

function timeRemaining(endTime) {
    let t = Date.parse(endTime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor(t / (1000 * 60 * 60) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

//console.log(endDate);
