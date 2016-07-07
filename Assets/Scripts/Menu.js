#pragma strict

import UnityEngine.SceneManagement;

function StartGame() {
	SceneManager.LoadScene("Game1");
}

function GoToOptions() {
	SceneManager.LoadScene("Options");
}

function GoToMenu() {
	SceneManager.LoadScene("MainMenu");
}


function ExitGame() {
	Application.Quit();
}