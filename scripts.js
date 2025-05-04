console.log("scripts.js - Version 1.1 - Corrected closeModal call in confirmApproval");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed.");

    const dashbuttonAdmin = document.getElementById("dashbtn");
    const roombuttonAdmin = document.getElementById("roombtn");
    const resbuttonAdmin = document.getElementById("resbtn");
    const repbuttonAdmin = document.getElementById("repbtn");
    const iconbuttonAdmin = document.getElementById("iconbtn");

    if (dashbuttonAdmin) dashbuttonAdmin.addEventListener("click", () => openPage("AdminDashboard.html"));
    if (roombuttonAdmin) roombuttonAdmin.addEventListener("click", () => openPage("AdminRooms.html"));
    if (resbuttonAdmin) resbuttonAdmin.addEventListener("click", () => openPage("AdminReservations.html"));
    if (repbuttonAdmin) repbuttonAdmin.addEventListener("click", () => openPage("AdminReports.html"));
    if (iconbuttonAdmin) iconbuttonAdmin.addEventListener("click", openIcon); // Assuming openIcon is a shared function or needs to be implemented

    const dashbuttonCustomer = document.getElementById("cusdashbtn");
    const roombuttonCustomer = document.getElementById("cusroombtn");
    const resbuttonCustomer = document.getElementById("cusresbtn");
    const iconbuttonCustomer = document.getElementById("cusiconbtn");

    if (dashbuttonCustomer) dashbuttonCustomer.addEventListener("click", () => openPage("CustomerDashboard.html"));
    if (roombuttonCustomer) roombuttonCustomer.addEventListener("click", () => openPage("CustomerRooms.html"));
    if (resbuttonCustomer) resbuttonCustomer.addEventListener("click", () => openPage("CustomerReservations.html"));
    if (iconbuttonCustomer) iconbuttonCustomer.addEventListener("click", openIcon); // Assuming openIcon is a shared function or needs to be implemented

    const dashbuttonFD = document.getElementById("fddashbtn");
    const roombuttonFD = document.getElementById("fdroombtn");
    const resbuttonFD = document.getElementById("fdresbtn");
    const iconbuttonFD = document.getElementById("fdiconbtn");

    if (dashbuttonFD) dashbuttonFD.addEventListener("click", () => openPage("FDDashboard.html"));
    if (roombuttonFD) roombuttonFD.addEventListener("click", () => openPage("FDRooms.html"));
    if (resbuttonFD) resbuttonFD.addEventListener("click", () => openPage("FDReservations.html"));
    if (iconbuttonFD) iconbuttonFD.addEventListener("click", openIcon); // Assuming openIcon is a shared function or needs to be implemented

    const loginButton = document.getElementById("loginbtn");
    if (loginButton) {
        loginButton.addEventListener("click", function () {
            const role = document.getElementById("userrole").value;
            if (role === "Admin") {
                openPage("AdminDashboard.html");
            } else if (role === "Customer") {
                openPage("CustomerDashboard.html");
            } else if (role === "Front-Desk") {
                openPage("FDDashboard.html");
            } else {
                alert("Please select a valid role.");
            }
        });
    }

    const landingButton = document.getElementById("btn1");
    if (landingButton) {
        landingButton.addEventListener("click", () => openPage("Login.html"));
    }

    let selectedCard = null;

    document
        .querySelectorAll("body.admin-reservations .process-btn, body.fd-reservations .process-btn")
        .forEach((button) => {
            button.addEventListener("click", (e) => {
                console.log("Process button clicked.");
                selectedCard = e.target.closest(".res-card");
                console.log("Selected card:", selectedCard);
                const processModal = document.getElementById("processModal");
                if (processModal) {
                    processModal.style.display = "flex";
                    console.log("Modal display set to flex.");
                } else {
                    console.log("Modal element #processModal not found.");
                }
            });
        });

    window.confirmApproval = function () {
        console.log("Confirming approval...");
        if (selectedCard) {
            console.log("Selected card found for approval:", selectedCard);
            selectedCard.style.backgroundColor = "#e6ffe6"; // Mark as approved
            selectedCard.querySelector(".process-btn").textContent = "Approved";
            selectedCard.querySelector(".process-btn").disabled = true;
            console.log("Selected card updated to Approved.");
        } else {
            console.log("No selected card found for approval.");
        }
        closeModal("processModal");
        console.log("closeModal called from confirmApproval.");
    };

    window.closeModal = function (modalId) {
        console.log("Attempting to close modal:", modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            console.log("Modal element found:", modal);
            modal.style.display = "none";
            console.log("Modal display set to none.");
        } else {
            console.log("Modal element with ID", modalId, "not found.");
        }

        if (modalId === "roomModal") {
            selectedRoomDetails = {};
        }
    };

    let selectedRoomDetails = {};
    window.showRoomDetails = function (name, id, price) {
        selectedRoomDetails = {
            name: name,
            id: id,
            price: price
        };
        document.getElementById("modalRoomName").textContent = name;
        document.getElementById("modalRoomID").textContent = id;
        document.getElementById("modalRoomPrice").textContent = price;

        document.getElementById("cardNumber").value = "";
        document.getElementById("cardName").value = "";
        document.getElementById("expiryDate").value = "";
        document.getElementById("cvv").value = "";
        openModal("roomModal");
    };

    window.openModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "flex";
        }
    };

    window.showMessageModal = function (title, message) {
        document.getElementById("messageModalTitle").textContent = title;
        document.getElementById("messageModalText").textContent = message;
        openModal("messageModal");
    };

    window.processReservation = function () {
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const cardName = document.getElementById("cardName").value.trim();
        const expiryDate = document.getElementById("expiryDate").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        if (!cardNumber || !cardName || !expiryDate || !cvv) {
            showMessageModal("Input Error", "Please fill in all payment details.");
            return;
        }

        const roomName = selectedRoomDetails.name;
        const roomId = selectedRoomDetails.id;
        const roomPrice = selectedRoomDetails.price;

        console.log("Attempting to process reservation for:", roomName, "(ID:", roomId, ") at $", roomPrice);
        console.log("Collected (DEMO ONLY) card info:", { cardNumber, cardName, expiryDate, cvv });

        setTimeout(() => {
            const paymentSuccessful = Math.random() > 0.2;

            if (paymentSuccessful) {
                showMessageModal(
                    "Reservation Successful",
                    "Payment successful! Your reservation for " + roomName + " (ID: " + roomId + ") is confirmed."
                );
            } else {
                showMessageModal("Reservation Failed", "Payment failed. Please check your card details or try again.");
            }
            closeModal("roomModal");
        }, 1000);
    };
});

function openPage(pageUrl) {
    window.open(pageUrl, "_self");
    return false;
}

function openIcon() {
    console.log("Profile icon clicked");

    const profileOptions = document.querySelector(".profile .options");
    if (profileOptions) {
        profileOptions.style.display = profileOptions.style.display === "block" ? "none" : "block";
    }
}