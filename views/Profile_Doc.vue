<template>
    <div class="profile-page">
        <section class="section section-skew">
            <div class="container pt-lg-md">
                <div class="col-lg">
                    <!-- Profile info card-->
                        <card shadow class="card-profile" no-body>
                            <div class="px-4">
                                <div class="text-left mt-3">
                                    <div class="row">
                                        <div class="col-lg-8 order-lg-1">
                                            <h3>{{first_name}} {{last_name}}, {{age}}</h3>
                                        </div>
                                    </div>
                                    <h5>Username</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>{{username}}</p>
                                        </div>
                                    </div>
                                    <h5>Address</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>{{address}}</p>
                                        </div>
                                    </div>
                                    <h5>Phone number</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>{{phone_number}}</p>
                                        </div>
                                    </div>
                                    <h5>Gender</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>{{gender}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </card>
                        <br>
                    <div v-show="alert_error" class="alert alert-danger" role="alert">
                        Diagnosis could not be saved!
                    </div>
                    <div v-show="alert_success" class="alert alert-success" role="alert">
                        Diagnosis saved!
                    </div>
                    <!--Appointments list-->
                    <div class="row justify-content-center mr-1">
                        <div class="col-lg-4 mt-5">
                            <card type="secondary" shadow
                                header-classes="bg-grey pb-5"
                                body-classes="px-lg-5 py-lg-5"
                                class="border-0">
                                <template>
                                    <div class="text-left text-muted mb-4" >
                                        <h2>Appoinments</h2>
                                    </div>
                                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                                        <flat-picker slot-scope="{focus, blur}"
                                                    @on-open="focus"
                                                    @on-close="blur"
                                                    @input="date_change"
                                                    :config="{allowInput: true}"
                                                    class="form-control datepicker"
                                                    v-model="dates.simple">
                                        </flat-picker>
                                    </base-input>
                                    <div :key="rerender">
                                        <div class="mb-3 mt-2" v-for="(app, index) in appointments" :key="index">
                                            <base-button @click="button_click(index)" style="width: 100%" class="btn-1" outline type="primary">
                                                <h6>{{app.date}}</h6>
                                                <h5 style="overflow: hidden">{{app.name_user}}</h5>
                                                <h6 style="overflow: hidden">{{app.short_description}}</h6>
                                            </base-button>
                                        </div>
                                    </div>
                                </template>
                            </card>
                        </div>
                        <!--Appointment details-->
                        <div class="col-lg-7 mt-5">
                            <card type="secondary" shadow
                                header-classes="bg-grey pb-5"
                                body-classes="px-lg-5 py-lg-5"
                                class="border-0">
                                <template>
                                    <div class="text-left text-muted mb-4" >
                                        <h2>Appoiment</h2>
                                    </div>
                                    <div class="mt-5">
                                        <h5>{{short_description}}</h5>
                                        <div class="row">
                                            <div class="col-lg">
                                                <p>{{description}}</p>
                                            </div>
                                        </div>
                                        <h5>Diagnostic</h5>
                                        <div class="row">
                                            <div class="col-lg">
                                                <textarea class="form-control form-control-alternative mb-3" 
                                                        rows="3" 
                                                        placeholder="Pacients diagnostic"
                                                        v-model="diagnostic">
                                                </textarea>
                                            </div>
                                        </div>
                                        <h5>Medication</h5>
                                        <div class="row">
                                            <div class="col-lg">
                                                <textarea class="form-control form-control-alternative mb-3" 
                                                        rows="3" 
                                                        placeholder="Medications needed"
                                                        v-model="medication">
                                                </textarea>
                                            </div>
                                        </div>
                                        <h5>Observations</h5>
                                        <div class="row">
                                            <div class="col-lg">
                                                <textarea class="form-control form-control-alternative mb-3" 
                                                        rows="4" 
                                                        placeholder="Remarks on the condition"
                                                        v-model="observations">
                                                </textarea>
                                            </div>
                                        </div>
                                        <base-button @click="add_diagnostic" class="mb-3" type="primary">Save</base-button>
                                    </div>
                                </template>
                            </card>
                        </div>
                    </div>
                </div>  
            </div>
        </section>
    </div>
</template>
<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from 'axios';

export default {
    components: {
        flatPicker
    },
    async beforeMount() {
        await axios.put("http://localhost:8082/doc_appointment",{username: localStorage.getItem('username'), date: this.dates.simple}).then(
            response => (this.appointments = response.data)
        ),
        await axios.put("http://localhost:8082/profile", {username: localStorage.getItem('username')}).then(
                response => (this.user_id = response.data.user_id,
                    this.username = response.data.username,
                    this.first_name = response.data.first_name,
                    this.gender = response.data.gender,
                    this.last_name = response.data.last_name,
                    this.address = response.data.address,
                    this.phone_number = response.data.phone_number,
                    this.age = response.data.age,
                    this.user_type = response.data.user_type) 
            );
    },
    data() {
        return {
            dates: {
                simple: "2022-07-17"
            },
            appointments: [],
            short_description: "Welcome to the appointment manager",
            description: "Below you can diagnoses and remarks",
            diagnostic: "",
            medication: "",
            observations: "",
            app_id: "",
            remark: "",
            date: "",
            index: -1,
            rerender: 0,
            oldDate: "",
            error_message: "",

            user_id: '',
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            gender: '',
            address: '',
            age: '',
            phone_number: '',
            user_type: '',
            specialisation: '',
            alert_error:false,
            alert_success:false
        };
    },
    methods: {
        button_click: function(index) {
            this.alert_success = false
            this.alert_error = false
            console.log(this.appointments[index].date)
            this.short_description = this.appointments[index].short_description;
            this.description = this.appointments[index].description;
            this.diagnostic = this.appointments[index].diagnostic;
            this.medication = this.appointments[index].medication;
            this.remark = this.appointments[index].remark;
            this.date = this.appointments[index].date;
            this.index = index;
            this.app_id = this.appointments[index].id;
            this.observations = this.appointments[index].observations;
        },

        date_change: async function() {
            console.log("    ")
            console.log("old " + this.oldDate)
            console.log("new " + this.dates.simple)
            if(new Date(this.oldDate).getTime() !== new Date(this.dates.simple).getTime())
            {
                console.log("endterd")
                this.oldDate = this.dates.simple
                await axios.put("http://localhost:8082/doc_appointment",{username: localStorage.getItem('username'), date: this.dates.simple}).then(
                    response => (this.appointments = response.data)
                )
                
                console.log(this.appointments)
                this.rerender += 1
            }

        },

        add_diagnostic: async function() {
            await axios.put("http://localhost:8082/doc_diagnostic",{id: this.app_id, diagnostic: this.diagnostic, medication: this.medication, observations: this.observations}).then(
                    response => (this.error_message = response.data)
                )
            if (this.error_message == "true"){
                this.alert_error = false;
                this.alert_success = true;
            }
            else{
                this.alert_error = true;
                this.alert_success = false;
            }
        }
    }
};
</script>
<style>
</style>
