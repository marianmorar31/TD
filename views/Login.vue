<template>
    <section class="section section-shaped section-lg my-0">
        
        <div class="container pt-lg-md">
            <div v-show="alert_error" class="alert alert-danger" role="alert">
                Login failed! Pease try again.
            </div>
            <div class="row justify-content-center">

                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-grey pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-left text-muted mb-4">
                                <h2>Pacient login</h2>
                            </div>
                            <div class="text-center text-muted mb-4">
                                <small>Credentials</small>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Usename"
                                            addon-left-icon="ni ni-user-run"
                                            v-model="username">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-model="password">
                                </base-input>
                                <div class="text-center" @click="login_user">
                                    <base-button type="primary" class="my-4" >Sign In</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>

                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="#bg-grey pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-left text-muted mb-4">
                                <h2>Doctor login</h2>
                            </div>
                            <div class="text-center text-muted mb-4">
                                <small>Credentials</small>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Name"
                                            addon-left-icon="ni ni-user-run"
                                            v-model="username_doc">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-model="password_doc">
                                </base-input>
                                <div class="text-center" @click="login_doc">
                                    <base-button type="primary" class="my-4">Sign In</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';

export default {
    name: "Login",
    beforeMount() {
        localStorage.setItem('username', "")
    },
    data() {
        return {
            name: "Login",
            username: "",
            password: "",
            username_doc: "",
            password_doc: "",
            login_status: false,
            alert_error: false,
        };
    },
    methods: {
        login_user: async function() {
            console.log('user login');
            console.log(this.username)
            await axios.put("http://localhost:8082/login", {username: this.username, password: this.password}).then(
                response => (this.login_status = response.data) 
            );

            console.log(this.login_status)

            if(this.login_status == "true") {
                this.$router.push("profile")
                localStorage.setItem('username', this.username)
            }
            else
                this.alert_error = true;
        },

        login_doc: async function() {
            console.log('doctor login');
            console.log(this.username_doc)
            await axios.put("http://localhost:8082/login_doctor", {username: this.username_doc, password: this.password_doc}).then(
                response => (this.login_status = response.data) 
            );

            console.log(this.login_status)

            if(this.login_status == "true") {
                this.$router.push("profile_doc")
                localStorage.setItem('username', this.username_doc)
            }
            else
                this.alert_error = true;
        }
}
};

</script>
<style>
</style>
