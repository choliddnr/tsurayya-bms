<script setup>
import { onMounted } from 'vue'
import { useTransactionStore, useAccountsStore } from '@/stores.js'

// onMounted(() => {
const transaction = useTransactionStore()
const transactions =transaction.transactions
console.log(transaction.transactions)
// })

const account = useAccountsStore()
console.log(account.accounts)

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
      <!-- <tr v-for="t in transactions">
        <th scope="row">{{ formateTimestamp(t.datetime) }}</th>
        <td>{{ t.type }}</td>
        <td>{{ formatPrice(t.amount) }}</td>
        <td>{{ t.desc }}</td>
      </tr> -->
    </tbody>
  </table>
</template>
<style>

</style>