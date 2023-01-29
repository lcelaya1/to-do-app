<template>
    <Nav />
    <div class="container py-5 px-4">
        <div v-if="errorMsg" class="rounded-xl shadow-lg py-10 text-center">
            <p class=" text-red-500">{{ errorMsg }}</p>
        </div>
        <h1 class="text-2xl uppercase font-medium mt-8 mb-3">To do</h1>
        <hr class="solid mb-6">
        <table class="w-full">
            <thead>
                <tr>
                    <th class="text-start font-medium text-ikea-blue w-1/12">Done</th>
                    <th class="text-start font-medium text-ikea-blue w-7/12">Task</th>
                    <th class="text-start font-medium text-ikea-blue w-2/12">Due date</th>
                    <th class="w-2/12"></th>
                </tr>
            </thead>
            <tbody v-for="data in data">
                <tr>
                    <td class="text-start w-1/12">
                        <input type="checkbox" name="checked-box" id="checked-box" class="scale-150 ml-1 mt-1" v-model="data.is_complete" @click="checkDone(data.is_complete, data.id)">
                    </td>
                    <td class="w-7/12">
                        <input v-if="edit" type="text" class="border-solid border border-slate-400 rounded-xl w-11/12" v-model="data.title">
                        <h1 v-else>{{ data.title }}</h1>
                    </td>
                    <td class="w-2/12">
                        <input v-if="edit" type="date" class="border-solid border border-slate-400 rounded-xl w-11/12" v-model="data.due_date">
                        <h1 v-else>{{ data.due_date }}</h1>
                    </td>
                    <td class="w-2/12">
                        <Delete class="p-1" @click="editMode">
                            <i class="fa-solid fa-pencil"></i>
                        </Delete>
                        <Delete class="p-1" v-if="edit" @click="updateTask(data.title, data.due_date, data.id)">
                            <i class="fa-solid fa-check"></i>
                        </Delete>
                        <Delete v-else class="p-1" @click="deleteTask(data.id)">
                            <i class="fa-regular fa-trash-can"></i>
                        </Delete>
                    </td>
                </tr>
            </tbody>
        </table>
        <h1 class="text-2xl uppercase font-medium mt-8 mb-3">Done</h1>
        <hr class="solid mb-6">
        <table class="w-full">
            <thead>
                <tr>
                    <th class="text-start font-medium text-ikea-blue w-1/12">Done</th>
                    <th class="text-start font-medium text-ikea-blue w-7/12">Task</th>
                    <th class="text-start font-medium text-ikea-blue w-2/12">Due date</th>
                    <th class="w-2/12"></th>
                </tr>
            </thead>
            <tbody v-for="data in completeData">
                <tr>
                    <td class="text-start w-1/12">
                        <input type="checkbox" name="checked-box" id="checked-box" class="scale-150 ml-1 mt-1" v-model="data.is_complete" @click="checkDone(data.is_complete, data.id)">
                    </td>
                    <td class="w-7/12">{{ data.title }}</td>
                    <td class="w-2/12">{{ data.due_date }}</td>
                    <td class="w-2/12"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import Nav from '../components/Nav.vue';
import { ref } from 'vue';
import {supabase} from "../supabase";
import Delete from '../components/Delete.vue';

const errorMsg = ref("");
const data = ref("");
const user_id = supabase.auth.user()["id"];

const tasks = async () => {
    try {
        const { data: tasks, error } = await supabase.from('tasks').select('*').eq('is_complete', false);
        if(error) throw error;
        data.value = tasks;
    }
    catch(error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);
    }
};

tasks();

const edit = ref(null);

const editMode = () => {
    edit.value = !edit.value;
};

const deleteTask = async (task_id) => {
    try {
        const { data, error } = await supabase.from('tasks').delete().eq('id', task_id);
        tasks();
        if(error) throw error;
    }
    catch(error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);
    }
};

const updateTask = async (title_task, date_task, task_id) => {
    try {
        const { data, error } = await supabase.from('tasks').update({ 'title': title_task,  'due_date': date_task}).eq('id', task_id);
        if(error) throw error;
        edit.value = null
    }
    catch(error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);
    }
};


let completeData = ref([])

const completeTask = async (complete_status, task_id, task_data) => {
    try {
        const { data: tasks, error } = await supabase.from('tasks').select('*').eq('is_complete', true);
        if(error) throw error;
        completeData.value = tasks
    }
    catch(error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);
    }
};

completeTask();

const checkDone = async (complete_status, task_id) => {
    try {
        complete_status === true ? complete_status = false : complete_status = true;
        const { data, error } = await supabase.from('tasks').update({ 'is_complete': complete_status}).eq('id', task_id);
        tasks();
        completeTask();
        if(error) throw error;
    }
    catch(error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
            errorMsg.value = null
        }, 5000);
    }
}

</script>

<style scoped>

</style>