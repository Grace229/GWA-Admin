<template>
    <div class="hidden">
        <v-app class="">
            <div class="text-center">
                <!-- <v-container> -->
                <v-row justify="center">
                    <v-col cols="8" class="">
                        <v-container class="max-width">
                            <v-pagination v-model="page" class="custom" :length="15" :total-visible="7"></v-pagination>
                        </v-container>
                    </v-col>
                </v-row>
                <!-- </v-container> -->
            </div>
        </v-app>
    </div>
</template>

<script setup>
// import 'vuetify/styles';

// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';
import { ref } from 'vue';
const page = ref(1);
</script>

<style lang="scss" scoped>
.custom {
    background-color: transparent;
}

.v-btn {
    color: red;
    background-color: orange;
}
</style>
