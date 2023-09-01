"use strict";

const Quota = {
    archery: {
        "name" : "Archery",
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
        "name" : "Badminton",
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
        "name" : "Football",
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
    get: function (url = "", data = {}){
        const response = fetch(url, {
            method: "GET", 
            mode: "cors", 
            cache: "no-cache", 
            headers: this.headers,
            redirect: "follow", 
            referrerPolicy: "no-referrer", 
            body: JSON.stringify(data), 
        });
        return response.then(res => res.json()); 
    },
     post: function(url = "", data = {}) {
        const response =  fetch(url, {
            method: "POST",
            mode: "cors", 
            cache: "default",
            headers: this.headers,
            redirect: "follow", 
            referrerPolicy: "no-referrer", 
            body: JSON.stringify(data), 
        });
        return response.then( res => res.json() ); 
    },
}




document.onreadystatechange = function(){
    if( document.readyState == "complete"){

        // BS Toast
        // var toastElList = [].slice.call(document.querySelectorAll('.toast'))
        // var toastList = toastElList.map(function (toastEl) {
        //     return new bootstrap.Toast(toastEl)
        // })

        // toastList.forEach( el => { el.show() });

        // Create Sports Dropdown
        const sports = document.querySelector("#sports");

        let sportsList = Object.keys(Quota).map(s => {
            const option = document.createElement("option");

            option.value = s;
            option.text = Quota[s].name
            return option;
        });
        // Append List
        sports.append(...sportsList);

        // Create Catgories on change sport and gender

        window.updateCategories = function(){
            const sports = document.querySelector("#sports").value;
            const gender = document.querySelector("#sports-gender").value;
            const catElem = document.querySelector("#sports-categories");


            if( sports && gender ){

                let categories = Quota[sports].categories[gender];

                let categoryList = Object.keys(categories).map(c => {
                    const option = document.createElement("option");

                    option.value = c;
                    option.text = categories[c]
                    return option;
                });

                if (catElem.childElementCount > 1 ){

                    let prevNodes = Array.from(catElem.children).slice(1);

                    prevNodes.forEach( (el) => {
                        el.remove();
                    })
                }

                catElem.append(...categoryList);
            }

            else{
                if (catElem.childElementCount > 1) {

                    let prevNodes = Array.from(catElem.children).slice(1);

                    prevNodes.forEach((el) => {
                        el.remove();
                    })
                }
            }
        }

        window.addQuota = function(){

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

            else{
                Object.assign(addQuotaErr.style, {
                    display: "none"
                });

                const quotaModal = new bootstrap.Modal(document.querySelector('#reserve-quota-modal'));
                quotaModal.show();
            }
        }


        document.querySelector("#add-reserved-quota").addEventListener('click', function(){
            const sport = document.querySelector("#sports").value;
            const gender = document.querySelector("#sports-gender").value;
            const category = document.querySelector("#sports-categories").value;
            const min_quota = document.querySelector('[name="min_quota"]').value;
            const max_quota = document.querySelector('[name="max_quota"]').value;
            const reserve_quota = document.querySelector('[name="reserve_quota"]').value;

            const toast = document.querySelector("#toast-quota");

            Ajax.post('/', {
                sport,gender,category,max_quota,min_quota,reserve_quota
            }).then(res => { 
                if( res.success === true ){
                    toast.querySelector(".toast-body").innerHTML = `<p class="m-0 text-success">res.message</p>`;
                    setTimeout( () => {
                        location.reload();
                    }, 3000 );
                }
                else{

                    let errorsHtml = Object.values(res.errors).map(item => {
                        return `<p class="m-0 text-danger">${item[0]}</p>`
                    }).join("");

                    toast.querySelector(".toast-body").innerHTML = errorsHtml;
                }
                Object.assign(toast.style, {zIndex: 1050});
                (new bootstrap.Toast(toast, {
                    delay: 3000
                })).show();
             });

        });
    }
}