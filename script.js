// ==UserScript==
// @name         FKU Utility
// @version      0.0.1
// @description  FKU Utility
// @match        https://lki.tax.nalog.ru/*
// @exclude      https://lki.tax.nalog.ru/tech/settings.php
// @grant        unsafeWindow
// ==/UserScript==
(function () {
  'use strict';

  const filterSetting = {
    ekp: '27000',
    user: 'Аверин Алексей Александрович',
    colls: [
      { name: '#', visible: true, width: '15' },
      { name: 'Код ЭКП', visible: true, width: '25' },
      { name: 'Номер ТУ', visible: true, width: '75' },
      { name: 'Номер БУ', visible: true, width: '75' },
      { name: 'Дата создания', visible: true, width: '45' },
      { name: 'Дата принятия', visible: true, width: '45' },
      { name: 'Дата закрытия', visible: true, width: '45' },
      { name: 'Крайний срок завершения', visible: true, width: '45' },
      { name: 'Услуга', visible: true, width: '75' },
      { name: 'Описание', visible: true, width: '110' },
      { name: 'Этап', visible: true, width: '30' },
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
    delayedColor: '#ef5350',
    priorityLowColor: '#b2ebf2',
    priorityMediumColor: '#a5d6a7',
    priorityHighColor: '#ef9a9a',
    timeEndWarning: '#ffcdd2',
    timeEndTomorrowWarning: '#ffe0b2',
    mpSize: '3px',
    borderColor: '#78909c',
    vksTest: 'true',
    profFKU: 'true',
    profFNS: 'true',
  };

  const serviceTextData = [
    {
      name: 'Профилактические работы. Устранение технических сбоев в работе программных комплексов ФНС России',
      value:
        'Проведён мониторинг размещения на ФАП новых версий администрируемого ПО.',
    },
    {
      name: 'Профилактические работы. 1. Визуальный контроль: серверного оборудования, ТКУ, УАТС, активного сетевого оборудования (ТУ)',
      value:
        'Проведен визуальный контроль работоспособности серверного оборудования. Серверы включены, работают, светодиодные индикаторы сообщают о работе серверов без ошибок.Визуальный контроль работоспособности УАТС проведен. УАТС работает, замечаний нет.Проведен визуальный контроль работоспособности активного сетевого оборудования. Оборудование работает в штатном режиме. Ошибок не обнаружено. Климатические параметры в норме.',
    },
    {
      name: 'Профилактические работы. 2. Серверное оборудование и СХД. Контроль доступности. Диагностика компонентов. (ТУ)',
      value:
        'Проведен мониторинг работоспособности серверов (в том числе виртуальных) в режиме реального времени с помощью средств мониторинга по протоколу SNMP на предмет ошибочных событий, а также предупреждений, влияющих на работоспособность и производительность данного сервера. Ошибок не обанружено. Мониторинг посредством ПО для контроля состояния (HDD, RAM,CPU) выполнен. Оборудование работает исправно. Контроль доступности СХД выполнен. Оборудование функционирует. Доступ существует. IP-адреса выдаются корректно. Пулы адресов серверного и периферийного оборудования доступны.',
    },
    {
      name: 'Профилактические работы. 4. Телекоммуникации. Мониторинг услуг связи. Доступность внешней сети. (ТУ)',
      value:
        'Проведены профилактические работы по мониторингу услуг связи и телекоммуникационного оборудования. Проведен мониторинг системы СКУТ. Проверены параметры подключения объекта согласно инструкции. Проблем не выявлено.',
    },
    {
      name: 'Профилактические работы. 5. Обеспечение работоспособности СУБД (ТУ)',
      value:
        'Мониторинг работы MSSQL проведен. Log файлы проанализированы. Критических ошибок нет. СУБД работают нормально. Свободное место есть.',
    },
    {
      name: 'Профилактические работы. 7. Обеспечение работоспособности САЗ. (ТУ)',
      value:
        'Проведены профилактические работы по обеспечению работоспособности САЗ. Выполнена проверка работоспособности служб САЗ. Антивирусные базы обновлены. Kaspersky не обнаружил уязвимости на рабочих станциях. Вирусной активности не обнаружено. Проведена проверка статусных сообщений в консоли администрирования САЗ.',
    },
    {
      name: 'Профилактические работы. 8. Обеспечение работоспособности СЭД внешних почтовых ящиков (ТУ)',
      value:
        'Проведен анализ журналов Log.nsf. Критических ошибок не выявлено. Мониторинг состояния Mail.box выполнен. Сбоев нет.',
    },
    {
      name: 'Профилактические работы. 9. Электронная почта. Обеспечение репликации Lotus Domino. (ТУ)',
      value:
        'Проведён мониторинг результатов репликации системообразующих файлов.',
    },
    {
      name: 'Профилактические работы. 10. Электронная почта. Обеспечение работоспособности Lotus Domino. (ТУ)',
      value:
        'Мониторинг истечения сроков сертификатов пользователей, мониторинг превышения квот почтовых ящиков выполнен. Сертификаты актуальны, квоты не превышены.',
    },
    {
      name: 'Профилактические работы. 14. Обеспечение работоспособности САЗ. (ТУ)',
      value:
        'Задачи САЗ отрабатываются своевременно. Проведён мониторинг статусных сообщений в консоли администрирования САЗ. Службы САЗ работают в штатном режиме. Критические ошибки ОС отсуствуют.',
    },
    {
      name: 'Регламентные работы. 1. Диагностика компонентов серверного оборудования и СХД. (ТУ)',
      value:
        'Выполнена очистка от пыли и проверка работоспособности систем охлаждения. Логические ошибки серверов отсутствуют. Выполнена проверка состояния оборудования. Оборудование работает в штатном режиме. Нет необходимости установки новых версий ПО. Нет необходимости установки критических обновлений.',
    },
    {
      name: 'Регламентные работы. 2. Диагностика компонентов рабочих станций. (ТУ)',
      value:
        'Проведены работы по диагностике компонентов рабочих станций. Проверены крепления кабелей электропитания. Проведена: очистка от пыли кабелей, вентиляторов, технологических отверстий и внутреннего объема системного блока; проверка индикации исправности системного блока и монитора после включения электропитания; проверка системных журналов ОС на наличие критических ошибок в части аппаратного обеспечения;  проверка оборудования штатными средствами ОС или тестовой программой производителя оборудования на наличие аппаратных ошибок; установка новых версий BIOS (при необходимости); нагрузочное тестирование различных аппаратных частей РС соответствующим ПО (checkdisk (проверка HDD), memtest (ОЗУ), Aida64 (стрессовое тестирование различных компонентов) и т.д.); анализ лог-файлов и журналов событий на наличие ошибок и их устранение при необходимости; анализ и при необходимости редактирование списка автоматически запускаемого ПО для оптимизации работы ОС.',
    },
    {
      name: 'Регламентные работы. 3. Диагностика компонентов печатающих устройств. (ТУ)',
      value:
        'Проведена диагностика компонентов печатающих устройств: проверка наличия системных сообщений о состоянии оборудования; проверка крепления кабелей электропитания; очистка кабеля от пыли; извлечение узла фотобарабана и тонер-картриджа; очистка от пыли и тонера всех деталей устройства; проверка индикации исправности устройства после подключения к питанию; печать тестовой страницы.',
    },
    {
      name: 'Регламентные работы. 4. Диагностика компонентов сканирующего оборудования. (ТУ)',
      value:
        'Проведена диагностика компонентов сканирующего оборудования:  Проверка наличия системных сообщений о состоянии оборудования. Проверка крепления кабелей электропитания. Очистка кабеля от пыли. Очистка от грязи и пыли компонент (корпус, стекло, сканер лазера и т.д.). Проверка индикации исправности устройства после подключения к питанию. Сканирование тестовой страницы.',
    },
    {
      name: '5.7.1 Установка, настройка и обновление операционных систем для серверного оборудования и рабочих станций',
      value: 'Выполнена установка  ОС.',
    },
    {
      name: '5.8.1 Установка, настройка и обновление общесистемного программного обеспечения',
      value: 'Выполнена установка и настройка ОПО.',
    },
    {
      name: '5.17.1 (1) Установка, настройка, обновление, сопровождение и контроль эксплуатации САЗ',
      value: 'Выполнена установка и настройка САЗ.',
    },
    {
      name: '5.19.1 Установка и настройка клиентской части прикладных программных комплексов ФНС России',
      value: 'Выполнена установка и настройка ППК ФНС.',
    },
    {
      name: 'Ведение ЭПО .Ввод и актуализация информации в информационный ресурс ЭПО (ТУ)',
      value: 'Выполнена актуализация информации в ЭПО.',
    },
  ];
  const serviceTextData_12 = {
    name: 'Профилактические работы. 12. Обеспечение работоспособности ППК СОИФНС. (ТУ)',
    data: [
      'Проведены профилактические работы по обеспечению работоспособности ППК СОИФНС. Проведена проверка журнала ОС на ошибочные действия. Результат проверки не показал ошибок. ',
      'Проведены профилактические работы по обеспечению работоспособности ППК СОИФНС. Проведена проверка журнала ОС на ошибочные действия. Результат проверки не показал ошибок. Проведён анализ корневых и прерванных процессов. Результат анализа не показал ошибок. Процесс (Актуализация БД) работает в штатном режиме. Канал связи работает в штатном режиме. Неотправленная почта отсутствует.',
    ],
  };

  const TableModule = {
    init: function () {
      this.table = document.querySelector('#report-result-table');

      const topScroll = document.querySelector('.topscroll');
      topScroll.parentNode.removeChild(topScroll);

      const removeColumnByName = (columnName) => {
        const index = filterSetting.colls.findIndex(
          (col) => col.name === columnName
        );
        if (index !== -1) {
          filterSetting.colls.splice(index, 1);
        }
      };

      switch (window.location.href) {
        case 'https://lki.tax.nalog.ru/tech/':
          removeColumnByName('Дата закрытия');
          break;

        case 'https://lki.tax.nalog.ru/tech/new.php':
          removeColumnByName('Дата принятия');
          removeColumnByName('Дата закрытия');
          break;

        case 'https://lki.tax.nalog.ru/tech/end.php':
          removeColumnByName('Этап');
          removeColumnByName('Дата закрытия');
          break;

        case 'https://lki.tax.nalog.ru/tech/expired.php':
          break;
      }

      this.setupTable();
    },
    setupTable: function () {
      let width = '';
      let display = '';
      let style = document.createElement('style');
      let css =
        '.fku-modal {display: none; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.4);} ';
      css =
        css +
        '.fku-modal-content {background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 40%;} ';
      css =
        css +
        '.fku-modal-close {color: #aaa; float: right; font-size: 28px; font-weight: bold;} .fku-modal-close:hover, .fku-modal-close:focus {color: black; text-decoration: none; cursor: pointer;} ';
      css =
        css +
        '.fku-fixed-button {position: fixed; top: 50%; right: 2px; transform: translateY(-50%); padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2)} ';
      css = css + '.fku-fixe-button:hover {background-color: #0056b3;} ';
      for (let i = 0; i < filterSetting.colls.length; i++) {
        width = filterSetting.colls[i].width;
        display = '';
        if (!filterSetting.colls[i].visible) {
          display = 'display: none !important;';
        }
        css =
          css +
          '.truncate-' +
          i +
          ' {overflow: hidden !important; white-space: nowrap !important; text-overflow: ellipsis !important; width: ' +
          width +
          'px !important; min-width: ' +
          width +
          'px !important; max-width: ' +
          width +
          'px !important;' +
          display +
          '} ';
      }
      css =
        css +
        '.fku-table td{border-top: 1px solid ' +
        filterSetting.borderColor +
        ' !important; border-bottom: 1px solid ' +
        filterSetting.borderColor +
        ' !important;}';
      style.innerHTML = css;
      document.head.appendChild(style);

      this.filterColumns();
    },
    filterColumns: function () {},
  };

  const ModalModule = {
    init: function () {
      this.createModal();
      this.bindEvents();
    },
    createModal: function () {},
    bindEvents: function () {},
  };

  const EventModule = {
    init: function () {
      this.bindGlobalEvents();
    },
    bindGlobalEvents: function () {
      document.addEventListener('click', this.handleClick);
    },
    handleClick: function (event) {},
  };

  const init = function () {
    TableModule.init();
    ModalModule.init();
    EventModule.init();
  };

  init();

  const moveColumn = function (table, fromIndex, toIndex) {
    [...table.rows].forEach((row) => {
      const temp = row.cells[fromIndex].innerHTML;
      row.cells[fromIndex].innerHTML = row.cells[toIndex].innerHTML;
      row.cells[toIndex].innerHTML = temp;
    });
  };

  const deleteSpaces = function (table, tag) {
    const elements = table.querySelectorAll(tag);
    elements.forEach((element) => {
      element.textContent = element.textContent.trim();
    });
  };

  const oneDayInMillis = 24 * 60 * 60 * 1000;
  let scriptRun = false;

  const setFilter = function () {
    if (document.querySelector('#checkFilterElement')) return;

    scriptRun = true;
    console.time('setFilter');

    const table = document.querySelector('#report-result-table');

    table.classList.add('fku-table');

    const anotherHeader = document.querySelector('.tableFloatingHeader');
    if (anotherHeader) {
      anotherHeader.parentNode.removeChild(anotherHeader);
    }

    deleteSpaces(table, '.reports-head-cell-title');
    deleteSpaces(table, 'td');

    filterSetting.colls = filterSetting.colls.filter((item) =>
      [...table.rows[0].cells].some((obj) =>
        obj.textContent.includes(item.name)
      )
    );

    const replace = [];

    [...table.rows[0].cells].forEach((cell, index) => {
      for (let i = 0; i < filterSetting.colls.length; i++) {
        if (
          cell.textContent.includes(filterSetting.colls[i].name) ||
          cell.innerHTML.indexOf('#') !== -1
        ) {
          replace.push({ indexOld: index, indexNew: i });
          break;
        }
      }
    });

    const arrOld = [];
    const arrNew = [];

    replace.forEach((item, index) => {
      arrOld.push(replace[index].indexOld);
      arrNew.push(replace[index].indexNew);
    });

    arrNew.forEach((item1, index1) => {
      if (arrOld[index1] !== item1) {
        const index2 = arrOld.indexOf(item1);
        if (index2 !== -1) {
          moveColumn(table, arrOld[index1], arrOld[index2]);
          [arrOld[index1], arrOld[index2]] = [arrOld[index2], arrOld[index1]];
        }
      }
    });

    const deleteClass = function (findClass, deleteClass) {
      [...table.querySelectorAll(findClass)].forEach((element) => {
        element.classList.remove(deleteClass);
      });
    };

    deleteClass('.hidden', 'hidden');
    deleteClass('.hiddable', 'hidden');
    deleteClass('.hiddable1', 'hidden');
    deleteClass('.hiddable2', 'hidden');
    deleteClass('.reports-head-cell', 'hidden');

    [...table.rows].forEach((row) => {
      [...row.cells].forEach((cell, index) => {
        cell.classList.add('truncate-' + index);
      });
    });

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    filterSetting.colls.forEach((element, index) => {
      if (element.visible) {
        switch (element.name) {
          case 'Заявитель':
            if (filterSetting.profFKU === 'false') {
              for (let j = 1; j < table.rows.length; j++) {
                const cell = table.rows[j].cells[index];
                if (
                  table.rows[j].cells[index].textContent.includes(
                    'n2700_ФКУ_регламентные_работы'
                  )
                ) {
                  if (
                    !window.location.href.includes(
                      'https://lki.tax.nalog.ru/tech/end.php'
                    ) ||
                    !window.location.href.includes(
                      'https://lki.tax.nalog.ru/tech/new.php'
                    )
                  ) {
                    cell.parentNode.style.display = 'none';
                  }
                }
              }
            }
            break;
          case 'Услуга':
            if (filterSetting.profFNS === 'false') {
              for (let j = 1; j < table.rows.length; j++) {
                const cell = table.rows[j].cells[index];
                if (
                  table.rows[j].cells[index].textContent.includes(
                    'Профилактические работы'
                  )
                ) {
                  if (
                    !window.location.href.includes(
                      'https://lki.tax.nalog.ru/tech/end.php'
                    ) ||
                    !window.location.href.includes(
                      'https://lki.tax.nalog.ru/tech/new.php'
                    )
                  ) {
                    cell.parentNode.style.display = 'none';
                  }
                }
              }
            }
            break;
          case 'Код ЭКП':
            for (let j = 1; j < table.rows.length; j++) {
              const cell = table.rows[j].cells[index];
              if (!cell) break;

              const parent = cell.parentNode;
              parent.style.padding = '0px';
              parent.style.margin = '0px';

              for (let anotherCell of table.rows[j].cells) {
                anotherCell.style.padding = filterSetting.mpSize;
                anotherCell.style.margin = 'opx';
              }

              cell.style.backgroundColor = cell.textContent.includes(
                filterSetting.ekp
              )
                ? filterSetting.ekpColor
                : filterSetting.ekpAnotherColor;
            }
            break;
          case 'Исполнитель':
            for (let j = 1; j < table.rows.length; j++) {
              const cell = table.rows[j].cells[index];
              if (!cell) break;
              if (cell.textContent.includes(filterSetting.user)) {
                cell.parentNode.style.fontSize = '15px';
              }
              cell.style.backgroundColor = cell.textContent.includes(
                filterSetting.user
              )
                ? filterSetting.userColor
                : filterSetting.userAnotherColor;
            }
            break;
          case 'Доп.статус':
            for (let j = 1; j < table.rows.length; j++) {
              const cell = table.rows[j].cells[index];
              if (!cell) break;
              if (cell.textContent.length > 0) {
                cell.textContent = '';
                cell.style.backgroundColor = 'black';
              }
            }
            break;
          case 'Этап':
            for (let j = 1; j < table.rows.length; j++) {
              const cell = table.rows[j].cells[index];
              if (!cell) break;
              if (cell.textContent.includes('Отложенное выполнение')) {
                cell.style.backgroundColor = filterSetting.delayedColor;
              }
            }
            break;
          case 'Приоритет': {
            const priorityColors = {
              Низкий: filterSetting.priorityLowColor,
              Средний: filterSetting.priorityMediumColor,
              Высокий: filterSetting.priorityHighColor,
              'Очень высокий': filterSetting.priorityHighColor,
            };
            for (let j = 1; j < table.rows.length; j++) {
              const cell = table.rows[j].cells[index];
              if (!cell) break;
              for (const [priority, color] of Object.entries(priorityColors)) {
                if (cell.textContent.includes(priority)) {
                  cell.textContent = '';
                  cell.style.backgroundColor = color;
                  break;
                }
              }
            }
            break;
          }
          case 'Дата создания':
          case 'Дата закрытия':
          case 'Дата принятия':
            for (let j = 1; j < table.rows.length; j++) {
              const cell = table.rows[j].cells[index];
              if (cell && cell.textContent.length >= 3) {
                cell.textContent = cell.textContent.slice(0, -3);
              }
            }
            break;
          case 'Крайний срок завершения':
            for (let j = 1; j < table.rows.length; j++) {
              const cell = table.rows[j].cells[index];
              if (cell && cell.textContent.length >= 3) {
                cell.textContent = cell.textContent.slice(0, -3);
                const dateParts = cell.textContent.split(' ');
                if (dateParts.length < 2) continue;
                const [day, month, year] = dateParts[0].split('.').map(Number);
                const [hour] = dateParts[1].split(':').map(Number);
                const inputDate = new Date(year, month - 1, day);
                const differenceInMillis = inputDate - currentDate;
                let endRequest = false;
                if (differenceInMillis === 0) {
                  endRequest = true;
                  cell.style.backgroundColor = filterSetting.timeEndWarning;
                }
                let isOneDayInMillis = oneDayInMillis;
                if (currentDate.getDay() === 5) {
                  isOneDayInMillis *= 3;
                }
                if (differenceInMillis - isOneDayInMillis === 0) {
                  endRequest = true;
                  cell.style.backgroundColor =
                    hour < 12
                      ? filterSetting.timeEndWarning
                      : filterSetting.timeEndTomorrowWarning;
                }
                if (!endRequest) {
                  filterSetting.colls.forEach((item, number) => {
                    if (item.name.includes('Услуга')) {
                      if (filterSetting.vksTest === 'false') {
                        if (
                          table.rows[j].cells[number].textContent.includes(
                            'Оперативно-календарное планирование_003 (ТУ)'
                          )
                        ) {
                          if (
                            !window.location.href.includes(
                              'https://lki.tax.nalog.ru/tech/end.php'
                            ) ||
                            !window.location.href.includes(
                              'https://lki.tax.nalog.ru/tech/new.php'
                            )
                          ) {
                            cell.parentNode.style.display = 'none';
                          }
                        }
                      }
                    }
                  });
                }
              }
            }
            break;
        }
      }
    });

    const element = document.createElement('div');
    element.id = 'checkFilterElement';
    element.style.display = 'none';
    table.appendChild(element);

    console.timeEnd('setFilter');
    scriptRun = false;
  };

  const createButton = function (text, left, storageKey) {
    let storageValue = localStorage.getItem(storageKey);
    if (!storageValue) {
      storageValue = 'false';
      localStorage.setItem(storageKey, storageValue);
    }
    filterSetting[storageKey] = storageValue;
    let color = storageValue === 'true' ? '#a5d6a7' : '#ffab91';
    const button = document.createElement('button');
    button.innerText = text;
    button.style.position = 'absolute';
    button.style.top = '7px';
    button.style.left = left;
    button.style.transform = 'translateX(-50%)';
    button.style.zIndex = '1000';
    button.style.padding = '2px 10px';
    button.style.fontSize = '16px';
    button.style.backgroundColor = color;
    button.style.color = '#ffffff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.transition = 'box-shadow 0.3s, transform 0.3s';
    button.style.color = 'black';
    button.id = text;

    button.addEventListener('click', (e) => {
      storageValue = localStorage.getItem(storageKey);
      if (storageValue) {
        storageValue = storageValue === 'true' ? 'false' : 'true';
      }
      localStorage.setItem(storageKey, storageValue);
      filterSetting[storageKey] = storageValue;
      e.target.style.backgroundColor =
        storageValue === 'true' ? '#1b5e20' : '#bf360c';
      color = storageValue === 'true' ? '#a5d6a7' : '#ffab91';

      filterSetting.colls.forEach((element, index) => {
        if (element.visible) {
          switch (element.name) {
            case 'Заявитель':
              for (let j = 1; j < table.rows.length; j++) {
                const cell = table.rows[j].cells[index];
                if (
                  table.rows[j].cells[index].textContent.includes(
                    'n2700_ФКУ_регламентные_работы'
                  )
                ) {
                  if (
                    !window.location.href.includes(
                      'https://lki.tax.nalog.ru/tech/end.php'
                    ) ||
                    !window.location.href.includes(
                      'https://lki.tax.nalog.ru/tech/new.php'
                    )
                  ) {
                    if (filterSetting.profFKU === 'false') {
                      cell.parentNode.style.display = 'none';
                    } else {
                      cell.parentNode.style.display = 'table-cell';
                    }
                  }
                }
              }
              break;
            case 'Услуга':
              for (let j = 1; j < table.rows.length; j++) {
                const cell = table.rows[j].cells[index];
                if (
                  table.rows[j].cells[index].textContent.includes(
                    'Профилактические работы'
                  )
                ) {
                  if (
                    !window.location.href.includes(
                      'https://lki.tax.nalog.ru/tech/end.php'
                    ) ||
                    !window.location.href.includes(
                      'https://lki.tax.nalog.ru/tech/new.php'
                    )
                  ) {
                    if (filterSetting.profFNS === 'false') {
                      cell.parentNode.style.display = 'none';
                    } else {
                      cell.parentNode.style.display = 'table-cell';
                    }
                  }
                }
              }
              break;
            case 'Крайний срок завершения':
              for (let j = 1; j < table.rows.length; j++) {
                const cell = table.rows[j].cells[index];
                if (cell && cell.textContent.length >= 3) {
                  cell.textContent = cell.textContent.slice(0, -3);
                  const dateParts = cell.textContent.split(' ');
                  if (dateParts.length < 2) continue;
                  const [day, month, year] = dateParts[0]
                    .split('.')
                    .map(Number);
                  const inputDate = new Date(year, month - 1, day);
                  const differenceInMillis = inputDate - currentDate;
                  let endRequest = false;
                  if (differenceInMillis === 0) {
                    endRequest = true;
                  }
                  if (!endRequest) {
                    filterSetting.colls.forEach((item, number) => {
                      if (item.name.includes('Услуга')) {
                        if (
                          table.rows[j].cells[number].textContent.includes(
                            'Оперативно-календарное планирование_003 (ТУ)'
                          )
                        ) {
                          if (
                            !window.location.href.includes(
                              'https://lki.tax.nalog.ru/tech/end.php'
                            ) ||
                            !window.location.href.includes(
                              'https://lki.tax.nalog.ru/tech/new.php'
                            )
                          ) {
                            if (filterSetting.vksTest === 'false') {
                              cell.parentNode.style.display = 'none';
                            } else {
                              cell.parentNode.style.display = 'table-cell';
                            }
                          }
                        }
                      }
                    });
                  }
                }
              }
              break;
          }
        }
      });
    });

    button.addEventListener('mouseenter', () => {
      button.style.backgroundColor =
        storageValue === 'true' ? '#1b5e20' : '#bf360c';
    });

    button.addEventListener('mouseleave', () => {
      button.style.backgroundColor = color;
    });

    button.addEventListener('mousedown', () => {
      button.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.8)';
    });

    button.addEventListener('mouseup', () => {
      button.style.boxShadow = '';
    });

    return button;
  };

  document.body.appendChild(createButton('ВКС', '30%', 'vksTest'));
  document.body.appendChild(createButton('ФКУ', '50%', 'profFKU'));
  document.body.appendChild(createButton('ФНС', '70%', 'profFNS'));

  document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'b' || event.key === 'и')) {
      const requestWindow = document.querySelector('#requestWindow');
      const tables = requestWindow.querySelectorAll('table');
      const content = tables[0].rows[5].cells[1].textContent;

      const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).catch((err) => {
          console.error('Ошибка при копировании текста:', err);
        });
      };

      if (content === serviceTextData_12.name) {
        const panelBody = requestWindow.querySelector('.panel-body');
        const textToCopy =
          panelBody && panelBody.textContent.length < 200
            ? serviceTextData_12.data[0]
            : serviceTextData_12.data[1];
        copyToClipboard(textToCopy);
        return;
      }

      for (const element of serviceTextData) {
        if (content === element.name) {
          copyToClipboard(element.value);
          break;
        }
      }
    }
  });

  const timerFilter = function () {
    setTimeout(() => {
      if (!scriptRun) setFilter();
      timerFilter();
    }, 150);
  };

  if (!scriptRun) setFilter();

  setTimeout(timerFilter, 150);

  const table = document.querySelector('#report-result-table');
  const tableHead = table.querySelector('thead');

  const tableHeadCallback = (mutationsList) => {
    tableHeadObserver.disconnect();
    if (mutationsList.length > 0) {
      tableHead.style = {};
    }
    tableHeadObserver.observe(tableHead, tableHeadConfig);
  };

  const tableHeadConfig = { attributes: true, attributeFilter: ['style'] };
  const tableHeadObserver = new MutationObserver(tableHeadCallback);
  tableHeadObserver.observe(tableHead, tableHeadConfig);
})();
