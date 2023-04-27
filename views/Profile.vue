<template>
    <div class="profile-page">
        <section class="section section-skew">
            <div class="container pt-lg-md">
                <div v-show="alert_error" class="alert alert-danger" role="alert">
                    Appoitnment can not be deleted!
                </div>
                <div v-show="alert_success" class="alert alert-success" role="alert">
                    Appoitnment deleted!
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-8">
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
                        <!-- Appointment onfo info card-->
                        <card shadow class="card-profile" no-body>
                            <div class="px-4">
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
                                            <p>{{diagnostic}}</p>
                                        </div>
                                    </div>
                                    <h5>Medication</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>{{medication}}</p>
                                        </div>
                                    </div>
                                    <h5>Observations</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>{{observations}}</p>
                                        </div>
                                    </div>
                                    <base-button class="mb-3 mr-4" type="primary" @click="cancel_appointment">Cancel appoiment</base-button>
                                    <router-link to="/register" class="btn mb-3 btn-primary">
                                        Make appoiment
                                    </router-link>
                                </div>
                            </div>
                        </card>
                    </div>
                    <!-- List of appointments--> 
                    <div class="col-lg-4">
                        <card type="secondary" shadow
                            header-classes="bg-grey pb-5"
                            body-classes="px-lg-5 py-lg-5"
                            class="border-0">
                            <div>
                                <div class="text-left text-muted mb-4" >
                                    <h2>Appoinments</h2>
                                </div>
                                <div class="mb-3 mt-2" v-for="(app, index) in appointments" :key="index">
                                    <base-button @click="button_click(index)" style="width: 100%" class="btn-1" outline type="primary">
                                        <h6>{{app.date}}</h6>
                                        <h5 style="overflow: hidden">{{app.name_doc}}</h5>
                                        <h6 style="overflow: hidden">{{app.short_description}}</h6>
                                    </base-button>
                                </div>
                            </div>
                        </card>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: "Profile",
    async beforeMount() {
        if(localStorage.getItem('username') != "") {
            await axios.put("http://localhost:8082/user_appointment",{username: localStorage.getItem('username')}).then(
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
        }
    },
    data() {
        return {
            name: "Profile",
            appointments: {},
            short_description: "Welcome to the appointment manager",
            description: "Below you would see what the doctor recomends",
            diagnostic: "",
            observations: "",
            medication: "",
            remark: "",
            date: "",
            index: -1,
            alert_error: false,
            alert_success: false,

            user_id: '',
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            gender: '',
            address: '',
            age: '',
            phone_number: '',
            user_type: ''
        };
    },
    methods: {
        cancel_appointment: function() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            
            console.log(new Date(today))
            console.log(new Date(this.date))

            if(new Date(this.date) > new Date(today)) {
                axios.put("http://localhost:8082/delete_appointment", {id: this.appointments[this.index].id}).then(

                )
                this.appointments.splice(this.index,1)
                this.short_description = "Welcome to the appointment manager"
                this.description = "Below you would see what the doctor recomends"
                this.diagnostic = ""
                this.medication = ""
                this.observations = ""
                this.remark =  ""
                this.date = ""
                this.index = -1
                this.alert_error = false
                this.alert_success = true
            }
            else
            {
                this.alert_error = true
                this.alert_success = false
            }
        },

        button_click: function(index) {
            this.alert_error = false
            this.alert_success = false
            console.log(this.appointments[index].date)
            this.short_description = this.appointments[index].short_description;
            this.description = this.appointments[index].description;
            this.diagnostic = this.appointments[index].diagnostic;
            this.medication = this.appointments[index].medication;
            this.observations = this.appointments[index].observations;
            this.remark = this.appointments[index].remark;
            this.date = this.appointments[index].date;
            this.index = index;
        }
    }
};
</script>
<style>
</style>
