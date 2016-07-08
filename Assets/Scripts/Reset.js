#pragma strict

function Start () {

}

function Update () {
	if (Input.GetButtonDown("RestartGame")) {
		SceneManager.LoadScene("Game1");
	}
	else if (Input.GetButtonDown("PauseGame")) {
		SceneManager.LoadScene("MainMenu");
	}
}