import AddressModel from "./AddressModel";
import { ref } from "vue";

export default class ShippingAddressModel extends AddressModel {
    fullName = ref("");
    company = ref("");
}