import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(message => {
      iziToast.show({
        title: '✅',
        message: message,
        position: 'topRight',
        backgroundColor: 'rgba(89, 161, 13, 0.3)',
      });
    })
    .catch(message => {
      iziToast.show({
        title: '❌',
        message: message,
        position: 'topRight',
        backgroundColor: 'rgba(239, 64, 64, 0.3)',
      });
    });
  form.reset();
}
