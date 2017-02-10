(function () {
    var nameButton = document.querySelector(".name-button");
    var nameInput = document.getElementById("name-input");
    var nameList = document.querySelector(".name-list");
    var sendButton = document.querySelector(".send-btn");
    var modal;
    var overlay;

    //Event listeners

    nameButton.addEventListener("click", function add() {
        if (nameInput.value) {
            var text = document.createTextNode(nameInput.value);
            var li = document.createElement("li");
            var removeBtn = document.createElement("button");
            removeBtn.className = "remove-btn";
            removeBtn.textContent = "Remove name";
            li.appendChild(text);
            li.appendChild(removeBtn);
            nameList.appendChild(li);
            nameInput.value = "";
            nameInput.focus();
        }
    }, false);

    nameList.addEventListener("click", function remove(event) {
        if (event.target.className === "remove-btn") {
            nameList.removeChild(event.target.parentNode);
            nameInput.focus();
        }
    }, false);


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
            "<label for='email-input'>Recepient's e-mail address</label>" +
            "<input type='email' id='email-input' class='email-input' placeholder='e-mail address' size='35' required>" +
            "<label for='email-message'>Text message max 100 characters</label>" +
            "<textarea id='email-message' class='email-message' placeholder='Write a short message' maxlength='100' rows='4'>" +
            "</textarea>" +
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

        var emailForm = document.getElementById("email-form");

        var now;
        var day;
        var month;
        var hour;
        var minutes;

        var emailAddress;
        var emailContent = nameList.innerText;
        var removeName = document.querySelector(".remove-btn").textContent;
        emailContent = emailContent.replace(new RegExp(removeName, 'g'), "\n");
        emailContent = emailContent.replace(/^/gm, "• ");

        var emailMessage;


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

        modal.addEventListener("transitionend", function () {
            modal.parentNode.removeChild(modal);
        }, false);
        overlay.addEventListener("transitionend", function () {
            overlay.parentNode.removeChild(overlay);
        }, false);
    }

    function addZero(num) {
        return (num < 10) ? ("0" + num) : num;
    }

})();

