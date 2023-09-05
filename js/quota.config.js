"use strict";

const Quota = {
    archery: {
        "name": "Archery",
        "categories": {
            "male": {
                archery_1: "Archery 1",
                archery_2: "Archery 2",
                archery_3: "Archery 3",
            },
            "female": {
                archery_4: "Archery 4",
                archery_5: "Archery 5",
                archery_6: "Archery 6",
            },
        }
    },
    badminton: {
        "name": "Badminton",
        "categories": {
            "male": {
                badminton_1: "Badminton 1",
                badminton_2: "Badminton 2",
                badminton_3: "Badminton 3",
            },
            "female": {
                badminton_4: "Badminton 4",
                badminton_5: "Badminton 5",
                badminton_6: "Badminton 6",
            },
        }
    },
    football: {
        "name": "Football",
        "categories": {
            "male": {
                football_1: "Football 1",
                football_2: "Football 2",
                football_3: "Football 3",
            },
            "female": {
                football_4: "Football 4",
                football_5: "Football 5",
                football_6: "Football 6",
            },
        }
    }
}


window.Ajax = {
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.head.querySelector("[name='X-CSRF-Token']").content
    },
    get: function (url = "", data = {}) {
        const urlParams = new URLSearchParams(data);

        if (urlParams.size > 0) {
            url += `?${urlParams.toString()}`;
        }
        const response = fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: this.headers,
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        return response.then(res => res.json());
    },
    post: function (url = "", data = {}) {
        const response = fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "default",
            headers: this.headers,
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        return response.then(res => res.json());
    },
}




document.onreadystatechange = function () {
    if (document.readyState == "complete") {

        

        // Create Sports Dropdown
        const sports = document.querySelector("#sports");
        if (sports){

            let sportsList = Object.keys(Quota).map(s => {
                const option = document.createElement("option");
                
                option.value = s;
                option.text = Quota[s].name
                return option;
            });
            // Append List
            sports.append(...sportsList);
        }

        // Create Catgories on change sport and gender

        window.updateCategories = function () {
            const sports = document.querySelector("#sports").value;
            const gender = document.querySelector("#sports-gender").value;
            const catElem = document.querySelector("#sports-categories");


            if (sports && gender) {

                let categories = Quota[sports].categories[gender];

                let categoryList = Object.keys(categories).map(c => {
                    const option = document.createElement("option");

                    option.value = c;
                    option.text = categories[c]
                    return option;
                });

                if (catElem.childElementCount > 1) {

                    let prevNodes = Array.from(catElem.children).slice(1);

                    prevNodes.forEach((el) => {
                        el.remove();
                    })
                }

                catElem.append(...categoryList);
            }

            else {
                if (catElem.childElementCount > 1) {

                    let prevNodes = Array.from(catElem.children).slice(1);

                    prevNodes.forEach((el) => {
                        el.remove();
                    })
                }
            }
        }

        window.addQuota = function () {

            const sports = document.querySelector("#sports");
            const gender = document.querySelector("#sports-gender");
            const categories = document.querySelector("#sports-categories");
            const addQuotaErr = document.querySelector("#add-quota-error");

            if (!sports.value) {
                addQuotaErr.innerText = "Choose at least one sport!";
                Object.assign(addQuotaErr.style, {
                    display: "block"
                });
                return false;
            }
            else if (!gender.value) {
                addQuotaErr.innerText = "Choose gender!";
                Object.assign(addQuotaErr.style, {
                    display: "bloxk"
                });
                return false;
            }
            else if (!categories.value) {
                addQuotaErr.innerText = "Choose at least one Category";
                Object.assign(addQuotaErr.style, {
                    display: "block"
                });
                return false;
            }

            else {
                Object.assign(addQuotaErr.style, {
                    display: "none"
                });

                const quotaModal = new bootstrap.Modal(document.querySelector('#reserve-quota-modal'));
                quotaModal.show();
            }
        }

        if (document.querySelector("#add-reserved-quota")) {


            document.querySelector("#add-reserved-quota").addEventListener('click', function () {
                const sport = document.querySelector("#sports").value;
                const gender = document.querySelector("#sports-gender").value;
                const category = document.querySelector("#sports-categories").value;
                const min_quota = document.querySelector('[name="min_quota"]').value;
                const max_quota = document.querySelector('[name="max_quota"]').value;
                const reserve_quota = document.querySelector('[name="reserve_quota"]').value;

                const toast = document.querySelector("#toast-quota");

                Ajax.post('/', {
                    sport, gender, category, max_quota, min_quota, reserve_quota
                }).then(res => {
                    if (res.success === true) {
                        toast.querySelector(".toast-body").innerHTML = `<p class="m-0 text-success">${res.message}</p>`;
                        setTimeout(() => {
                            location.reload();
                        }, 3000);
                    }
                    else {

                        let errorsHtml = Object.values(res.errors).map(item => {
                            return `<p class="m-0 text-danger">${item[0]}</p>`
                        }).join("");

                        toast.querySelector(".toast-body").innerHTML = errorsHtml;
                    }
                    Object.assign(toast.style, { zIndex: 1050 });
                    (new bootstrap.Toast(toast, {
                        delay: 3000
                    })).show();
                });

            });

        }
        if (document.querySelector("#generate-country")) {
            document.querySelector("#generate-country").addEventListener("click", function (e) {
                e.preventDefault();

                const sports = document.querySelector("#sports");
                const gender = document.querySelector("#sports-gender");
                const categories = document.querySelector("#sports-categories");
                const coutries = document.querySelector("#sports-states");
                const addQuotaErr = document.querySelector("#add-quota-error");

                if (!sports.value) {
                    addQuotaErr.innerText = "Choose at least one sport!";
                    Object.assign(addQuotaErr.style, {
                        display: "block"
                    });
                    return false;
                }
                else if (!gender.value) {
                    addQuotaErr.innerText = "Choose gender!";
                    Object.assign(addQuotaErr.style, {
                        display: "bloxk"
                    });
                    return false;
                }
                else if (!categories.value) {
                    addQuotaErr.innerText = "Choose at least one Category";
                    Object.assign(addQuotaErr.style, {
                        display: "block"
                    });
                    return false;
                }
                else if (!coutries.value) {
                    addQuotaErr.innerText = "Country cannot be empty";
                    Object.assign(addQuotaErr.style, {
                        display: "block"
                    });
                    return false;
                }

                else {
                    Object.assign(addQuotaErr.style, {
                        display: "none"
                    });

                    Ajax.get("get-quota", { sport: sports.value, gender: gender.value, category: categories.value })
                        .then(res => {
                            if (res && Object.keys(res.data).length > 0) {

                                document.querySelector('#country-table').setAttribute('data-min', res.data.min_quota)
                                document.querySelector('#country-table').setAttribute('data-max', res.data.max_quota)
                                document.querySelector('#country-table').setAttribute('data-reserve', res.data.reserve_quota)
                                document.querySelector('#country-table').setAttribute('data-id', res.data.id)

                                let countriesList = coutries.value.split("|").map(c => c.trim());

                                const trNodes = [];
                                countriesList.forEach((item, i) => {
                                    const tr = document.createElement("tr");
                                    tr.setAttribute('data-country', item);
                                    tr.innerHTML = `
                                        <td>${++i}</td>
                                        <td>${item}</td>
                                        <td>${Quota[sports.value].name}</td>
                                        <td>${Quota[sports.value].categories[gender.value][categories.value]}</td>
                                        <td><input type="text" class="form-control" name="min_quota" onkeyup="return validateMin(event)" onkeypress="return onlyNumberKey(event)"/></td>
                                        <td><input type="text" class="form-control" name="max_quota" onkeyup="return validateMax(event)" onkeypress="return onlyNumberKey(event)"/></td>
                                        <td><input type="text" class="form-control" name="reserve_quota" onkeyup="return validateReserve(event)" onkeypress="return onlyNumberKey(event)"/></td>
                                    `;
                                    trNodes.push(tr);
                                });
                                document.querySelector('#country-table tbody').innerHTML = '';
                                document.querySelector('#country-table tbody').append(...trNodes);
                            }
                            else{
                                const toast = document.querySelector("#toast-quota");
                                toast.querySelector(".toast-body").innerHTML = "<p class='m-0 text-danger'>Sorry! No data found with selected sports match</p>";

                                Object.assign(toast.style, { zIndex: 1050 });
                                (new bootstrap.Toast(toast, {
                                    delay: 3000
                                })).show();
                            }
                        });
                }
            });
        }

        window.validateMin = function(e){
            const total = parseInt(e.target.closest("#country-table").getAttribute("data-min"));

            let min_inputs = Array.from( document.querySelectorAll("[name='min_quota']"));
            let enterVal = parseInt(e.target.value);

            min_inputs = min_inputs.filter( el => el != e.target );

            let input_sum = min_inputs.reduce( (p, c) => {
                let val = parseInt(c.value);
                if (val){

                    return p + val;
                }
                return p;
            }, 0)

            let remain = total - input_sum;;

            if (enterVal>remain){
                alert( `You can add minimum quota upto ${remain}`);
                e.target.value = 0
            }
            
        }

        window.validateMax = function(e){
            const total = parseInt(e.target.closest("#country-table").getAttribute("data-max"));

            let min_inputs = Array.from(document.querySelectorAll("[name='max_quota']"));
            let enterVal = parseInt(e.target.value);

            min_inputs = min_inputs.filter(el => el != e.target);

            let input_sum = min_inputs.reduce((p, c) => {
                let val = parseInt(c.value);
                if (val) {

                    return p + val;
                }
                return p;
            }, 0)

            let remain = total - input_sum;;

            if (enterVal > remain) {
                alert(`You can add minimum quota upto ${remain}`);
                e.target.value = 0
            }
        }

        window.validateReserve = function(e){
            const total = parseInt(e.target.closest("#country-table").getAttribute("data-reserve"));

            let min_inputs = Array.from(document.querySelectorAll("[name='reserve_quota']"));
            let enterVal = parseInt(e.target.value);

            min_inputs = min_inputs.filter(el => el != e.target);

            let input_sum = min_inputs.reduce((p, c) => {
                let val = parseInt(c.value);
                if (val) {

                    return p + val;
                }
                return p;
            }, 0)

            let remain = total - input_sum;;

            if (enterVal > remain) {
                alert(`You can add minimum quota upto ${remain}`);
                e.target.value = 0
            }
        }

        window.onlyNumberKey = (evt) => {

            // Only ASCII character in that range allowed
            var ASCIICode = (evt.which) ? evt.which : evt.keyCode
            if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
                return false;
            return true;
        }

        window.save = function(){
            const table = document.querySelector('#country-table');
            const quota_id = table.getAttribute('data-id');
            
            const min_quota = Array.from(table.querySelectorAll("[name='min_quota']")); 
            const max_quota = Array.from(table.querySelectorAll("[name='max_quota']")); 
            const reserve_quota = Array.from(table.querySelectorAll("[name='reserve_quota']")); 

            let min_quota_valid = true, max_quota_valid = true, reserve_quota_valid = true;
            const data = [];

            min_quota.forEach( el => {
                if( !el.value ){
                    min_quota_valid = false
                }
            });
            max_quota.forEach( el => {
                if( !el.value ){
                    max_quota_valid = false
                }
            });
            reserve_quota.forEach( el => {
                if( !el.value ){
                    reserve_quota_valid = false
                }
            });

            if (!min_quota_valid){
                alert("Minimum quota all field required");
            }
            else if (!max_quota_valid){
                alert("Maximum quota all field required");
            }
            else if (!reserve_quota_valid){
                alert("Reserve quota all field required");
            }

            else{   
                const tr = table.querySelectorAll('tbody tr');

                tr.forEach( el => {
                    let min_quota = el.querySelector("[name='min_quota']").value;
                    let max_quota = el.querySelector("[name='max_quota']").value;
                    let reserve_quota = el.querySelector("[name='reserve_quota']").value;
                    let country = el.getAttribute('data-country');
                    let obj = {
                        quota_id,min_quota,max_quota,reserve_quota,country
                    }

                    data.push( obj );
                });

                Ajax.post('/reserve-quota', data).then( res => {
                    if( res.success ){
                        const toast = document.querySelector("#toast-quota");
                        toast.querySelector(".toast-body").innerHTML = `<p class='m-0 text-success'>${res.message}</p>`;

                        Object.assign(toast.style, { zIndex: 1050 });
                        (new bootstrap.Toast(toast, {
                            delay: 3000
                        })).show();

                        setTimeout(function(){
                            location.href = "/reserved-quota";
                        }, 3000);
                    }
                });
            }

        }

        let reservationTable;

        if (  reservationTable = document.querySelector("#reservations-table tbody") ){

            const trNodes = [];
            if (reservations.length>0){

                reservations.forEach((item, i) => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${Quota[item.sport].name}</td>
                    <td>${item.gender == "male" ? "Male" : "Female" }</td>
                    <td>${Quota[item.sport].categories[item.gender][item.category]}</td>
                    <td>${item.country}</td>
                    <td>${item.min_quota}</td>
                    <td>${item.max_quota}</td>
                    <td>${item.reserve_quota}</td>
                    `;
                    trNodes.push(tr);
                });
            }
            else{
                const tr = document.createElement("tr");
                tr.innerHTML = `<td colspan="8"><p class="m-0 text-center fw-bold fs-4">No Record Found.</p></td>`
                trNodes.push(tr);
            }
            reservationTable.append(...trNodes);
        }   
    }
}