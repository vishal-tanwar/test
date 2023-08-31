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
    get: function (url = "", data = {}){
        const response = fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response; // parses JSON response into native JavaScript objects
    },
    
    post: function(url = "", data = {}) {
        data._token = document.head.querySelector("[name='X-CSRF-Token']").content;
        // Default options are marked with *
        const response = fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.head.querySelector("[name='X-CSRF-Token']").content
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response; // parses JSON response into native JavaScript objects
    },
}




document.onreadystatechange = function(){
    if( document.readyState == "complete"){

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

            Ajax.post('/', {
                sport,gender,category,max_quota,min_quota,reserve_quota
            })


        });
    }
}