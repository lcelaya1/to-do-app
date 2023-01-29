<template>
    <Nav />
    <div class="container py-5 px-4">
        <div v-if="errorMsg || statusMsg" class="rounded-xl shadow-lg py-10 text-center">
            <p class=" text-red-500">{{ errorMsg }}</p>
            <p class=" text-ikea-blue">{{ statusMsg }}</p>
        </div>
        <h1 class="text-2xl uppercase font-medium mt-8 mb-3">Create</h1>
        <hr class="solid mb-6">
        <form @submit.prevent="createTask">
            <div class="flex gap-x-6 gap-y-2">
                <div class="flex flex-col flex-1 items-start">
                    <label for="done" class="font-medium text-ikea-blue">Done</label>
                    <input type="checkbox" class="scale-150 mt-2 ml-1" @click="checked">
                </div>
                <div class="flex flex-col w-3/4">
                    <label for="task" class="font-medium text-ikea-blue">Task</label>
                    <input type="text" class="border-solid border border-gray-200 rounded-lg px-2 " v-model="task" required>
                </div>
                <div class="flex flex-col flex-1">
                    <label for="date" class="font-medium text-ikea-blue">Date</label>
                    <input type="date" class="border-solid border border-gray-200 rounded-lg px-2" v-model="date" required>
                </div>
            </div>
            <Button>
                <button type="submit">Create Task</button>
            </Button>
        </form>
    </div>
</template>

<script setup>
import Nav from '../components/Nav.vue';
import { ref } from 'vue';
import { supabase } from '../supabase';
import Button from '../components/Button.vue';

const errorMsg = ref(null);
const statusMsg = ref(null);
const task = ref("");
const date = ref("");
const done = ref(false);
const user_id = supabase.auth.user()["id"];

function checked () {
    done.value = !done.value;
}

const createTask = async () => {
    try {
        const {data, error} = await supabase.from('tasks').insert([{
            user_id: user_id,
            title: task.value,
            is_complete: done.value,
            due_date: date.value,
        }]
        )
        if(error) throw error;
        statusMsg.value = "Succes: Task created!"
        task.value = null;
        date.value = null;
        setTimeout(() => {
            statusMsg.value = null
        }, 5000);
    }
    catch(error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);
    }
};

</script>

<style scoped>

</style>