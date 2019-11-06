import Vue from 'vue';
import moment from 'moment';

Vue.directive('date-format', (month, {value}) =>{
    month.innerHTML =
        `<p class="m-0" style="line-height: 1;">${moment(value).format('DD/MM/YYYY')}</p> <amall style="font-size: 12px;font-weight: 700;line-height: 1;">${moment(value).format('HH:mm:ss')}</amall>`;
});
