@extends('../layouts/default')

@section("title", "Reserved Data")


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
                        <table class="table table-striped" id="reservations-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Sport</th>
                                    <th>Gender</th>
                                    <th>Category</th>
                                    <th>Country</th>
                                    <th>Min Quota</th>
                                    <th>Max Quota</th>
                                    <th>Reserve Quota</th>
                                </tr>
                            </thead>

                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @push('scripts')
        <script>
            const reservations = @json($data)
        </script>
    @endpush

@endsection