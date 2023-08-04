<script setup lang="ts">

import { ref } from 'vue'

type AliasType {
    p1: number,
    p2: string
}

const cektype  = ref<AliasType>({p1:30, p2:'makan'})



</script>

<template>
    <div class="container">
        <h4>{{ cektype }}</h4>
    </div>
</template>