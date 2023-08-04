<script setup>
import Account from '../Finance/components/Account.vue'
import Action from '../Finance/components/Action.vue'
import TransactionList from '../Finance/components/TransactionList.vue'

import Transaction from '../Finance/components/Transaction.vue'
</script>

<template>
  <div class="page">
    <div class="page-heading">
      <h3>Finance</h3>
    </div>
    <div class="page-content">
      <div class="row">
        <div class="col-12 col-lg-9">
          <Transaction/>
        </div>
        <div class="col-12 col-lg-3">
          <Action/>
          <br>
          <Account />
        </div>
      </div>
    </div>
  </div>

  <!-- <main>
    <div class="container">
      <Account />
    </div>
    
    <div class="container">
      <Action/>
      <Transaction/>
    </div>
  </main> -->
</template>
