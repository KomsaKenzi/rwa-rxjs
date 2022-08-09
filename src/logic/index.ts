import { BehaviorSubject, from, fromEvent, Observable, of, Subject, debounceTime, map, filter, switchMap, merge, concat, concatWith, concatMap, mergeWith } from "rxjs";
import { BubbleController, Chart, ChartType, registerables } from "chart.js";

let hprice:number;
let pocetnoStanje = {
    money: 1000,
    wizard: 0,
    warrior: 0,
    healer: 0,
    start_price: 500,
    wiprice: 500,
    waprice: 500,
    hprice: 500
}






const balance = document.getElementsByClassName('balance')[0];
const novac = document.createElement("div");
novac.innerHTML = `<span>Balance: ${pocetnoStanje.money}</span>`;
balance.appendChild(novac);


const cards = document.getElementsByClassName('cards')[0];
const wizard = document.createElement("img");
wizard.classList.add("wizard");
wizard.src = "./src/pics/wizard.png";
cards.appendChild(wizard);

const wizard_info = document.createElement("div");
wizard_info.classList.add("info");
wizard_info.innerHTML = `<span>Name: Wizard</span>
<span>Main weapon: Staff</span>
<span>Starting price: ${pocetnoStanje.start_price}</span>
<span>Price: ${pocetnoStanje.start_price}</span>
<span>Defence: 40</span>
<span>Attack: 70</span>
<span>Mana: 100</span>`;
cards.appendChild(wizard_info);

const wizard_buy = document.createElement("button");
wizard_buy.innerHTML = "Buy"
wizard_info.appendChild(wizard_buy);

const warrior = document.createElement("img");
warrior.classList.add("warrior");
warrior.src = "./src/pics/warrior.png";
cards.appendChild(warrior);

const warrior_info = document.createElement("div");
warrior_info.classList.add("info");
warrior_info.innerHTML = `<span>Name: Warrior</span>
<span>Main weapon: Sword</span>
<span>Starting price: ${pocetnoStanje.start_price}</span>
<span>Price: ${pocetnoStanje.start_price}</span>
<span>Defence: 80</span>
<span>Attack: 50</span>
<span>Mana: 20</span>`;
cards.appendChild(warrior_info);

const warrior_buy = document.createElement("button");
warrior_buy.innerHTML = "Buy"
warrior_info.appendChild(warrior_buy);

const healer = document.createElement("img");
healer.classList.add("healer");
healer.src = "./src/pics/healer.png";
cards.appendChild(healer);

const healer_info = document.createElement("div");
healer_info.classList.add("info");
healer_info.innerHTML = `<span>Name: Healer</span>
<span>Main weapon: Bow</span>
<span>Starting price: ${pocetnoStanje.start_price}</span>
<span>Price: ${pocetnoStanje.start_price}</span>
<span>Defence: 50</span>
<span>Attack: 20</span>
<span>Mana: 150</span>`;
cards.appendChild(healer_info);

const healer_buy = document.createElement("button");
healer_buy.innerHTML = "Buy"
healer_info.appendChild(healer_buy);
healer_buy.onclick(smanji(pocetnoStanje.hprice));


const statistika = document.getElementsByClassName("statistic");

const getDefaultChartCanvas = (): HTMLCanvasElement => {
    return document.getElementById('chart') as HTMLCanvasElement;
}

const initChart = (): Chart => {
    Chart.register(...registerables);
    const labels = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'LOADING...',
            backgroundColor: 'blue',
            borderColor: 'yellow',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    };

    const config = {
        type: 'line' as ChartType,
        data: data,
        options: {}
    };

    const ctx = (getDefaultChartCanvas()).getContext('2d');
    return new Chart(ctx, config);
}

chart: initChart()


const cards_owned = document.getElementsByClassName('cards_owned')[0];

const wizard_o = document.createElement("span");
wizard_o.classList.add("wizard_o");
wizard_o.innerHTML = `Wizards owned: ${pocetnoStanje.wizard}`;
cards_owned.appendChild(wizard_o);

const warrior_o = document.createElement("span");
warrior_o.classList.add("warrior_o");
warrior_o.innerHTML = `Warriors owned: ${pocetnoStanje.warrior}`;
cards_owned.appendChild(warrior_o);

const healer_o = document.createElement("span");
healer_o.classList.add("healer_o");
healer_o.innerHTML = `Healers owned: ${pocetnoStanje.healer}`;
cards_owned.appendChild(healer_o);


function smanji(broj:number){
    
}