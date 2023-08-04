<script setup>
import { ref, computed } from 'vue'
import { useAccountsStore, useTransactionStore, useNotificationStore } from '@/stores'

import modalMutation from './modal/Mutation.vue'
import modalDebit from './modal/Debit.vue'
import modalCredit from './modal/Credit.vue'


const transactions = useTransactionStore()
const notif = useNotificationStore()

const showModalMutation = ref(false)
const showModalDebit = ref(false)
const showModalCredit = ref(false)

const accounts = useAccountsStore()

function mutationSubmit(from, to, isAccount, amount, desc) {
  let data = {
    datetime:Date.now(),
    type:'mutation',
    from:from, 
    to:to,
    isAccount:isAccount, 
    amount:Number(amount), 
    desc:desc,
  }
  accounts.mutation(from, to, isAccount, amount)
  transactions.newTransaction(data)
  showModalMutation.value = false
  notif.setNotif('success', 'Mutasi sukses')
}

function debitSubmit(cat, to, amount, desc) {
  let data = {
    datetime:Date.now(),
    type:'debit',
    cat:cat, 
    to:to,
    amount:Number(amount), 
    desc:desc,
  }
  accounts.debit(to, amount)
  transactions.newTransaction(data)
  showModalDebit.value = false
  notif.setNotif('success', 'Debit success')
}

function creditSubmit(cat, from, amount, desc) {
  let data = {
    datetime:Date.now(),
    type:'credit',
    cat:cat, 
    from:from,
    amount:Number(amount), 
    desc:desc,
  }
  accounts.credit(from, amount)
  transactions.newTransaction(data)
  showModalCredit.value = false
  notif.setNotif('success', 'Credit success')
}


</script>

<template>
  <div class="container">
    <div class="row">
        <div class="btn-group p-0" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary" @click="showModalMutation = true">Mutation</button>
            <button type="button" class="btn btn-primary" @click="showModalDebit = true">Debit</button>
            <button type="button" class="btn btn-primary" @click="showModalCredit = true">Credit</button>
        </div>
        <Teleport to="body">
            <modalMutation :show="showModalMutation" @close="showModalMutation = false" @submit="mutationSubmit" :accounts="accounts"></modalMutation>
            <modalDebit :show="showModalDebit" @close="showModalDebit = false" @submit="debitSubmit" :accounts="accounts" :debitCat="transactions.debitCategories"></modalDebit>
            <modalCredit :show="showModalCredit" @close="showModalCredit = false" @submit="creditSubmit" :accounts="accounts" :creditCat="transactions.creditCategories"></modalCredit>
        </Teleport>
      </div>
    <div class="row">
    </div>
  </div>
</template>
<style>
</style>