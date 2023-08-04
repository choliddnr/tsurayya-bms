<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  show: Boolean,
  accounts: Object,
});

const from = ref(0);
const to = ref(0);
const isAccount = ref(true);
const amount = ref(0);
const desc = ref("");

watch(props, () => {
  from.value = 0;
  to.value = 0;
  isAccount.value = true;
  amount.value = 0;
  desc.value = "";
});
console.log(props.show)
</script>

<template>
  <Transition name="modal">
    <!-- <div v-if="show" class="modal-mask"> -->

    <!--login form Modal -->
    <div
      class="modal fade text-left"
      :class="{ show:show}"
      id="inlineForm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel33"
      :aria-hidden="!show"
      :aria-modal="show"
      :style="{ display: show?'block':'none'}"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel33">Login Form</h4>
            <button
              type="button"
              class="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i data-feather="x"></i>
            </button>
          </div>
          <form action="#">
            <div class="modal-body">
              <label for="email">Email: </label>
              <div class="form-group">
                <input
                  id="email"
                  type="text"
                  placeholder="Email Address"
                  class="form-control"
                />
              </div>
              <label for="password">Password: </label>
              <div class="form-group">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  class="form-control"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light-secondary"
                data-bs-dismiss="modal"
                @click="show = false"
              >
                <i class="bx bx-x d-block d-sm-none"></i>
                <span class="d-none d-sm-block">Close</span>
              </button>
              <button
                type="button"
                class="btn btn-primary ms-1"
                data-bs-dismiss="modal"
              >
                <i class="bx bx-check d-block d-sm-none"></i>
                <span class="d-none d-sm-block">login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- </div> -->
      <!-- <div class="modal-container">
        <div class="modal-header"> -->
      <!-- <slot name="header">default header</slot> -->
      <!-- <h3>Mutation</h3>
        </div>

        <div class="modal-body"> -->
      <!-- <slot name="body">default body</slot> -->
      <!-- <div class="mb-3">
            <label class="form-label">From</label>
            <select class="form-select" v-model="from">
              <option v-for="account in accounts.accounts" :value="account.id">{{ account.name }} - {{ account.desc }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">To</label>
            <select class="form-select" v-model="to" v-if="isAccount">
              <option v-for="account in accounts.accounts" :value="account.id">{{ account.name }} - {{ account.desc }}</option>
            </select>
            <input type="text" class="form-control" v-model="to" v-else >
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" v-model="isAccount">
              <label class="form-check-label">
                is account?
              </label>
            </div>
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
              <button type="button" class="btn btn-primary" @click="$emit('submit', from, to, isAccount, amount, desc)">submit</button>
            </div>
          </slot>
        </div>
      </div> -->
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
