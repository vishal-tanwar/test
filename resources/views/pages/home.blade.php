@extends('../layouts/default')

@section("title", "Home")


@section('content')
    
    <div class="container py-4 my-4">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-content-center">
                        <h2>Set Quota for registration:</h2>
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

                                <div class="col">
                                    <button id="add-quota" type="button" class="btn btn-success" onclick="return addQuota()">+ Add Quota</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    

    <div class="modal fade" id="reserve-quota-modal" tabindex="-1" aria-labelledby="reserveQuota" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="reserveQuota">Add Quota</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <div class="modal-body">
                @csrf
                <div class="row mb-2">
                    <div class="col"><b>Min Quota:</b></div>
                    <div class="col">
                        <input type="text" class="form-control" name="min_quota">
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col"><b>Max Quota:</b></div>
                    <div class="col"><input type="text" class="form-control" name="max_quota"></div>
                </div>
                <div class="row mb-2">
                    <div class="col"><b>Reserve Quota:</b></div>
                    <div class="col"><input type="text" class="form-control" name="reserve_quota"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="add-reserved-quota" type="button" class="btn btn-primary">Save Quota</button>
            </div>
            </div>
        </div>
    </div>

    <!-- <template id="toast"> -->
        <div class="toast align-items-center position-absolute m-3 me-4 top-0 end-0" id="toast-quota" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body"></div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            </div>
    <!-- </template> -->

@endsection 