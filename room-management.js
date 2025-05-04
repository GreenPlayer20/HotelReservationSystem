document.addEventListener("DOMContentLoaded", () => {
    console.log("room-management.js loaded.");

    const roomModal = document.getElementById("roomModal");
    const addRoomBtn = document.getElementById("addRoomBtn");
    const closeRoomModalBtn = document.getElementById("closeRoomModalBtn");
    const roomForm = document.getElementById("roomForm");
    const roomGrid = document.getElementById("roomGrid");

    // New elements for Delete Confirmation Modal
    const deleteConfirmModal = document.getElementById("deleteConfirmModal");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

    let editingIndex = null;
    let roomToDeleteIndex = null;
    let rooms = [];

    loadRooms();

    if (addRoomBtn) {
        addRoomBtn.addEventListener("click", () => {
            editingIndex = null;
            roomForm.reset();
            roomModal.style.display = "flex";
        });
    }

    if (closeRoomModalBtn) {
        closeRoomModalBtn.addEventListener("click", () => {
            closeModal(roomModal);
        });
    }

    window.addEventListener("click", (event) => {
        if (event.target === roomModal) {
            closeModal(roomModal);
        }

        if (event.target === deleteConfirmModal) {
            closeModal(deleteConfirmModal);
        }
    });

    if (roomForm) {
        roomForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = roomForm.roomName.value;
            const price = roomForm.roomPrice.value;
            const file = roomForm.roomImage.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function () {
                    const imageUrl = reader.result;
                    const room = {
                        name,
                        price,
                        imageUrl
                    };
                    if (editingIndex !== null) {
                        rooms[editingIndex] = room;
                    } else {
                        rooms.push(room);
                    }
                    saveRooms();
                    updateRoomGrid();
                    closeModal(roomModal);
                };
                reader.readAsDataURL(file);
            } else if (editingIndex !== null) {
                rooms[editingIndex].name = name;
                rooms[editingIndex].price = price;
                saveRooms();
                updateRoomGrid();
                closeModal(roomModal);
            }
        });
    }

    function updateRoomGrid() {
        if (!roomGrid) return;
        roomGrid.innerHTML = "";
        rooms.forEach((room, index) => {
            const card = document.createElement("div");
            card.className = "room-card";
            card.innerHTML = `
                <h4>${room.name}</h4>
                <p>$${room.price}</p>
                <img src="${room.imageUrl || "placeholder.png"}" alt="${room.name}" />
                <button onclick="editRoom(${index})">Edit</button>
                <button onclick="deleteRoom(${index})" class="delete-room-btn" style="margin-left: 10px; color: red;">Delete</button>
            `;
            roomGrid.appendChild(card);
        });
    }

    window.editRoom = function (index) {
        console.log("Editing room at index:", index);
        const room = rooms[index];
        roomForm.roomName.value = room.name;
        roomForm.roomPrice.value = room.price;

        editingIndex = index;
        roomModal.style.display = "flex";
    };

    window.deleteRoom = function (index) {
        console.log("Initiating delete for room at index:", index);
        roomToDeleteIndex = index;
        deleteConfirmModal.style.display = "flex";
    };

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener("click", () => {
            console.log("Delete confirmed for index:", roomToDeleteIndex);
            if (roomToDeleteIndex !== null) {
                rooms.splice(roomToDeleteIndex, 1);
                saveRooms();
                updateRoomGrid();
                roomToDeleteIndex = null;
                closeModal(deleteConfirmModal);
            }
        });
    }

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener("click", () => {
            console.log("Delete cancelled.");
            roomToDeleteIndex = null;
            closeModal(deleteConfirmModal);
        });
    }

    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = "none";
        }
    }

    function saveRooms() {
        localStorage.setItem("hotelRooms", JSON.stringify(rooms));
    }

    function loadRooms() {
        const storedRooms = localStorage.getItem("hotelRooms");
        if (storedRooms) {
            rooms = JSON.parse(storedRooms);
        }
    }

    updateRoomGrid();
});