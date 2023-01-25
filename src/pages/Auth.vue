<template>
    <Login v-if="show">
        <p class="text-center mt-8 text-sm">Don't have an acount? <button @click="changeShow" class="text-ikea-blue font-medium">Sign Up</button></p>
    </Login>
    <Signup v-else>
        <p class="text-center mt-8 text-sm">Already have an acount? <button @click="changeShow" class="text-ikea-blue font-medium">Log In</button></p>
    </Signup>

</template>

<script setup>
import Signup from '../components/Signup.vue';
import Login from '../components/Login.vue';
import { ref } from 'vue';

const show = ref(true)

function changeShow() {
    show.value = !show.value
}

</script>

<style scoped>

</style>