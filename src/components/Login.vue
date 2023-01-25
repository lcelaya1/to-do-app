<template>
    <p v-if="errorMsg" class=" max-w-md m-auto text-red-500 text-center rounded-xl shadow-lg py-10">{{ errorMsg }}</p>
    <form @submit.prevent="login" class= "max-w-md m-auto flex flex-col h-screen justify-center font-sans">
        <div class=" px-8 py-12 rounded-xl shadow-lg">
            <h1 class="text-2xl font-medium mb-10 text-center">Log In</h1>
            <Form >
                <i class="fa-regular fa-envelope mx-4"></i>
                <input class="placeholder:text-slate-500 w-3/4" type="email" name="Email" id="email" placeholder="yourname@example.com" v-model="email" required>
            </Form>
            <Form >
                <i class="fa-solid fa-key mx-4"></i>
                <input class="placeholder:text-slate-500 w-3/4" type="password" id="pass" name="password" placeholder="Enter your password" v-model="password" required>
            </Form>
            <Button>
                <button type="submit" class="w-full">Log In</button>
            </Button>
            <p class="text-end mt-2 font-medium">Forgot password?</p>
            <p class="text-center border-solid border-b border-slate-900 leading-extra-loose pt-10"><span class="bg-white px-4">Or log in with</span></p>
            <div class="flex justify-center mt-8">
                <Socialenter class="mr-4">
                    <i class="fa-brands fa-google fa-lg"></i>
                </Socialenter>
                <Socialenter class="mb-4">
                    <i class="fa-brands fa-facebook-f fa-lg"></i>
                </Socialenter>
            </div>
            <slot></slot>
        </div>
    </form>
</template>

<script setup>
import Form from './Form.vue';
import Button from './Button.vue';
import Socialenter from './Socialenter.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();

const login = async () => {
    try {
        const { error } = await supabase.auth.signIn({
            email: email.value,
            password: password.value,
        });
        if(error) throw error;
        router.push({ name : "Home" });
    } catch (error) {
        errorMsg.value = `Error : ${error.message}`;
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);
    }
}

</script>

<style scoped>

</style>