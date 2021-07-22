<template>
    <div>
        <h3>Payment</h3>
        <form novalidate @submit.prevent="onSave">
            <div class="row">

                <div class="col-md-6">
                    <div>
                        <strong>Shipping information</strong>
                    </div>
                    <AddressView
                        :address="payment.shipping"
                    >
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                class="form-control"
                                placeholder="Your name"
                                v-model="payment.shipping.fullName"
                            />
                        </div>

                        <div class="form-group">
                            <label for="company">Company name</label>
                            <input
                                id="company"
                                type="text"
                                class="form-control"
                                placeholder="Company name"
                                v-model="payment.shipping.company"
                            />
                        </div>
                    </AddressView>

                    <div class="form-group">
                        <input
                            type="submit"
                            value="Next"
                            class="btn btn-success"
                        />
                    </div>
                </div>

                <div class="col-md-6">
                    <div>
                        <strong>Billing information</strong>
                    </div>
                    <AddressView
                        :address="payment.billing"
                        :isDisabled="payment.billing.sameAsShipping"
                    >
                        <div class="form-check">
                            <input
                                id="sameAsShipping"
                                type="checkbox"
                                class="form-check-input"
                                v-model="payment.billing.sameAsShipping"
                            />
                            <label for="sameAsShipping" class="form-check-label">Same as shipping?</label>
                        </div>
                    </AddressView>
                    <div>
                        <strong>Credit card information</strong>
                    </div>
                    <div class="form-group">
                        <label for="ccNumber">Credit card number</label>
                        <input
                            id="ccNumber"
                            type="text"
                            class="form-control"
                            v-model="payment.creditCard.number"
                        />
                    </div>
                    <div class="form-group">
                        <label for="nameOnCard">Name on card</label>
                        <input
                            id="nameOnCard"
                            type="text"
                            class="form-control"
                            v-model="payment.creditCard.nameOnCard"
                        />
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="expirationMonth">Expiration month</label>
                            <select
                                id="expirationMonth"
                                class="form-control"
                                v-model="payment.creditCard.expirationMonth"
                            >
                                <option
                                    v-for="m in months"
                                    :key="m.number"
                                    :value="m.number"
                                >
                                    {{ m.name }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="expirationYear">Expiration year</label>
                            <select
                                id="expirationYear"
                                class="form-control"
                                v-model="payment.creditCard.expirationYear"
                            >
                                <option
                                    v-for="year in years"
                                    :key="year"
                                    :value="year"
                                >
                                    {{ year }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="cvv">CVV code</label>
                            <input
                                id="cvv"
                                class="form-control"
                                v-model="payment.creditCard.cvv"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <div>
          <pre>
              {{ payment }}
          </pre>
        </div>
    </div>
</template>
<script>
import {ref, computed, watch, reactive} from "vue";
import states from "@/lookup/states";
import formatters from "@/formatters";
import months from "@/lookup/months";
import AddressView from "./AddressView";
import state from "@/state";

export default {
    components: {
        AddressView
    },

    emits: [
        "onError"
    ],

    setup(props, { emit }) {
        const payment = reactive(state);

        const zipcode = computed({
            get: () => payment.postalCode,
            set: (val) => {
                if (val && typeof val === "string") {
                    if (val.length <= 5 || val.indexOf("-") > -1) {
                        payment.postalCode = val;
                    } else {
                        payment.postalCode = `${val.substring(0,5)}-${val.substring(5)}`;
                    }
                }
            }
        });

        const years = Array.from({length: 10}, (_, i) => i + 2020);

        function onSave() {
            state.errorMessage.value = "We cannot save yet, we don`t have an API";
        }

        watch(
            () => payment.billing.sameAsShipping,
            () => {
                if (payment.billing.sameAsShipping.value) {
                    payment.clear();
                }
            }
        );

        return {
            payment,
            states,
            onSave,
            ...formatters,
            zipcode,
            months,
            years
        };
    }
}
</script>
