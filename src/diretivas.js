import Vue from 'vue';
import moment from 'moment';

Vue.directive('date-format', (month, {value}) =>{
    month.innerHTML =
        `<small class="m-0" style="line-height: 1;">${moment(value).format('DD/MM/YYYY')}</small> 
         <b style="font-size: 12px;line-height: 1;display: block;">${moment(value).format('HH:mm:ss')}</b>`;
});
