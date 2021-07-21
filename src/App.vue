<template>
  <div>
    <h3>Payment</h3>
    <form novalidate>
      <div class="row">
        <div class="col-md-6">
          <div><strong>Shipping information</strong></div>
          <div class="form-group">
            <label for="name">Name</label>
            <input id="name" type="text" class="form-control" placeholder="Your name">
          </div>
          <div class="form-group">
            <label for="company">Company name</label>
            <input id="company" type="text" class="form-control" placeholder="Company name">
          </div>

          <div class="form-group">
            <label for="address1">Address</label>
            <input id="address1" type="text" class="form-control" placeholder="Street Address">
          </div>
          <div class="form-group">
            <label for="address2">Suite/Apartment</label>
            <input id="address2" type="text" class="form-control" placeholder="">
          </div>
          <div class="form-row">
              <div class="form-group col-md-6">
                  <label for="cityTown">City</label>
                  <input id="cityTown" type="text" class="form-control" placeholder="e.g. New York">
              </div>
              <div class="form-group col-md-3">
                  <label for="stateProvince">Zipcode</label>
                  <select id="stateProvince" class="form-control">
                      <option value="">GA</option>
                      <option value="">CA</option>
                      <option value="">FL</option>
                      <option value="">AL</option>
                  </select>
              </div>
              <div class="form-group col-md-3">
                  <label for="postalCode">Zipcode</label>
                  <input id="postalCode" type="text" class="form-control" placeholder="e.g. 10101">
              </div>
              <div class="form-group">
                <input type="submit" value="Next" class="btn btn-success">
              </div>
          </div>
        </div>
      </div>

        <div class="col-md-6">
          <div><strong>Billing information</strong></div>
        </div>
    </form>
  </div>
</template>
