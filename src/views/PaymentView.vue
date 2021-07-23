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
                            :disabled="creditCardModel.$invalid"
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
                            v-model="creditCardModel.number.$model"
                        />
                        <ValidationMessage :model="creditCardModel.number" />
                    </div>
                    <div class="form-group">
                        <label for="nameOnCard">Name on card</label>
                        <input
                            id="nameOnCard"
                            type="text"
                            class="form-control"
                            v-model="creditCardModel.nameOnCard.$model"
                        />
                        <ValidationMessage :model="creditCardModel.nameOnCard" />
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="expirationMonth">Expiration month</label>
                            <select
                                id="expirationMonth"
                                class="form-control"
                                v-model="creditCardModel.expirationMonth.$model"
                            >
                                <option
                                    v-for="m in months"
                                    :key="m.number"
                                    :value="m.number"
                                >
                                    {{ m.name }}
                                </option>
                            </select>
                            <ValidationMessage :model="creditCardModel.expirationMonth" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="expirationYear">Expiration year</label>
                            <select
                                id="expirationYear"
                                class="form-control"
                                v-model="creditCardModel.expirationYear.$model"
                            >
                                <option
                                    v-for="year in years"
                                    :key="year"
                                    :value="year"
                                >
                                    {{ year }}
                                </option>
                            </select>
                            <ValidationMessage :model="creditCardModel.expirationYear" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="cvv">CVV code</label>
                            <input
                                id="cvv"
                                class="form-control"
                                v-model="creditCardModel.cvv.$model"
                            />
                            <ValidationMessage :model="creditCardModel.cvv" />
                        </div>
                    </div>
<!--                    <div
                        class="text-danger"
                        v-if="creditCardModel.$invalid"
                    >
                        <ul>
                            <li
                                v-for="e in creditCardModel.$errors"
                                :key="e"
                            >
                                {{ `${e.$property}: ${e.$message}` }}
                            </li>
                        </ul>
                    </div>-->
                </div>
            </div>
        </form>

        <div>
            <pre>
                {{ payment }}
            </pre>
            <pre>
                {{ creditCardModel }}
            </pre>
        </div>
    </div>
</template>
<script>
import { ref, computed, watch, reactive} from "vue";
import states from "@/lookup/states";
import formatters from "@/formatters";
import months from "@/lookup/months";
import AddressView from "./AddressView";
import state from "@/state";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ValidationMessage from "../components/ValidationMessage";
import { creditcard } from "@/validators";

export default {
    components: {
        AddressView,
        ValidationMessage
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

        const rules = {
            number: { required, creditcard },
            nameOnCard: { required },
            expirationMonth: { required },
            expirationYear: { required },
            cvv: { required },
        };

        const creditCardModel = useVuelidate(rules, state.creditCard);

        async function onSave() {
            if (await creditCardModel.value.$validate()) {
                state.errorMessage.value = "We cannot save yet, we don`t have an API";
            }
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
            creditCardModel,
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
