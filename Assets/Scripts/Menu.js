#pragma strict

import UnityEngine.SceneManagement;

function Start() {
	Cursor.visible = true;
}

function Update () {
	if (Input.GetButtonDown("RestartGame")) {
		ExitGame();
	}
	else if (Input.GetButtonDown("PauseGame")) {
		StartGame();
	}
}

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