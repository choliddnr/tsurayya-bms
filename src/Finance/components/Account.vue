<script setup>
import { ref } from 'vue'
import { useAccountsStore } from '@/stores'

// defineProps({
//   msg: {
//     type: String,
//     required: false
//   }
// })

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

const account = useAccountsStore()

</script>

<template>
    <div class="container text-center">
        <div class="row">
            <div class="callout callout-info col-sm-3 col-md-12" v-for="account in account.accounts">
                <strong>{{ account.name}}</strong><br/>
                {{ formatPrice(account.balance) }},-
            </div>
        </div>
    </div>
    
</template>

<style scoped>
.card {
    margin-bottom: 10px;
}
.card-body{
    padding: 5px;
    text-align: left;
}

h3 {
  font-size: 1.2rem;
}
.callout {
    --bs-link-color-rgb: var(--bd-callout-link);
    --bs-code-color: var(--bd-callout-code-color);
    padding: 0.5rem;
    margin-top: 0rem;
    margin-bottom: 1rem;
    color: var(--bd-callout-color, inherit);
    background-color: var(--bd-callout-bg, var(--bs-gray-100));
    border-left: 0.25rem solid var(--bd-callout-border, var(--bs-gray-300));
    text-align: left;
}
.callout-info {
    --bd-callout-color: var(--bs-info-text-emphasis);
    --bd-callout-bg: var(--bs-info-bg-subtle);
    --bd-callout-border: var(--bs-info-border-subtle);
}
</style>
