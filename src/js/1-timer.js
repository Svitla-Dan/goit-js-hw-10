import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  picker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

elements.startBtn.disabled = true;

let userSelectedDate;

flatpickr(elements.picker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] > currentDate) {
      userSelectedDate = selectedDates[0];
      elements.startBtn.disabled = false;
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      elements.startBtn.disabled = true;
    }
  },
});

elements.startBtn.addEventListener('click', startTimer);

function startTimer() {
  elements.picker.disabled = true;
  elements.startBtn.disabled = true;
  const timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const timeRemaining = userSelectedDate - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      iziToast.success({
        title: 'Timer Complete',
        message: 'The countdown has finished!',
        position: 'topRight',
      });
      elements.picker.disabled = false;
      elements.startBtn.disabled = false;
      updateInterface(0);
      return;
    }
    updateInterface(timeRemaining);
  }, 1000);
}

function updateInterface(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  elements.dataDays.textContent = addLeadingZero(days);
  elements.dataHours.textContent = addLeadingZero(hours);
  elements.dataMinutes.textContent = addLeadingZero(minutes);
  elements.dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
