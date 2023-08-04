<script setup>
import { ref } from 'vue'


defineProps({
  msg: {
    type: String,
    required: true
  }
})

const accountType = ref(['bank', 'eWallet', 'Cash'])
const account = ref([
  {
    name:'BSI',
    desc:'Bank Syariah Indoneisa',
    accountType:0,
    balance:0 
  },
  {
    name:'BRI',
    desc:'Bank Rakyat Indoneisa',
    accountType:0,
    balance:0 
  },
  {
    name:'shopeePay_1',
    desc:'shopeePay 0881036374333',
    accountType:1,
    balance:0 
  },
  {
    name:'shopeePay_2',
    desc:'shopeePay 08814337784',
    accountType:1,
    balance:0 
  },
  {
    name:'Malang',
    desc:'Raju',
    accountType:2,
    balance:0 
  },
  {
    name:'Madura',
    desc:'on me',
    accountType:2,
    balance:0 
  },


])

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
