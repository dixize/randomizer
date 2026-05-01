let currentMode = 'number';

function switchMode(mode) {
    currentMode = mode;
    
    // Обновляем кнопки
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === (mode === 'number' ? 'числа' : 'список')) {
            btn.classList.add('active');
        }
    });

    // Показываем нужную секцию
    document.getElementById('number-section').style.display = mode === 'number' ? 'block' : 'none';
    document.getElementById('list-section').style.display = mode === 'list' ? 'block' : 'none';
    
    // Сброс текста
    document.getElementById('result-value').innerText = '---';
}

function processRandom() {
    const display = document.getElementById('result-value');
    const label = document.getElementById('result-label');
    
    label.innerText = "ВЫЧИСЛЕНИЕ...";
    display.classList.remove('pulse');

    // Эффект «бегающих цифр» перед финалом
    let counter = 0;
    const interval = setInterval(() => {
        display.innerText = Math.floor(Math.random() * 999);
        counter++;
        if (counter > 10) {
            clearInterval(interval);
            showFinalResult();
        }
    }, 50);
}

function showFinalResult() {
    const display = document.getElementById('result-value');
    const label = document.getElementById('result-label');
    let finalValue;

    if (currentMode === 'number') {
        const min = parseInt(document.getElementById('min-val').value);
        const max = parseInt(document.getElementById('max-val').value);
        
        if (isNaN(min) || isNaN(max) || min >= max) {
            finalValue = "ERROR";
        } else {
            finalValue = Math.floor(Math.random() * (max - min + 1)) + min;
        }
    } else {
        const text = document.getElementById('list-items').value;
        // Разделяем по запятой или новой строке, убираем лишние пробелы
        const items = text.split(/[,\n]/).map(item => item.trim()).filter(item => item !== "");
        
        if (items.length === 0) {
            finalValue = "EMPTY";
        } else {
            const randomIndex = Math.floor(Math.random() * items.length);
            finalValue = items[randomIndex];
        }
    }

    label.innerText = "РЕЗУЛЬТАТ ПОЛУЧЕН";
    display.innerText = finalValue;
    display.classList.add('pulse');
}
