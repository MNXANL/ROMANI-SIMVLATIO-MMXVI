#pragma strict

import UnityEngine.SceneManagement;

function StartGame() {
	SceneManager.LoadScene("Game1");
}

function GoToOptions() {
	SceneManager.LoadScene("Menu");
}


function ExitGame() {
	Application.Quit();
}