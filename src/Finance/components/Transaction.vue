<script setup>
import { ref, computed } from 'vue'
import { useAccountsStore, useTransactionStore } from '@/stores'


const transaction = useTransactionStore()

function formatPrice(value) {
  if (typeof value !== "number") {
      return value;
  }
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });
  return formatter.format(value);
}

function formateTimestamp(timestamp){
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des']
  const ts = new Date(timestamp)
  return month[ts.getMonth()]+' '+ts.getDate()+', '+ts.getHours()+':'+ts.getMinutes()+':'+ts.getSeconds()
}

function loadYesterday(){
    const cdt = new Date()
    const month = computed(() => cdt.getDate() <= 1? cdt.getMonth() - 1:cdt.getMonth()) 
    const yesterday = computed(() => cdt.getDate() <= 1? new Date(cdt.getFullYear(), month.value +1, 0).getDate(): cdt.getDate() - 1)
    const ts = new Date(cdt.getFullYear(),month.value, yesterday.value).getTime()
    transaction.loadFromDB(ts)
}

function loadThisWeek(){
    const cdt = new Date()
    const day = cdt.getDay() 
    const diff = cdt.getDate() - day + (day === 0 ? -6 : 1)
    const ts = new Date(cdt.getFullYear(), cdt.getMonth(), diff).getTime()
    transaction.loadFromDB(ts)
}

function loadThisMonth(){
    const cdt = new Date()
    const ts = new Date(cdt.getFullYear(),cdt.getMonth()).getTime()
    transaction.loadFromDB(ts)
}

function loadThisYear(){
    const cdt = new Date()
    const ts = new Date(cdt.getFullYear(),0).getTime()
    transaction.loadFromDB(ts)
}



</script>

<template>
    <table class="table table-hover table-striped" style="margin-top:20px">
    <thead>
      <tr>
        <th scope="col">Datetime</th>
        <th scope="col">Type</th>
        <th scope="col">Amount</th>
        <th scope="col">Desc</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="t in transaction.transactions">
        <th scope="row">{{ formateTimestamp(t.datetime) }}</th>
        <td>{{ t.type }}</td>
        <td>{{ formatPrice(t.amount) }}</td>
        <td>{{ t.desc }}</td>
      </tr>
    </tbody>
  </table>
  <div class="row">
    Load Previous Data 
    <button type="button" class="col-2 btn btn-primary btn-sm" @click="loadYesterday()">Yesterday</button>
    <button type="button" class="col-2 btn btn-primary btn-sm" @click="loadThisWeek()">This week</button>
    <button type="button" class="col-2 btn btn-primary btn-sm" @click="loadThisMonth()">This Month</button>
    <button type="button" class="col-2 btn btn-primary btn-sm" @click="loadThisYear()">This year</button>
  </div>
  {{ transaction.ts}}
</template>

<style scoped>
button{
    margin-left:10px;
}
</style>
