<template>
    <h1>vue-tel-input</h1>
    <div style="width: 500px; margin: 20px auto">
        <vue-tel-input v-model="vueTel.phone" v-bind="vueTel.props"></vue-tel-input>
    </div>
    <h1>vue-phone-number-input</h1>
    <div style="width: 500px; margin: 20px auto">
        <vue-phone-number-input v-model="vuePhone.phone" v-bind="vuePhone.props"></vue-phone-number-input>
    </div>
</template>

<script>
import { reactive } from 'vue'

export default {
    setup() {
        const vueTel = reactive({
            phone: '',
            // props: {
            //     preferredCountries: ['US', 'GB'],
            //     placeholder: 'Enter your phone',
            //     mode: 'international',
            //     inputOptions: {
            //         showDialCode: true,
            //     },
            //     disabledFormatting: false,
            //     wrapperClasses: 'country-phone-input',
            // },
        })

        const vuePhone = reactive({
            phone: '',
            props: {
                // clearable: true,
                // fetchCountry: true,
                // preferredCountries: ['US', 'GB'],
                // noExample: false,
                // translations: {
                //     countrySelectorLabel: 'Country code',
                //     countrySelectorError: 'Error',
                //     phoneNumberLabel: 'Enter your phone',
                //     example: 'Example:',
                // },
            },
        })

        return {
            vueTel,
            vuePhone,
        }
    },
}
</script>

<style lang="scss" scoped>
.country-phone-input .dropdown:focus {
    outline: none;
    color: grey;
}
</style>
