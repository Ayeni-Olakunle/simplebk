<template>
  <div>
    <div class="holdHead">
      <img src="../../assets/simplebkslogo.png" alt="logo" class="image" />
      <button class="settingButin" @click="modalToggle2">Settings</button>
    </div>
    <div class="holdItem">
      <h1>Order List</h1>
      <div v-for="(item, index) in dataArray" :key="index" class="itemContent">
        <div class="item">
          <h4>{{ item.product_category }}</h4>
          <p>₦{{ item.price }}</p>
        </div>
        <div>
          <button class="edit" @click="modalToggle(item.id)">Edit</button>
          <button class="edit" @click="modalDetails(item.id)">Details</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isActive3">
    <div class="modal">
      <div class="modalWhite">
        <div class="textDetail">
          <h5 class="modal-title">Product Details</h5>
          <button type="button" class="close" @click="modalDetails">X</button>
        </div>
        <div class="modal-body">
          <Form @submit.prevent="handleEdit">
            <div class="holdEmail">
              <label for="emailAdd">Order Item ID</label><br />
              <input
                type="text"
                name="emailAdd"
                class="emailInput"
                v-model="order_item_id"
                disabled
              />
            </div>
            <div class="holdEmail">
              <label for="emailAdd">Seller ID</label><br />
              <input
                type="text"
                name="emailAdd"
                class="emailInput"
                v-model="seller_id"
                disabled
              />
            </div>
            <div class="holdEmail">
              <label for="emailAdd">Shipping Limit Date</label><br />
              <input
                type="text"
                name="emailAdd"
                class="emailInput"
                v-model="shipping_limit_date"
                disabled
              />
            </div>
            <div class="holdEmail">
              <label for="emailAdd">Price</label><br />
              <input
                type="text"
                name="emailAdd"
                class="emailInput"
                v-model="price"
                disabled
              />
            </div>
            <div class="holdEmail">
              <label for="emailAdd">Freight Value</label><br />
              <input
                type="text"
                name="emailAdd"
                class="emailInput"
                v-model="freight_value"
                disabled
              />
            </div>
          </Form>
          <p class="err">{{ errorMsg }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isActive">
    <div class="modal">
      <div class="modalWhite">
        <div class="textDetail">
          <h5 class="modal-title">Edit Details</h5>
          <button type="button" class="close" @click="modalToggle">X</button>
        </div>
        <div class="modal-body">
          <Form @submit.prevent="handleEdit">
            <div class="holdEmail">
              <label for="emailAdd">Freight Value</label><br />
              <input
                type="number"
                name="emailAdd"
                placeholder="Freight Value"
                class="emailInput"
                v-model="Freight_Values"
                required
              />
            </div>

            <div class="holdEmail">
              <label>Price</label><br />
              <input
                type="number"
                placeholder="Price"
                for="emailAdd"
                class="emailInput"
                v-model="Prices"
                required
              />
            </div>

            <div class="holdEmail">
              <label>Shipping Limit Date</label><br />
              <input
                type="date"
                placeholder="Shipping Limit Date"
                for="emailAdd"
                class="emailInput"
                v-model="Shipping_Limit_Dates"
                required
              />
            </div>
            <Button type="submit" class="submitButin"> Submit </Button>
          </Form>
          <p class="err">{{ errorMsg }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isActive2">
    <div class="modal">
      <div class="modalWhite">
        <div class="textDetail">
          <h5 class="modal-title">Sellers Location</h5>
          <button type="button" class="close" @click="modalToggle2">X</button>
        </div>
        <div class="modal-body">
          <Form @submit.prevent="handleLocation">
            <div class="holdEmail">
              <label for="emailAdd">Seller City</label><br />
              <input
                type="text"
                name="emailAdd"
                placeholder="Seller City"
                class="emailInput"
                v-model="sellerCity"
                required
              />
            </div>

            <div class="holdEmail">
              <label>Seller State</label><br />
              <input
                type="text"
                placeholder="sellerState"
                for="emailAdd"
                class="emailInput"
                v-model="sellerState"
                required
              />
            </div>
            <Button type="submit" class="submitButin"> Submit </Button>
          </Form>
          <p class="err">{{ errorMsg2 }}</p>
        </div>
      </div>
    </div>
  </div>

  <p v-if="loading"><loading /></p>
</template>

<script>
import axios from "axios";
import loading from "@/components/loading/loading";
export default {
  name: "list_of_items",
  data() {
    return {
      loading: false,
      errorMsg: "",
      errorMsg2: "",
      isActive: false,
      isActive2: false,
      isActive3: false,
      indexId: "",
      Freight_Values: "",
      Prices: "",
      Shipping_Limit_Dates: "",
      sellerCity: "",
      sellerState: "",
      order_id: "",
      order_item_id: "",
      product_id: "",
      seller_id: "",
      shipping_limit_date: "",
      price: "",
      freight_value: "",
      dataArray: [],
    };
  },
  components: {
    loading,
  },
  methods: {
    modalToggle(index) {
      this.indexId = index;
      this.isActive = !this.isActive;
    },
    modalDetails(index) {
      this.indexId = index;
      this.isActive3 = !this.isActive3;
      axios
        .get(
          `https://simplebks-api.herokuapp.com/api/v1/order_items/${this.indexId}`,
          {
            headers: {
              "content-type": "text/json",
              Authorization:
                "Basic " +
                btoa(
                  unescape(
                    encodeURIComponent(
                      "3442f8959a84dea7ee197c632cb2df15" + ":" + "13023"
                    )
                  )
                ),
            },
          }
        )
        .then((response) => {
          this.freight_value = response.data.freight_value;
          this.shipping_limit_date = response.data.shipping_limit_date;
          this.price = response.data.price;
          this.seller_id = response.data.seller_id;
          this.order_item_id = response.data.order_item_id;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    modalToggle2() {
      this.isActive2 = !this.isActive2;
    },
    handleEdit() {
      this.loading = true;
      this.isActive = false;
      const options = {
        url: `https://simplebks-api.herokuapp.com/api/v1/order_items/${this.indexId}`,
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization:
            "Basic " +
            btoa(
              unescape(
                encodeURIComponent(
                  "3442f8959a84dea7ee197c632cb2df15" + ":" + "13023"
                )
              )
            ),
        },
        data: {
          shipping_limit_date: this.Shipping_Limit_Dates,
          price: this.Prices,
          freight_value: this.Freight_Values,
        },
      };
      axios(options)
        .then((response) => {
          this.loading = false;
          this.errorMsg = "";
          alert("Order updated successfully");
          console.log(response);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.loading = false;
          this.isActive = true;
          this.errorMsg = error.message;
          console.error("There was an error!", error);
        });
      this.Shipping_Limit_Dates = "";
      this.Prices = "";
      this.Freight_Values = "";
    },
    handleLocation() {
      this.loading = true;
      this.isActive2 = false;
      const options = {
        url: "https://simplebks-api.herokuapp.com/api/auth/account",
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization:
            "Basic " +
            btoa(
              unescape(
                encodeURIComponent(
                  "3442f8959a84dea7ee197c632cb2df15" + ":" + "13023"
                )
              )
            ),
        },
        data: {
          seller_city: this.sellerCity,
          seller_state: this.sellerState,
        },
      };

      axios(options)
        .then((response) => {
          this.loading = false;
          this.errorMsg2 = "";
          alert("Location updated successfully");
          console.log(response);
          this.sellerCity = "";
          this.sellerState = "";
        })
        .catch((error) => {
          this.loading = false;
          this.isActive2 = true;
          this.errorMsg2 = error.message;
          console.error("There was an error!", error);
        });
    },
  },
  mounted() {
    axios
      .get(
        "https://simplebks-api.herokuapp.com/api/v1/order_items?limit=10&sort=price",
        {
          headers: {
            "content-type": "text/json",
            Authorization:
              "Basic " +
              btoa(
                unescape(
                  encodeURIComponent(
                    "3442f8959a84dea7ee197c632cb2df15" + ":" + "13023"
                  )
                )
              ),
          },
        }
      )
      .then((response) => {
        this.dataArray = response.data.data;
        console.log(response.data.data);
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
  },
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
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
  margin-top: 18px;
}
.close {
  border: none;
  background-color: white;
  font-size: 20px;
}
.textDetail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #d0d0d0;
}

h5 {
  font-size: 20px;
  font-weight: bolder;
}
.modalWhite {
  width: 30%;
  background-color: white;
  height: auto;
  border-radius: 5px;
}
.modal {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.345);
  display: flex;
  justify-content: center;
  align-items: center;
}
.holdHead {
  border-bottom: 1px solid #d2d2d2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.image {
  width: 160px;
  margin: 0 20px;
}

.settingButin {
  padding: 10px 25px;
  background-color: orange;
  border: none;
  color: #fff;
  font-size: 15px;
  border-radius: 5px;
  margin: 10px 30px;
}

.holdItem {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: left;
}

.itemContent {
  width: 40%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid gray;
  padding: 10px 25px;
  border-radius: 5px;
  margin: 10px 0;
  text-align: left;
}

h1 {
  text-align: left;
  width: 40%;
  font-size: 22px;
}

h4 {
  font-size: 20px;
  margin: 0;
}

.item {
  text-align: left;
}

p {
  font-size: 17px;
  color: orange;
  font-weight: bolder;
  margin: 7px 0;
}

.edit {
  padding: 6px 20px;
  border: none;
  background-color: #1565c0;
  color: #fff;
  font-size: 13px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
