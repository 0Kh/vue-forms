import { reactive, ref } from "vue";
import BillingAddressModel from "../models/BillingAddressModel";
import ShippingAddressModel from "../models/ShippingAddressModel";
import CreditCardModel from "../models/CreditCardModel";

export default {
    billing: reactive(new BillingAddressModel()),
    shipping: reactive(new ShippingAddressModel()),
    creditCard: reactive(new CreditCardModel()),
    errorMessage: ref("")
};