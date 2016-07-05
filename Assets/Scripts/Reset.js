#pragma strict

function Start () {

}

function Update () {
	if (Input.GetKeyDown(KeyCode.R)) {
		SceneManager.LoadScene("Game1");
	}
	else if (Input.GetKeyDown(KeyCode.Escape)) {
		SceneManager.LoadScene("Menu");
	}
}