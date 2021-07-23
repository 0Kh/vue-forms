<template>
    <div class="border rounded p-2">
        <slot />
        <div class="form-group">
            <label for="address1">Address</label>
            <input
                id="address1"
                type="text"
                class="form-control"
                placeholder="Street Address"
                v-model="model.address1.$model"
                :disabled="isDisabled"
            />
            <ValidationMessage :model="model.address1" />
        </div>

        <div class="form-group">
            <label for="address2">Suite/Apartment</label>
            <input
                id="address2"
                type="text"
                class="form-control"
                placeholder=""
                v-model="model.address2.$model"
                :disabled="isDisabled"
            />
            <ValidationMessage :model="model.address2" />
        </div>

        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="cityTown">City</label>
                <input
                    id="cityTown"
                    type="text"
                    class="form-control"
                    placeholder="e.g. New York"
                    v-model="model.cityTown.$model"
                    :disabled="isDisabled"
                />
                <ValidationMessage :model="model.cityTown" />
            </div>

            <div class="form-group col-md-3">
                <label for="stateProvince">State</label>
                <select
                    id="stateProvince"
                    class="form-control"
                    v-model="model.stateProvince.$model"
                    :disabled="isDisabled"
                >
                    <option
                        v-for="state in states"
                        :key="state.abbreviation"
                        :value="state.abbreviation"
                    >
                        {{ stateFormat(state) }}
                    </option>
                </select>
                <ValidationMessage :model="model.stateProvince" />
            </div>

            <div class="form-group col-md-3">
                <label for="postalCode">Zipcode</label>
                <input
                    id="postalCode"
                    type="text"
                    class="form-control"
                    placeholder="e.g. 10101"
                    v-model="model.postalCode.$model"
                    :disabled="isDisabled"
                />
                <ValidationMessage :model="model.postalCode" />
            </div>
        </div>
    </div>
</template>

<script>
import states from "@/lookup/states";
import formatters from "@/formatters";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import ValidationMessage from "@/components/ValidationMessage";

export default {
    name: "AddressView",
    components: {
        ValidationMessage
    },
    props: {
        address: {
            type: Object
        },
        isDisabled: {
            type: Boolean,
        }
    },
    setup(props) {
        const rules = {
            address1: { required, minLength: minLength(5) },
            address2: { },
            cityTown: { required, minLength: minLength(2) },
            stateProvince: { required },
            postalCode: { required, minLength: minLength(5)}
        };

        const model = useVuelidate(rules, props.address);

        return {
            states,
            ...formatters,
            model
        }
    }
}
</script>
