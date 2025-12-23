const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// 1️⃣ Оголошуємо об’єкт formData
let formData = {
  email: '',
  message: '',
};

// 2️⃣ Завантажуємо дані з локального сховища при старті
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
  } catch (error) {
    console.error('Error parsing saved data:', error);
  }
}

// 3️⃣ Делегування події input
form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (!['email', 'message'].includes(name)) return;

  // Оновлюємо об’єкт formData і записуємо у localStorage
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 4️⃣ Обробка submit
form.addEventListener('submit', event => {
  event.preventDefault();

  // Перевірка, що обидва поля заповнені
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  // Виводимо у консоль
  console.log(formData);

  // Очищаємо форму і сховище
  form.reset();
  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
});
