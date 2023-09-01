@extends('../layouts/default')

@section("title", "Reserve Quota")

@section("content")

    <div class="container py-4 my-4">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-content-center">
                        <h2>Reserve Quota:</h2>
                        <p class="alert alert-danger m-0" style="display:none;" id="add-quota-error"></p>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('quota.reserve') }}">
                            <div class="row">
                                <div class="col">
                                    <select id="sports" class="form-select" onchange="return updateCategories()">
                                        <option value="" selected>Select Sport</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <select id="sports-gender" class="form-select" onchange="return updateCategories()">
                                        <option selected value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <select class="form-select" id="sports-categories" >
                                        <option value="" selected>Select Category</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col">
                                    <textarea id="sports-states" rows="3" cols="50" class="form-control" placeholder="Enter states seprated with | eg: Maharashtra | Haryana | Gujarat"></textarea>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col text-end">
                                    <button type="button" class="btn btn-primary" id="generate-country">Generate</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-10">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-content-center">
                        <h2>State List:</h2>
                    </div>

                    <div class="card-body">
                        <table class="table table-responsive table-striped" id="country-table">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Country</th>
                                    <th>Sport</th>
                                    <th>Category</th>
                                    <th>Min</th>
                                    <th>Max</th>
                                    <th>Reserve</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection