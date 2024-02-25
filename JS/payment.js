import {getFiltered } from "./utils.js";

let kasseHandlekurvVisning = document.querySelector(".kasse-handlekurv-visning");
let summaryPris = document.querySelector(".summary-pris");

getFiltered(kasseHandlekurvVisning,summaryPris);

