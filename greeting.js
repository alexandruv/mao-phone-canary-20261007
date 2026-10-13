const today = new Date();
const date = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0'),
].join('-');

const dateElement = document.getElementById('today');
dateElement.textContent = date;
dateElement.dateTime = date;
