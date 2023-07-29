"use strict";

document.querySelector('.root-nav').onclick = function (event) {
    console.log(event.target.nextElementSibling);
    if (event.target.nodeName !== 'SPAN') return;
    closeAllSubMenu(event.target.nextElementSibling);
    event.target.nextElementSibling.classList.toggle('sub-menu-active');
}

function closeAllSubMenu(current = null) {
    const parents = [];
    if (current) {
        let currentParent = current.parentNode;

        while (currentParent) {
            if (currentParent.classList.contains('root-nav')) break;
            if (currentParent.nodeName === 'UL') parents.push(currentParent);
            currentParent = currentParent.parentNode;
        }
    }

    const subMenu = document.querySelectorAll('.root-nav ul');
    Array.from(subMenu).forEach(item => {
        if (item !== current && !parents.includes(item)) {
            item.style.display = "none";
            item.classList.remove('sub-menu-active');
        } else {
            item.style.display = "block";
        }
    });
}

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener("click", showOrderForm);
});

function showOrderForm(event) {
    const orderForm = document.createElement('form');
    orderForm.innerHTML = `
        <label>ПІБ покупця:</label>
        <input type="text" name="name" required><br><br>

        <label>Місто:</label>
        <select name="city" required>
            <option value="">Виберіть місто</option>
            <option value="Одеса">Одеса</option>
            <option value="Дніпро">Дніпро</option>
            <option value="Київ">Київ</option>
            <option value="Миколаїв">Миколаїв</option>
            <option value="Херсон">Херсон</option>
            <option value="Севастополь">Севастополь</option>
        </select><br><br>

        <label>Склад Нової пошти для надсилання:</label>
        <input type="text" name="postOffice" required><br><br>

        <label>Спосіб оплати:</label>
        <input type="radio" name="payment" value="Післяплата" required> Післяплата
        <input type="radio" name="payment" value="Оплата банківською карткою" required> Оплата банківською карткою<br><br>

        <label>Кількість продукції, що купується:</label>
        <input type="number" name="quantity" required><br><br>

        <label>Коментар до замовлення:</label>
        <textarea name="comment"></textarea><br><br>

        <button>Підтвердити замовлення</button>
    `;

    orderForm.addEventListener("submit", submitOrder);

    const orderPopup = document.createElement('div');
    orderPopup.classList.add('order-popup');
    orderPopup.appendChild(orderForm);

    document.body.appendChild(orderPopup);
}

function closeAll() {
    const subMenus = document.querySelectorAll('.root-nav ul');
    subMenus.forEach(subMenu => {
        subMenu.style.display = "none";
        subMenu.classList.remove('sub-menu-active');
    });

    const orderPopups = document.querySelectorAll('.order-popup');
    orderPopups.forEach(popup => {
        popup.remove();
    });
}

function submitOrder(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.elements.name.value;
    const city = form.elements.city.value;
    const postOffice = form.elements.postOffice.value;
    const payment = form.elements.payment.value;
    const quantity = form.elements.quantity.value;
    const comment = form.elements.comment.value;

    if (name && city && postOffice && payment && quantity) {
        const orderInfo = document.createElement('div');
        orderInfo.classList.add('information');

        orderInfo.innerHTML = `
        <p class="order-info">ІНФОРМАЦІЯ ПРО ЗАМОВЛЕННЯ:</p>
        <p class="order-info">ПІБ покупця: ${name}</p>
        <p class="order-info">Місто: ${city}</p>
        <p class="order-info">Склад Нової пошти для надсилання: ${postOffice}</p>
        <p class="order-info">Спосіб оплати: ${payment}</p>
        <p class="order-info">Кількість продукції: ${quantity}</p>
        <p class="order-info">Коментар: ${comment}</p>
        <button id="okButton">ОК</button>
      `;

        document.body.appendChild(orderInfo);

        const okButton = orderInfo.querySelector('#okButton');
        okButton.addEventListener('click', () => {
            document.body.removeChild(orderInfo);
            closeAll();
        });

        const orderPopup = document.querySelector('.order-popup');
        orderPopup.remove();
    }
}

const myOrdersButton = document.getElementById("my-orders-button");

