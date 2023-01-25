<template>
    <p v-if="errorMsg" class=" max-w-md m-auto text-red-500 text-center rounded-xl shadow-lg py-10">{{ errorMsg }}</p>
    <form @submit.prevent="register" class= "max-w-md m-auto flex flex-col h-screen justify-center font-sans">
        <div class=" px-8 py-12 rounded-xl shadow-lg">
            <h1 class="text-2xl font-medium mb-5 text-center">Sign Up</h1>
            <p class="text-center mb-10 text-sm px-10">Welcome, enter your details and start organizing your day.</p>
            <Form>
                <i class="fa-regular fa-user mx-4"></i>
                <input class="placeholder:text-slate-500" type="text" id="text" name="text" placeholder="Your Name" v-model="text" required>
            </Form>
            <Form >
                <i class="fa-regular fa-envelope mx-4"></i>
                <input class="placeholder:text-slate-500" type="email" name="Email" id="email" placeholder="yourname@example.com" v-model="email" required>
            </Form>
            <p v-if="showEm" class="mb-4 text-red-500 text-center">{{ errorEm }}</p>
            <Form >
                <i class="fa-solid fa-key mx-4"></i>
                <input class="placeholder:text-slate-500" type="password" id="pass" name="password" placeholder="Set your password" v-model="password" required>
            </Form>
            <p v-if="showPw" class="mb-4 text-red-500 text-center">{{ errorPw }}</p>
            <Form >
                <i class="fa-solid fa-key mx-4"></i>
                <input class="placeholder:text-slate-500" type="password" id="pass" name="password" placeholder="Confirm your password" v-model="repeatPassword" required>
            </Form>
            <p v-if="showRpPw" class="mb-4 text-red-500 text-center">{{ errorRpPw }}</p>
            <Button>
                <button type="submit" class="w-full">Create an account</button>
            </Button>
            <p class="text-center border-solid border-b border-slate-900 leading-extra-loose pt-10"><span class="bg-white px-4">Or sign up with</span></p>
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
import { ref, watch } from 'vue';
import { supabase } from "../supabase";
import { useRouter } from 'vue-router';

const text = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const errorEm = ref("Your email needs a @");
const errorPw = ref("You password should have 8 characters or more");
const errorRpPw = ref("Your passwords don't match");
const showEm = ref(false);
const showPw = ref(false);
const showRpPw = ref(false);

watch (email, (newEmail, oldEmail) => {
    !email.value.includes("@") ? showEm.value = true : showEm.value = false;
});

watch (password, (newPassword, oldPassword) => {
    password.value.length < 8 ? showPw.value = true : showPw.value = false;
});

watch (repeatPassword, (newRepeatedPassword, oldRepeatedPassword) => {
    repeatPassword.value != password.value ? showRpPw.value = true : showRpPw.value = false;
});

const router = useRouter();
const errorMsg = ref("");

const register = async () => {
    try {
        const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        });
        if (error) throw error;
        router.push({ name : "Auth" });
    } catch (error) {
        errorMsg.value = `Error : ${error.message}`;
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);
    };
}

</script>

<style scoped>

</style>