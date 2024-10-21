// ==UserScript==
// @name         FKU Utility
// @version      0.0.1
// @description  FKU Utility
// @match        https://lki.tax.nalog.ru/*
// @exclude      https://lki.tax.nalog.ru/tech/settings.php
// @grant        unsafeWindow
// ==/UserScript==
(function() {
    'use strict';

    const filterSetting = {
        ekp: '27000',// ==UserScript==
// @name         FKU Utility
// @version      0.0.1
// @description  FKU Utility
// @match        https://lki.tax.nalog.ru/*
// @exclude      https://lki.tax.nalog.ru/tech/settings.php
// @grant        unsafeWindow
// ==/UserScript==
(function() {
    'use strict';

    const filterSetting = {
        ekp: '27000',
        user: 'Аверин Алексей Александрович',
        colls: [
            { name: '#', visible: true, width: '15' },
            { name: 'Код ЭКП', visible: true, width: '25' },
            { name: 'Номер ТУ', visible: true, width: '75' },
            { name: 'Номер БУ', visible: true, width: '75' },
            { name: 'Дата создания', visible: true, width: '50' },
            { name: 'Дата принятия', visible: true, width: '50' },
            { name: 'Дата закрытия', visible: true, width: '50' },
            { name: 'Крайний срок завершения', visible: true, width: '50' },
            { name: 'Услуга', visible: true, width: '90' },
            { name: 'Описание', visible: true, width: '90' },
            { name: 'Этап', visible: true, width: '40' },
            { name: 'СОНО', visible: true, width: '20' },
            { name: 'Исполнитель', visible: true, width: '70' },
            { name: 'Заявитель', visible: true, width: '70' },
            { name: 'Телефон заявителя', visible: false, width: '50' },
            { name: 'Приоритет', visible: true, width: '20' },
            { name: 'Доп.статус', visible: true, width: '20' },
        ],
        ekpColor: '#dcedc8',
        ekpAnotherColor: '#fff3e0',
        userColor: '#dcedc8',
        userAnotherColor: '#fff3e0',
        priorityLowColor: '#b2ebf2',
        priorityMediumColor: '#a5d6a7',
        priorityHighColor: '#ef9a9a',
        timeEndWarning: '#ffcdd2',
        timeEndTomorrowWarning: '#ffe0b2'
    }

    const serviceTextData = [
        {name:'Профилактические работы. Устранение технических сбоев в работе программных комплексов ФНС России',value:'Проведён мониторинг размещения на ФАП новых версий администрируемого ПО.'},
        {name:'Профилактические работы. 1. Визуальный контроль: серверного оборудования, ТКУ, УАТС, активного сетевого оборудования (ТУ)', value:'Проведен визуальный контроль работоспособности серверного оборудования. Серверы включены, работают, светодиодные индикаторы сообщают о работе серверов без ошибок.Визуальный контроль работоспособности УАТС проведен. УАТС работает, замечаний нет.Проведен визуальный контроль работоспособности активного сетевого оборудования. Оборудование работает в штатном режиме. Ошибок не обнаружено. Климатические параметры в норме.'},
        {name:'Профилактические работы. 4. Телекоммуникации. Мониторинг услуг связи. Доступность внешней сети. (ТУ)',value:'Проведены профилактические работы по мониторингу услуг связи и телекоммуникационного оборудования. Проведен мониторинг системы СКУТ. Проверены параметры подключения объекта согласно инструкции. Проблем не выявлено.'},
        {name:'Профилактические работы. 5. Обеспечение работоспособности СУБД (ТУ)',value:'Мониторинг работы MSSQL проведен. Log файлы проанализированы. Критических ошибок нет. СУБД работают нормально. Свободное место есть.'},
        {name:'Профилактические работы. 7. Обеспечение работоспособности САЗ. (ТУ)',value:'Проведены профилактические работы по обеспечению работоспособности САЗ. Выполнена проверка работоспособности служб САЗ. Антивирусные базы обновлены. Kaspersky не обнаружил уязвимости на рабочих станциях. Вирусной активности не обнаружено. Проведена проверка статусных сообщений в консоли администрирования САЗ.'},
        {name:'Профилактические работы. 8. Обеспечение работоспособности СЭД внешних почтовых ящиков (ТУ)',value:'Проведен анализ журналов Log.nsf. Критических ошибок не выявлено. Мониторинг состояния Mail.box выполнен. Сбоев нет.'},
        {name:'Регламентные работы. 2. Диагностика компонентов рабочих станций. (ТУ)',value:'Проведены работы по диагностике компонентов рабочих станций. Проверены крепления кабелей электропитания. Проведена: очистка от пыли кабелей, вентиляторов, технологических отверстий и внутреннего объема системного блока; проверка индикации исправности системного блока и монитора после включения электропитания; проверка системных журналов ОС на наличие критических ошибок в части аппаратного обеспечения;  проверка оборудования штатными средствами ОС или тестовой программой производителя оборудования на наличие аппаратных ошибок; установка новых версий BIOS (при необходимости); нагрузочное тестирование различных аппаратных частей РС соответствующим ПО (checkdisk (проверка HDD), memtest (ОЗУ), Aida64 (стрессовое тестирование различных компонентов) и т.д.); анализ лог-файлов и журналов событий на наличие ошибок и их устранение при необходимости; анализ и при необходимости редактирование списка автоматически запускаемого ПО для оптимизации работы ОС.'},
        {name:'Регламентные работы. 3. Диагностика компонентов печатающих устройств. (ТУ)',value:'Проведена диагностика компонентов печатающих устройств: проверка наличия системных сообщений о состоянии оборудования; проверка крепления кабелей электропитания; очистка кабеля от пыли; извлечение узла фотобарабана и тонер-картриджа; очистка от пыли и тонера всех деталей устройства; проверка индикации исправности устройства после подключения к питанию; печать тестовой страницы.'},
        {name:'	Регламентные работы. 4. Диагностика компонентов сканирующего оборудования. (ТУ)',value:'Проведена диагностика компонентов сканирующего оборудования:  Проверка наличия системных сообщений о состоянии оборудования. Проверка крепления кабелей электропитания. Очистка кабеля от пыли. Очистка от грязи и пыли компонент (корпус, стекло, сканер лазера и т.д.). Проверка индикации исправности устройства после подключения к питанию. Сканирование тестовой страницы.'},
        {name:'5.7.1 Установка, настройка и обновление операционных систем для серверного оборудования и рабочих станций',value:'Выполнена установка  ОС.'},
        {name:'5.8.1 Установка, настройка и обновление общесистемного программного обеспечения',value:'Выполнена установка и настройка ОПО.'},
        {name:'5.17.1 (1) Установка, настройка, обновление, сопровождение и контроль эксплуатации САЗ',value:'Выполнена установка и настройка САЗ.'},
        {name:'5.19.1 Установка и настройка клиентской части прикладных программных комплексов ФНС России',value:'Выполнена установка и настройка ППК ФНС.'},
        {name:'Ведение ЭПО .Ввод и актуализация информации в информационный ресурс ЭПО (ТУ)',value:'Выполнена актуализация информации в ЭПО.'},
    ]
    const serviceTextData_12 = {
        name:'Профилактические работы. 12. Обеспечение работоспособности ППК СОИФНС. (ТУ)',
        data: [
            'Проведены профилактические работы по обеспечению работоспособности ППК СОИФНС. Проведена проверка журнала ОС на ошибочные действия. Результат проверки не показал ошибок. ',
            'Проведены профилактические работы по обеспечению работоспособности ППК СОИФНС. Проведена проверка журнала ОС на ошибочные действия. Результат проверки не показал ошибок. Проведён анализ корневых и прерванных процессов. Результат анализа не показал ошибок. Процесс (Актуализация БД) работает в штатном режиме. Канал связи работает в штатном режиме. Неотправленная почта отсутствует.'
        ]
    }

    const topScroll = document.querySelector('.topscroll');
    topScroll.parentNode.removeChild(topScroll);

    const currentPageUrl = window.location.href;

    if(currentPageUrl === "https://lki.tax.nalog.ru/tech/" ) {
        for(let i = 0; i < filterSetting.colls.length; i++) {
            if(filterSetting.colls[i].name === 'Дата закрытия') {
                filterSetting.colls.splice(i, 1);
                break;
            }
        }
    } else if(currentPageUrl === "https://lki.tax.nalog.ru/tech/new.php") {
        for(let i = 0; i < filterSetting.colls.length; i++) {
            if(filterSetting.colls[i].name === 'Дата принятия') {
                filterSetting.colls.splice(i, 1);
                break;
            }
        }
        for(let i = 0; i < filterSetting.colls.length; i++) {
            if(filterSetting.colls[i].name === 'Дата закрытия') {
                filterSetting.colls.splice(i, 1);
                break;
            }
        }
    } else if(currentPageUrl === "https://lki.tax.nalog.ru/tech/end.php") {
        for(let i = 0; i < filterSetting.colls.length; i++) {
            if(filterSetting.colls[i].name === 'Этап') {
                filterSetting.colls.splice(i, 1);
                break;
            }
        }
        for(let i = 0; i < filterSetting.colls.length; i++) {
            if(filterSetting.colls[i].name === 'Дата закрытия') {
                filterSetting.colls.splice(i, 1);
                break;
            }
        }
    } else if(currentPageUrl === "https://lki.tax.nalog.ru/tech/expired.php") {}

    var width = '';
    var display = '';
    var style = document.createElement('style');
    style.type = 'text/css';
    var css = '.fku-modal {display: none; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.4);} ';
    css = css + '.fku-modal-content {background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 40%;} '
    css = css + '.fku-modal-close {color: #aaa; float: right; font-size: 28px; font-weight: bold;} .fku-modal-close:hover, .fku-modal-close:focus {color: black; text-decoration: none; cursor: pointer;} ';
    css = css + '.fku-fixed-button {position: fixed; top: 50%; right: 2px; transform: translateY(-50%); padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2)} ';
    css = css + '.fku-fixe-button:hover {background-color: #0056b3;} '
    for(let i = 0; i < filterSetting.colls.length; i++) {
        width = filterSetting.colls[i].width;
        display = '';
        if (!filterSetting.colls[i].visible) display = 'display: none !important;'
        css = css + '.truncate-' + i + ' {overflow: hidden !important; white-space: nowrap !important; text-overflow: ellipsis !important; width: ' + width + 'px !important; min-width: ' + width + 'px !important; max-width: ' + width + 'px !important;'+display+'} '
    }
    style.appendChild(document.createTextNode(css));
    document.body.appendChild(style);

    const moveColumn = function(table, fromIndex, toIndex) {
        for(let i = 0; i < table.rows.length; i++) {
            const row = table.rows[i];
            const temp = row.cells[fromIndex].innerHTML;
            row.cells[fromIndex].innerHTML = row.cells[toIndex].innerHTML;
            row.cells[toIndex].innerHTML = temp;
        }
    }

    const oneDayInMillis = 24 * 60 * 60 * 1000;

    const setFilter = function() {
        scriptRun = true;
        if(!document.querySelector('#checkFilterElement')) {
            const table = document.querySelector('#report-result-table');

            const anotherHeader = document.querySelector('.tableFloatingHeader');
            if(anotherHeader) anotherHeader.parentNode.removeChild(anotherHeader);

            for(let i = 1; i < table.rows.length; i++) {
                for(let j = 0; j < table.rows[i].cells.length; j++) {
                    table.rows[i].cells[j].textContent = table.rows[i].cells[j].textContent.trim();
                }
            }

            const replace = []

            var i = 0;
            var j = 0;

            var cells = table.rows[0].cells;

            for(let i = 0; i < cells.length; i++) {
                for(let j = 0; j < filterSetting.colls.length; j++) {
                    if(cells[i].textContent.includes(filterSetting.colls[j].name)) {
                        replace.push({indexOld: i, indexNew: j});
                        break;
                    } else if (cells[i].innerHTML.indexOf("#") !== -1) {
                        replace.push({indexOld: i, indexNew: j});
                        break;
                    }
                }
            }

            const arrOld = []
            const arrNew = []

            for(let i = 0; i < replace.length; i++) {
                arrOld.push(replace[i].indexOld);
                arrNew.push(replace[i].indexNew);
            }

            var tmp;

            for(let i = 0; i < arrNew.length; i++) {
                if(arrOld[i] != arrNew[i]) {
                    for(let j = 0; j <= arrOld.length; j++) {
                        if(arrNew[i] === arrOld[j]) {
                            moveColumn(table, arrOld[i], arrOld[j]);
                            tmp = arrOld[i];
                            arrOld[i] = arrOld[j];
                            arrOld[j] = tmp;
                        }
                    }
                }
            }

            const elementsHidden = table.querySelectorAll('.hidden');
            const elementsHiddable = table.querySelectorAll('.hiddable');
            const elementsHiddable1 = table.querySelectorAll('.hiddable1');
            const elementsHiddable2 = table.querySelectorAll('.hiddable2');
            const elementsHeadCellTitle = table.querySelectorAll('.reports-head-cell-title');

            for(let i = 0; i < elementsHidden.length; i++) {
                elementsHidden[i].classList.remove('hidden');
            }
            for(let i = 0; i < elementsHiddable.length; i++) {
                elementsHiddable[i].classList.remove('hiddable');
            }
            for(let i = 0; i < elementsHiddable1.length; i++) {
                elementsHiddable1[i].classList.remove('hiddable1');
            }
            for(let i = 0; i < elementsHiddable2.length; i++) {
                elementsHiddable2[i].classList.remove('hiddable2');
            }
            for(let i = 0; i < elementsHeadCellTitle.length; i++) {
                elementsHeadCellTitle[i].classList.remove('reports-head-cell-title');
            }

            for(let i = 0; i < table.rows[0].cells; i++) {
                table.rows[0].cells[i].classList.add('reports-head-cell');
            }

            for(let i = 0; i < table.rows.length; i++) {
                for(let j = 0; j < table.rows[i].cells.length; j++) {
                    table.rows[i].cells[j].classList.add('truncate-' + j);
                }
            }

            var currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            for(let i = 0; i < filterSetting.colls.length; i++){
                if(filterSetting.colls[i].visible) {
                    if(filterSetting.colls[i].name === 'Код ЭКП') {
                        for(let j = 1; j < table.rows.length; j++) {
                            if(i >= table.rows[j].cells.length) break;
                            if(table.rows[j].cells[i].textContent.includes(filterSetting.ekp)){
                                table.rows[j].cells[i].style.backgroundColor = filterSetting.ekpColor;
                            } else {
                                table.rows[j].cells[i].style.backgroundColor = filterSetting.ekpAnotherColor;
                            }
                        }
                    } else if(filterSetting.colls[i].name === 'Исполнитель') {
                        for(let j = 1; j < table.rows.length; j++) {
                            if(i >= table.rows[j].cells.length) break;
                            if(table.rows[j].cells[i].textContent.includes(filterSetting.user)){
                                table.rows[j].cells[i].style.backgroundColor = filterSetting.userColor;
                            } else {
                                table.rows[j].cells[i].style.backgroundColor = filterSetting.userAnotherColor;
                            }
                        }
                    } else if(filterSetting.colls[i].name === 'Доп.статус') {
                        for(let j = 1; j < table.rows.length; j++) {
                            if(i >= table.rows[j].cells.length) break;
                            if(table.rows[j].cells[i].textContent.length > 0) {
                                table.rows[j].cells[i].textContent = '';
                                table.rows[j].cells[i].style.backgroundColor = 'black';
                            }
                        }
                    } else if(filterSetting.colls[i].name === 'Приоритет') {
                        for(let j = 1; j < table.rows.length; j++) {
                            if(i >= table.rows[j].cells.length) break;
                            if(table.rows[j].cells[i].textContent.includes('Низкий')) {
                                table.rows[j].cells[i].textContent = '';
                                table.rows[j].cells[i].style.backgroundColor = filterSetting.priorityLowColor;
                            } else if(table.rows[j].cells[i].textContent.includes('Средний')) {
                                table.rows[j].cells[i].textContent = '';
                                table.rows[j].cells[i].style.backgroundColor = filterSetting.priorityMediumColor;
                            } else if(table.rows[j].cells[i].textContent.includes('Высокий')) {
                                table.rows[j].cells[i].textContent = '';
                                table.rows[j].cells[i].style.backgroundColor = filterSetting.priorityHighColor;
                            }
                        }
                    } else if(filterSetting.colls[i].name === 'Дата создания') {
                        for(let j = 1; j < table.rows.length; j++) {
                            if(i >= table.rows[j].cells.length) break;
                            table.rows[j].cells[i].textContent = table.rows[j].cells[i].textContent.slice(0, -3);

                        }
                    } else if(filterSetting.colls[i].name === 'Дата принятия') {
                        for(let j = 1; j < table.rows.length; j++) {
                            if(i >= table.rows[j].cells.length) break;
                            table.rows[j].cells[i].textContent = table.rows[j].cells[i].textContent.slice(0, -3);
                        }
                    } else if(filterSetting.colls[i].name === 'Дата закрытия') {
                        for(let j = 1; j < table.rows.length; j++) {
                            if(i >= table.rows[j].cells.length) break;
                            table.rows[j].cells[i].textContent = table.rows[j].cells[i].textContent.slice(0, -3);
                        }
                    }
                     else if(filterSetting.colls[i].name === 'Крайний срок завершения') {
                        for(let j = 1; j < table.rows.length; j++) {
                            if(i >= table.rows[j].cells.length) break;
                            table.rows[j].cells[i].textContent = table.rows[j].cells[i].textContent.slice(0, -3);
                            const dateParts = table.rows[j].cells[i].textContent.split(' ');
                            const [day, month, year] = dateParts[0].split('.').map(Number);
                            const [hour, seccond] = dateParts[1].split(':').map(Number);
                            const inputDate = new Date(year, month -1, day);
                            const differenceInMillis = inputDate - currentDate;
                            if(differenceInMillis === 0) {
                                table.rows[j].cells[i].style.backgroundColor = filterSetting.timeEndWarning;
                            }

                            let isOneDayInMillis = oneDayInMillis;

                            if(currentDate.getDay() === 5) {
                                isOneDayInMillis = isOneDayInMillis * 3;
                            }
                            if(differenceInMillis - isOneDayInMillis === 0) {
                                if(hour < 11) {
                                    table.rows[j].cells[i].style.backgroundColor = filterSetting.timeEndWarning;
                                } else {
                                    table.rows[j].cells[i].style.backgroundColor = filterSetting.timeEndTomorrowWarning;
                                }
                            }
                        }
                    }
                }
            }

            const element = document.createElement('div');
            element.id = 'checkFilterElement'
            element.style.display = 'none';
            document.querySelector('#report-result-table').appendChild(element);
        }
        scriptRun = false;
    }

    document.addEventListener('keydown', function(event) {
        if(event.ctrlKey && (event.key === 'b' || event.key === 'и')) {
            const requestWindow = document.querySelector('#requestWindow');
            const tables = requestWindow.querySelectorAll('table');
            const content = tables[0].rows[5].cells[1].textContent
            for(let i = 0; i < serviceTextData.length; i++) {
                if(content === serviceTextData_12.name){
                    if(requestWindow.querySelector('.panel-body').textContent.length < 200) {
                        navigator.clipboard.writeText(serviceTextData_12.data[0]);
                    } else {
                        navigator.clipboard.writeText(serviceTextData_12.data[1]);
                    }
                } else {
                    if(content === serviceTextData[i].name) {
                        navigator.clipboard.writeText(serviceTextData[i].value);
                        break;
                    }
                }
            }
        }
    });

    var scriptRun = false;
    var timerUserActive = 0;
    var timeTimer = 100;
    var timeout;

    const timerFilter = function() {
        timerUserActive = timerUserActive + 1;
        if(timerUserActive < 20){
            timeTimer = 50;
        } else {
            timeTimer = 1500;
        }
        setTimeout(() => {
            //console.time('setFilter');
            if(!scriptRun) setFilter();
            //console.timeEnd('setFilter');
            timerFilter();
        }, timeTimer);
    }

    const resetTimer = function () {
        clearTimeout(timeout);
        timerUserActive = 0;
        timeout = setTimeout(() => {
            location.reload();
        }, 300000);
    }

    document.addEventListener('click', function(event) {
        const clickedElement = document.elementFromPoint(event.clientX, event.clientY);
        if(clickedElement && clickedElement.closest('button')) {
            resetTimer();
        }
    });

    const modal = document.createElement('div');
    modal.id = 'fkuModal'
    modal.classList.add('fku-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('fku-modal-content');

    const modalContentSpan = document.createElement('span');
    modalContentSpan.classList.add('fku-close');

    const modalContentH = document.createElement('h2');
    modalContentH.classList.add('fku-close');
    modalContentH.textContent = 'Введите ФИО';

    const modalContentInputUser = document.createElement('input');
    modalContentInputUser.type = 'text';
    modalContentInputUser.id = 'fkuInputUser';
    modalContentInputUser.placeholder = 'Введите имя исполнителя';

    const modalContentButton = document.createElement('button');
    modalContentButton.id = 'fkuButtonSave';
    modalContentButton.textContent = 'Сохранить';

    modalContent.appendChild(modalContentSpan);
    modalContent.appendChild(modalContentH);
    modalContent.appendChild(modalContentInputUser);
    modalContent.appendChild(modalContentButton);

    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    const buttonOpenModal = document.createElement('button');
    buttonOpenModal.id = 'fkuButtonOpen';
    buttonOpenModal.classList.add('fku-fixed-button');
    buttonOpenModal.textContent = '=>';

    document.body.appendChild(buttonOpenModal);

    const btn = document.getElementById('fkuButtonOpen');
    const span = document.getElementsByClassName('fku-close')[0];
    const saveButton = document.getElementById('fkuButtonSave');
    const inputField = document.getElementById('fkuInputUser');

    btn.onclick = function () {
        modal.style.display = 'block';
    }

    span.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
       if(event.target === modal) {
           modal.style.display = 'none';
       }
    }
    setTimeout(() => {
        timerFilter()
    }, 1000);
})();