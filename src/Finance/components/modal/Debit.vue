<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  accounts: Object,
  debitCat: Object
})

const cat = ref(0)
const to = ref(0)
const amount = ref(0)
const desc = ref('')


watch(props, () => {
  cat.value = 0
  to.value = 0
  amount.value = 0
  desc.value = ''
})



</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <!-- <slot name="header">default header</slot> -->
          <h3>Debit </h3>
        </div>

        <div class="modal-body">
          <!-- <slot name="body">default body</slot> -->
          <div class="mb-3">
            <label class="form-label">Category</label>
            <select class="form-select" v-model="cat">
              <option v-for="(debitcat, index) in debitCat" :value="index">{{ debitcat }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">To</label>
            <select class="form-select" v-model="to">
              <option v-for="account in accounts.accounts" :value="account.id">{{ account.name }} - {{ account.desc }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Amount</label>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Rp. </span>
              <input type="number" class="form-control" rows="3" v-model="amount">
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea class="form-control" rows="2" v-model="desc"></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-secondary" @click="$emit('close')">cancel</button>
              <button type="button" class="btn btn-primary" @click="$emit('submit', cat, to, amount, desc)">submit</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
    
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>