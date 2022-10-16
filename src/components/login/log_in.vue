<template>
  <div class="holdAll">
    <div class="holdSecond">
      <div class="holdLogo">
        <img src="../../assets/simplebkslogo.png" alt="logo" class="logo" />
      </div>
      <div class="holdSignin">
        <h2>Sign in to continue to your account</h2>
      </div>
      <div>
        <Form @submit.prevent="handleSubmit">
          <div class="holdEmail">
            <label for="emailAdd">Username</label><br />
            <input
              type="text"
              name="emailAdd"
              placeholder="Enter email"
              class="emailInput"
              v-model="userName"
              required
            />
          </div>

          <div class="holdEmail">
            <label>Password</label><br />
            <input
              type="password"
              placeholder="Password"
              for="emailAdd"
              class="emailInput"
              v-model="password"
              required
            />
          </div>
          <Button type="submit" class="submitButin"> Submit </Button>
        </Form>
        <p class="err" v-if="errorMsg">Incorrect username or password</p>
      </div>
    </div>
  </div>
  <p v-if="loading"><loading /></p>
</template>

<script>
import loading from "@/components/loading/loading";
import axios from "axios";
export default {
  name: "log_in",
  components: {
    loading,
  },
  data() {
    return {
      loading: false,
      errorMsg: false,
      userName: "",
      password: "",
    };
  },

  methods: {
    handleSubmit() {
      this.loading = true;
      this.errorMsg = false;
      const loginDetails = {
        username: this.userName,
        password: this.password,
      };
      console.log(loginDetails);
      axios
        .post(
          "https://simplebks-api.herokuapp.com/api/auth/login",
          loginDetails
        )
        .then((response) => {
          this.loading = false;
          sessionStorage.setItem("username", this.userName);
          sessionStorage.setItem("password", this.password);
          this.$router.push("/order-items");
          console.log(response);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.loading = false;
          this.errorMsg = true;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

<style scoped>
.holdAll {
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.holdLogo {
  text-align: center;
}

.logo {
  height: 5em;
}

.emailInput {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: 1.5px solid #c4c4c4;
  margin-top: 10px;
  font-size: 15px;
}

.holdEmail {
  text-align: left;
  margin-top: 1em;
}

.holdSignin {
  text-align: center;
}
h2 {
  font-size: 15px;
  margin: 1em;
}
.holdSecond {
  width: 33%;
  box-shadow: 5px 5px 5px #ebebeb, -5px -5px 5px #ebebeb;
  padding: 2em;
  border-radius: 3em;
}

.submitButin {
  margin: 2em 0px 24px 0px;
  width: 100%;
  padding: 13px 0;
  background-color: orange;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submitButin:hover {
  background-color: rgb(255, 181, 43);
}

.err {
  color: red;
}
</style>
