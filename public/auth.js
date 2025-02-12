document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".auth");

    buttons.forEach(button => {
        button.addEventListener("click", async (event) => {
            event.preventDefault();

            const userApiKey = prompt("Please enter the API key to continue: ");

            if (!userApiKey) {
                alert("API key is required!");
                return;
            };

            sessionStorage.setItem("enteredApiKey", userApiKey);
            const storedApiKey = sessionStorage.getItem("enteredApiKey");

            let actionHref = button.getAttribute("href");
            let postId = actionHref.split("/").pop(); 

            if (button.classList.contains("edit")) {
                actionHref = `/edit/${postId}`;
            } else if (button.classList.contains("delete")) {
                actionHref = `/api/posts/delete/${postId}`;
            }

            if (button.classList.contains("edit")) {
                try {
                    console.log("Sending API key:", storedApiKey);

                    const editResponse = await fetch(actionHref, {
                        method: "GET", 
                        headers: {
                            "x-api-key": storedApiKey,
                        },
                    });

                    if (editResponse.ok) {
                        const html = await editResponse.text();
                        document.documentElement.innerHTML = html;
                    } else {
                        alert("Failed to edit the post.");
                    }
                } catch (error) {
                    console.error("Error editing the post:", error);
                    alert("An error occurred.");
                }
            } else if (button.classList.contains("delete")) {
                try {
                    console.log("Sending API key:", storedApiKey);

                    const deleteResponse = await fetch(actionHref, {
                        method: "DELETE",  
                        headers: {
                            "x-api-key": storedApiKey, 
                        },
                    });

                    if (deleteResponse.ok) {
                        alert("Post deleted!");
                        location.reload();  
                    } else {
                        alert("Failed to delete the post.");
                    }
                } catch (error) {
                    console.error("Error deleting the post:", error);
                    alert("An error occurred while deleting the post.");
                }
            }
        });
    });
});