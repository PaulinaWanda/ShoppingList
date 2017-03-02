(function () {
    var nameButton = document.querySelector(".name-button"),
    nameInput = document.getElementById("name-input"),
    nameList = document.querySelector(".name-list"),
    dropTarget = null,
    sendButton = document.querySelector(".send-btn"),
    modal,
    overlay;

    //Event listeners

    nameButton.addEventListener("click", function () {
        if (nameInput.value) {
            var text = document.createTextNode(nameInput.value),
            li = document.createElement("li"),
            removeBtn = document.createElement("button");

            removeBtn.classList.add("remove-btn");
            removeBtn.textContent = "Remove name";
            li.appendChild(text);
            li.appendChild(removeBtn);
            li.setAttribute("draggable", "true");
            nameList.appendChild(li);
            nameInput.value = "";
            nameInput.focus();
        }
    }, false);

    nameList.addEventListener("click", function (event) {
        if (event.target.className === "remove-btn") {
            nameList.removeChild(event.target.parentNode);
            nameInput.focus();
        }
    }, false);

    /* Drag & Drop start*/
    nameList. addEventListener("dragstart", function (event) {
        if (event.target.tagName === "LI") {
            dropTarget = event.target;

            dropTarget.classList.add("dragged");

            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("txt/html", dropTarget.innerHTML);
        }
    }, false);

    nameList.addEventListener("dragenter", function (event) {
        if (event.target.tagName === "LI") {
            event.target.classList.add("over");
        }
    }, false);

    nameList.addEventListener("dragover", function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
    }, false);

    nameList.addEventListener("dragleave", function (event) {
        if (event.target.tagName === "LI") {
            event.target.classList.remove("over");
        }
    }, false);

    nameList.addEventListener("dragend", function () {
        document.querySelectorAll(".name-list li").forEach(function (li) {
            li.classList.remove("over", "dragged");
        });

    }, false);

    nameList. addEventListener("drop", function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        if (dropTarget !== event.target) {

            dropTarget.innerHTML = event.target.innerHTML;
            event.target.innerHTML = event.dataTransfer.getData("txt/html");

        }
        return false;
    }, false);
    /* Drag & Drop stop*/


    nameInput.addEventListener("keydown", function checkEnterKey(pressedKey) {
        if (pressedKey.key === "Enter") {
            nameButton.focus();
        }
    }, false);

    sendButton.addEventListener("click", function openModal() {
        overlay = document.createElement("div");
        document.body.appendChild(overlay);
        overlay.classList.add("modal-overlay");

        modal = document.createElement("div");
        document.body.appendChild(modal);
        modal.classList.add("pop-up-modal");
        modal.innerHTML = "<form id='email-form' class='email-form'>" +
            "<label for='email-input'>Receipient's e-mail address</label>" +
            "<input type='email' id='email-input' class='email-input' placeholder='buy@me.food' size='35' required>" +
            "<label for='email-message'>Your message up to 100 characters</label>" +
            "<textarea id='email-message' class='email-message' placeholder='S.O.S Help! I am starving!' " +
            "maxlength='100' rows='4' cols='30'></textarea>" +
            "<button type='submit' class='submit-button'>Send message</button>" +
            "</form>" +
            "<button type='button' class='close'>X</button>";

        document.getElementById("email-input").focus();

        //Close modal
        document.querySelector(".close").addEventListener("click", closeModal, false);
        overlay.addEventListener("click", closeModal, false);
        document.addEventListener("keydown", function checkEscKey(pressedKey){
            if(pressedKey.keyCode === 27) {
                closeModal();
            }
        }, false);

        var emailForm = document.getElementById("email-form"),
        now,
        day,
        month,
        hour,
        minutes,
        emailAddress,
        emailContent = nameList.innerText,
        removeName = document.querySelector(".remove-btn").textContent,
        emailMessage;

        emailContent = emailContent.replace(new RegExp(removeName, 'g'), "\n");
        emailContent = emailContent.replace(/^/gm, "• ");

        emailForm.addEventListener("submit", function submitList(evt) {
            evt.preventDefault();

            now = new Date();
            day = now.getDate();
            day = addZero(day);
            month = now.getMonth() + 1;
            month = addZero(month);
            hour = now.getHours();
            hour = addZero(hour);
            minutes = now.getMinutes();
            minutes = addZero(minutes);

            emailAddress = document.querySelector(".email-input").value;

            emailMessage = document.getElementById("email-message").value;
            emailContent = emailMessage ? (emailMessage + "\n" + emailContent) : emailContent;

            window.location.href = "mailto:" + emailAddress + "?subject=Shopping list of " + day + "." +
                month + " " + hour + ":" + minutes + "&body=" + encodeURIComponent(emailContent);
            closeModal();

        }, false);

        overlay.classList.add("modal-open");
        modal.classList.add("modal-open");
    }, false);

    //Functions

    function closeModal() {
        overlay.classList.remove("modal-open");
        modal.classList.remove("modal-open");

        modal.addEventListener("transitionend", function handler() {
            this.removeEventListener("transitionend", handler, false);
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, false);
        overlay.addEventListener("transitionend", function handler() {
            this.removeEventListener("transitionend", handler, false);
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, false);
    }
    function addZero(num) {
        return (num < 10) ? ("0" + num) : num;
    }

})();

