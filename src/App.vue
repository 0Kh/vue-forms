<template>
    <div>
        <h3>Payment</h3>
        <div
            class="alert alert-danger"
            v-if="error"
        >
            {{ error }}
        </div>
        <form novalidate @submit.prevent="onSave">
            <div class="row">

                <div class="col-md-6">
                    <div>
                        <strong>Shipping information</strong>
                    </div>

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

                    <div class="form-group">
                        <label for="address1">Address</label>
                        <input
                            id="address1"
                            type="text"
                            class="form-control"
                            placeholder="Street Address"
                            v-model="payment.shipping.address1"
                        />
                    </div>

                    <div class="form-group">
                        <label for="address2">Suite/Apartment</label>
                        <input
                            id="address2"
                            type="text"
                            class="form-control"
                            placeholder=""
                            v-model="payment.shipping.address2"
                        />
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="cityTown">City</label>
                            <input
                                id="cityTown"
                                type="text"
                                class="form-control"
                                placeholder="e.g. New York"
                                v-model="payment.shipping.cityTown"
                            />
                        </div>

                        <div class="form-group col-md-3">
                            <label for="stateProvince">State</label>
                            <select
                                id="stateProvince"
                                class="form-control"
                                v-model="payment.shipping.stateProvince"
                            >
                                <option
                                    v-for="state in states"
                                    :key="state.abbreviation"
                                    :value="state.abbreviation"
                                >
                                    {{ stateFormat(state) }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group col-md-3">
                            <label for="postalCode">Zipcode</label>
                            <input
                                id="postalCode"
                                type="text"
                                class="form-control"
                                placeholder="e.g. 10101"
                                v-model="zipcode"
                            />
                        </div>

                        <div class="form-group">
                            <input
                                type="submit"
                                value="Next"
                                class="btn btn-success"
                            />
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div>
                        <strong>Billing information</strong>
                    </div>

                    <div class="form-check">
                        <input
                            id="sameAsShipping"
                            type="checkbox"
                            class="form-check-input"
                            v-model="payment.billing.sameAsShipping"
                        />
                        <label for="sameAsShipping" class="form-check-label">Same as shipping?</label>
                    </div>

                    <div class="form-group">
                        <label for="address1">Address</label>
                        <input
                            id="billingAddress1"
                            type="text"
                            class="form-control"
                            placeholder="Street Address"
                            v-model="payment.billing.address1"
                            :disabled="payment.billing.sameAsShipping"
                        />
                    </div>

                    <div class="form-group">
                        <label for="address2">Suite/Apartment</label>
                        <input
                            id="billingAddress2"
                            type="text"
                            class="form-control"
                            placeholder=""
                            v-model="payment.billing.address2"
                            :disabled="payment.billing.sameAsShipping"
                        />
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="cityTown">City</label>
                            <input
                                id="billingCityTown"
                                type="text"
                                class="form-control"
                                placeholder="e.g. New York"
                                v-model="payment.billing.cityTown"
                                :disabled="payment.billing.sameAsShipping"
                            />
                        </div>

                        <div class="form-group col-md-3">
                            <label for="stateProvince">State</label>
                            <select
                                id="billingStateProvince"
                                class="form-control"
                                v-model="payment.billing.stateProvince"
                                :disabled="payment.billing.sameAsShipping"
                            >
                                <option
                                    v-for="state in states"
                                    :key="state.abbreviation"
                                    :value="state.abbreviation"
                                >
                                    {{ stateFormat(state) }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group col-md-3">
                            <label for="postalCode">Zipcode</label>
                            <input
                                id="billingPostalCode"
                                type="text"
                                class="form-control"
                                placeholder="e.g. 10101"
                                v-model="zipcode"
                                :disabled="payment.billing.sameAsShipping"
                            />
                        </div>
                    </div>
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
                                    v-if="m in months"
                                    :key="m.number"
                                    :value="m.number"
                                >
                                    {{ m.name }}
                                </option>
                            </select>
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
import { ref, computed, watch } from "vue";
import states from "@/lookup/states";
import formatters from "@/formatters";
import months from "@/lookup/months";

export default {
    setup() {
        const payment = ref({
            shipping: {},
            billing: {
                sameAsShipping: false
            },
            creditCard: {}
        });

        const zipcode = computed({
            get: () => payment.value.postalCode,
            set: (val) => {
                if (val && typeof val === "string") {
                    if (val.length <= 5 || val.indexOf("-") > -1) {
                        payment.value.postalCode = val;
                    } else {
                        payment.value.postalCode = `${val.substring(0,5)}-${val.substring(5)}`;
                    }
                }
            }
        });

        const error = ref("");

        function onSave() {
            error.value = "We cannot save yet, we don`t have an API";
        }

        watch(
            () => payment.value.billing.sameAsShipping,
            () => {
                if (payment.value.billing.sameAsShipping) {
                    payment.value.billing.address1 = "";
                    payment.value.billing.address2 = "";
                    payment.value.billing.cityTown = "";
                    payment.value.billing.stateProvince = "";
                    payment.value.zipcode = "";
                }
            }
        );

        return {
            payment,
            states,
            onSave,
            ...formatters,
            zipcode,
            error,
            months,
        };
    }
}
</script>
