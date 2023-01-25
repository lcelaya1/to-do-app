<template>
    <header class=" bg-ikea-blue">
        <nav class=" container py-5 px-4 flex items-center justify-between">
            <div class="bg-ikea-yellow border-0 w-14 h-14 rounded-full stroke-ikea-yellow flex items-center justify-center">
                <img src="../assets/task.png" alt="Task Logo" class="w-8">
            </div>
            <button @click="signOut" class="text-ikea-yellow font-medium text-lg">Sign Out</button>
        </nav>
    </header>
    <p v-if="errorMsg" class=" max-w-md m-auto text-red-500 text-center rounded-xl shadow-lg py-10">{{ errorMsg }}</p>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';

const errorMsg = ref("");
const router = useRouter();

const signOut = async () => {
    try {
        console.log("try")
        const { error } = await supabase.auth.signOut();
        if(error) throw error;  
        router.push({name: "Auth"})
    } 
    catch (error) {
        errorMsg.value = `Error : ${error.message}`;
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);
    }
}

</script>

<style scoped>

</style>