//Evviromental Variables
const openEnvironmentalVariables = (packageName) => {
    window.electronAPI.envvariables()
        .then(response => {
            echo (response);
        })
        .catch(error => {
            echo (error);
        });
};

//Open CMD
async function openTerminal () {
    try {
        const response = await window.electronAPI.openterminal();
        echo(response); // Log the response from the main process
        // Perform any other actions after shutdown if needed
    } catch (error) {
        echo('Error opening terminal:', error.message);
        // Handle the error appropriately
    }
}

//Shutdown System
async function shutdownSystem() {
    try {
        const response = await window.electronAPI.shutdown();
        echo(response); // Log the response from the main process
        // Perform any other actions after shutdown if needed
    } catch (error) {
        echo('Error shutting down system:', error.message);
        // Handle the error appropriately
    }
}

//Restart System
async function restartSystem() {
    try {
        const response = await window.electronAPI.restart();
        echo(response); // Log the response from the main process
        // Perform any other actions after shutdown if needed
    } catch (error) {
        echo('Error restarting system:', error.message);
        // Handle the error appropriately
    }
}

//Sleep System
async function sleepSystem() {
    try {
        const response = await window.electronAPI.sleep();
        echo(response); // Log the response from the main process
        // Perform any other actions after shutdown if needed
    } catch (error) {
        echo('Error sleeping system:', error.message);
        // Handle the error appropriately
    }
}

//Signout System
async function signoutSystem() {
    try {
        const response = await window.electronAPI.signout();
        echo(response); // Log the response from the main process
        // Perform any other actions after shutdown if needed
    } catch (error) {
        echo('Error restarting system:', error.message);
        // Handle the error appropriately
    }
}