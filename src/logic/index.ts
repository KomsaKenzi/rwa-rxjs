import { startWith, delay, every, BehaviorSubject, from, fromEvent, Observable, of, Subject, debounceTime, map, filter, switchMap, merge, concat, concatWith, concatMap, mergeWith, interval, timer, zip } from "rxjs";
import { BubbleController, Chart, ChartType, registerables, UpdateModeEnum } from "chart.js";
import { IKupovina } from "../interfaces/Kupovine";
import { takeUntil, tap, take, takeWhile } from 'rxjs/operators';
import * as fs from 'fs'


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

const getDefaultChartCanvas = (): HTMLCanvasElement => {
    return document.getElementById('chart') as HTMLCanvasElement;
}


function init() {
    const balance = document.getElementsByClassName('balance')[0];
    const novac = document.createElement("div");
    novac.classList.add("novac");
    novac.innerHTML = `<span>Balance: ${pocetnoStanje.money}</span>`;
    balance.appendChild(novac);

    const cards = document.getElementsByClassName('cards')[0];
    const wiz_div = document.createElement("div");
    wiz_div.classList.add("wiz_div");
    const war_div = document.createElement("div");
    war_div.classList.add("war_div");
    const hea_div = document.createElement("div");
    hea_div.classList.add("hea_div");

    
    const wizard = document.createElement("img");
    wizard.classList.add("wizard");
    wizard.src = "./src/pics/wizard.png";
    wiz_div.appendChild(wizard);

    const wizard_info = document.createElement("div");
    wizard_info.classList.add("info");
    wizard_info.innerHTML = `<span>Name: Wizard</span>
<span>Main weapon: Staff</span>
<span>Starting price: ${pocetnoStanje.start_price}</span>
<span class="smanjiti">Price: ${pocetnoStanje.wiprice}</span>
<span>Defence: 40</span>
<span>Attack: 70</span>
<span>Mana: 100</span>`;
    wiz_div.appendChild(wizard_info);

    const wizard_buy = document.createElement("button");
    //wizard_buy.onclick = wizard_bought;
    wizard_buy.classList.add("wizard_buy");
    wizard_buy.innerHTML = "Buy"
    wizard_info.appendChild(wizard_buy);
    cards.appendChild(wiz_div);
    const warrior = document.createElement("img");
    warrior.classList.add("warrior");
    warrior.src = "./src/pics/warrior.png";
    war_div.appendChild(warrior);

    const warrior_info = document.createElement("div");
    warrior_info.classList.add("info");
    warrior_info.innerHTML = `<span>Name: Warrior</span>
<span>Main weapon: Sword</span>
<span>Starting price: ${pocetnoStanje.start_price}</span>
<span class="smanjiti">Price: ${pocetnoStanje.waprice}</span>
<span>Defence: 80</span>
<span>Attack: 50</span>
<span>Mana: 20</span>`;
    war_div.appendChild(warrior_info);

    const warrior_buy = document.createElement("button");
    warrior_buy.classList.add("warrior_buy");
    warrior_buy.innerHTML = "Buy"
    warrior_info.appendChild(warrior_buy);
    cards.appendChild(war_div);

    const healer = document.createElement("img");
    healer.classList.add("healer");
    healer.src = "./src/pics/healer.png";
    hea_div.appendChild(healer);

    const healer_info = document.createElement("div");
    healer_info.classList.add("info");
    healer_info.innerHTML = `<span>Name: Healer</span>
<span>Main weapon: Bow</span>
<span>Starting price: ${pocetnoStanje.start_price}</span>
<span class="smanjiti">Price: ${pocetnoStanje.hprice}</span>
<span>Defence: 50</span>
<span>Attack: 20</span>
<span>Mana: 150</span>`;
    hea_div.appendChild(healer_info);

    const healer_buy = document.createElement("button");
    healer_buy.classList.add("healer_buy");
    healer_buy.innerHTML = "Buy"
    healer_info.appendChild(healer_buy);
    cards.appendChild(hea_div);

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

    const gift = document.getElementsByClassName('gift')[0];

    const gift_wi = document.createElement("div");
    gift_wi.classList.add("gift_wi");
    gift_wi.innerHTML = `Take one time bonus 5 wizards!`;
    gift.appendChild(gift_wi);

    const gift_wa = document.createElement("div");
    gift_wa.classList.add("gift_wa");
    gift_wa.innerHTML = `Take one time bonus 5 warriors!`;
    gift.appendChild(gift_wa);

    const gift_he = document.createElement("div");
    gift_he.classList.add("gift_he");
    gift_he.innerHTML = `Take one time bonus 5 healers!`;
    gift.appendChild(gift_he);
}
init();

function FirstPromise() {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            const randInt = Math.round(Math.random() * 15);
            resolve(randInt);
        }, 2000);
    });
    return p;
}

const source = interval(5000);

  var kupovinaK = source.pipe(
    filter(_ => (pocetnoStanje.wiprice > 100) || (pocetnoStanje.waprice > 100) || (pocetnoStanje.hprice > 100))
  ).subscribe({
    next: (num) => {
        console.log('Smanjen');
      sendAllEmails();
    }
  })


  var wizard_kupljen = document.getElementsByClassName("wizard_buy")[0];
fromEvent(wizard_kupljen, 'click').pipe(
    // restart counter on every click
    switchMap(async () => kupovinaK)
  )
  .subscribe(_ => {
    wizard_bought();
    //console.log("reset")
    
  });

  var warrior_kupljen = document.getElementsByClassName("warrior_buy")[0];
fromEvent(warrior_kupljen, 'click').pipe(
    // restart counter on every click
    switchMap(async () => kupovinaK)
  )
  .subscribe(_ => {
    warrior_bought();
    //console.log("reset")
    
  });

  var healer_kupljen = document.getElementsByClassName("healer_buy")[0];
fromEvent(healer_kupljen, 'click').pipe(
    // restart counter on every click
    switchMap(async () => kupovinaK)
  )
  .subscribe(_ => {
    healer_bought();
    //console.log("reset")
    
  });

async function sendAllEmails() {
    await FirstPromise().then((x: number) => {
        const smanji1 = document.getElementsByClassName("smanjiti")[0];
        const smanji2 = document.getElementsByClassName("smanjiti")[1];
        const smanji3 = document.getElementsByClassName("smanjiti")[2];
        if (pocetnoStanje.wiprice - x < 100) pocetnoStanje.wiprice = 100;
        else pocetnoStanje.wiprice -= x;
        if (pocetnoStanje.waprice - x < 100) pocetnoStanje.waprice = 100;
        else pocetnoStanje.waprice -= x;
        if (pocetnoStanje.hprice - x < 100) pocetnoStanje.hprice = 100;
        else pocetnoStanje.hprice -= x;
        smanji1.innerHTML = `Price: ${pocetnoStanje.wiprice}`;
        smanji2.innerHTML = `Price: ${pocetnoStanje.waprice}`;
        smanji3.innerHTML = `Price: ${pocetnoStanje.hprice}`;
    });
    //sendAllEmails();
}

const bonus: Array<number> = new Array();
const oneClickEvent = fromEvent(getDefaultChartCanvas(), 'click').pipe(
    take(2),
    tap(v => {
        let x: number = v.screenX;
        let y: number = v.screenY;
        smanji(-Math.abs(x - y));
        bonus.push(Math.abs(x - y));
        console.log(bonus);
    })
);
const subscribe = oneClickEvent.subscribe();


function wizard_bought() {
    if (smanji(pocetnoStanje.wiprice)) {
        const smanji3 = document.getElementsByClassName("smanjiti")[0];
        pocetnoStanje.wiprice = 500;
        smanji3.innerHTML = `Price: ${pocetnoStanje.wiprice}`;
        pocetnoStanje.wizard++;
        updateC();
    }
    else {
        console.log("Nedovoljno novaca");
    }
}

function warrior_bought() {
    if (smanji(pocetnoStanje.waprice)) {
        const smanji3 = document.getElementsByClassName("smanjiti")[1];
        pocetnoStanje.waprice = 500;
        smanji3.innerHTML = `Price: ${pocetnoStanje.waprice}`;
        pocetnoStanje.warrior++;
        updateC();
    }
    else {
        console.log("Nedovoljno novaca");
    }
}

function healer_bought() {
    if (smanji(pocetnoStanje.hprice)) {
        const smanji3 = document.getElementsByClassName("smanjiti")[2];
        pocetnoStanje.hprice = 500;
        smanji3.innerHTML = `Price: ${pocetnoStanje.hprice}`;
        pocetnoStanje.healer++;
        updateC();
    }
    else {
        console.log("Nedovoljno novaca");
    }
}

function smanji(x: number) {
    if (pocetnoStanje.money >= x) {
        const novac = document.getElementsByClassName("novac")[0];
        pocetnoStanje.money -= x;
        novac.innerHTML = `<span>Balance: ${pocetnoStanje.money}</span>`;
        return true;
    }
    else return false;
}

function updateC() {
    const healer_o = document.getElementsByClassName("healer_o")[0];
    healer_o.innerHTML = `Healers owned: ${pocetnoStanje.healer}`;
    const warrior_o = document.getElementsByClassName("warrior_o")[0];
    warrior_o.innerHTML = `Warriors owned: ${pocetnoStanje.warrior}`;
    const wizard_o = document.getElementsByClassName("wizard_o")[0];
    wizard_o.innerHTML = `Wizards owned: ${pocetnoStanje.wizard}`;
}

const getApiURL = (): string => {
    return "http://127.0.0.1:5500/rwa-rxjs";
};

// const getAllProjects = (): Observable<IKupovina[]> => {
//     return from(
//         fetch(`${getApiURL()}/db.json`)
//             .then((res) => {
//                 if (res.ok) return res.json();
//                 else throw new Error("Kupovine not found");
//             })
//             .catch((err) => (console.log("Nema kupovina")))
//     )
// }
const getAllProjects = () => {
    fetch(`${getApiURL()}/src/db/db.json`)
        .then((res) => res.json())
        .then((data) => {
            const datum: Date = new Date;
            const datumDanas: Date = new Date;
            var niz = new Array();
            let mapProdaja = new Map<Date, number>();
            datum.setDate(datum.getDate() - 7);

            data.kupovine.slice().reverse().forEach((element: any) => {
                niz.push(element);
            });

            const ovaNedelja = niz.filter(datumzadnji => {
                const uporedi = new Date(datumzadnji.date);
                return uporedi.getDate() <= datumDanas.getDate() && uporedi.getDate() > datum.getDate()
            });

            ovaNedelja.forEach((element: any) => {
                mapProdaja.set(element.date, element.sold)
            });
            //ovaNedelja
            // mapProdaja.set(key, value)
            //console.log(mapProdaja);


            var soldWeek = ovaNedelja.reduce((acc, curVal) => acc + curVal.sold, 0);

            console.log(soldWeek);
            statistika(mapProdaja, soldWeek);
        });

}

getAllProjects();

function statistika(nedelja: Map<Date, number>, prodato: number) {
   
    const dani = Array.from(nedelja.keys());
    const initChart = (): Chart => {
        Chart.register(...registerables);
        const labels = dani;


        const prodati = Array.from(nedelja.values());
        const data = {
            labels: labels,
            datasets: [{
                label: `Ukupno prodato u zadnjih 7 dana ${prodato}`,
                backgroundColor: 'beige',
                borderColor: 'rgb(119, 49, 17)',
                data: prodati,
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

}

const eventTime = (eventName: string) =>
  fromEvent(document, eventName).pipe(map(() => new Date()));

const mouseClickDuration = zip(
  eventTime('mouseup'),
  eventTime('mousedown')

).pipe(map(([start, end]) => Math.abs(start.getTime() - end.getTime())));

mouseClickDuration.subscribe(x => smanji(-Math.round(x/1000)));



var giftan_wi = document.getElementsByClassName("gift_wi")[0];
var giftan_wiz = fromEvent(giftan_wi, 'click');
var giftan_wa = document.getElementsByClassName("gift_wa")[0];
var giftan_war = fromEvent(giftan_wa, 'click');
var giftan_he = document.getElementsByClassName("gift_he")[0];
var giftan_hea = fromEvent(giftan_he, 'click');
  
const source2 = interval(1000);
var vrednost = 1;
const result = source2.pipe(takeUntil(merge(giftan_wiz, giftan_war, giftan_hea)))
.subscribe(x =>{
    if(vrednost == 3){
        giftan_wi.classList.remove("boja");
        giftan_he.classList.add("boja");
        giftan_wa.classList.remove("boja");
        vrednost-=2;
    }
    else if(vrednost == 2){
        giftan_wi.classList.remove("boja");
        giftan_he.classList.remove("boja");
        giftan_wa.classList.add("boja");
        vrednost++;
    }
    else{ 
        giftan_wi.classList.add("boja");
        giftan_he.classList.remove("boja");
        giftan_wa.classList.remove("boja");
        vrednost++;
    }
}
);
giftan_wiz.pipe(take(1),takeUntil(merge(giftan_war, giftan_hea))).subscribe(_ => {
    pocetnoStanje.wizard+=5;
    giftan_wi.classList.remove("boja");
    giftan_he.classList.remove("boja");
    giftan_wa.classList.remove("boja");
    giftan_wi.classList.add("bojaK");
    giftan_he.classList.add("bojaK");
    giftan_wa.classList.add("bojaK");
    updateC();
}
);
    
giftan_war.pipe(take(1),takeUntil(merge(giftan_wiz, giftan_hea))).subscribe(_ => {
    pocetnoStanje.warrior+=5;
    giftan_wi.classList.remove("boja");
    giftan_he.classList.remove("boja");
    giftan_wa.classList.remove("boja");
    giftan_wi.classList.add("bojaK");
    giftan_he.classList.add("bojaK");
    giftan_wa.classList.add("bojaK");
    updateC();
}
);

giftan_hea.pipe(take(1),takeUntil(merge(giftan_wiz, giftan_war))).subscribe(_ => {
    pocetnoStanje.healer+=5;
    giftan_wi.classList.remove("boja");
    giftan_he.classList.remove("boja");
    giftan_wa.classList.remove("boja");
    giftan_wi.classList.add("bojaK");
    giftan_he.classList.add("bojaK");
    giftan_wa.classList.add("bojaK");
    updateC();
}
);
