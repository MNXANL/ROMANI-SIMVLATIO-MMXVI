#pragma strict

private var player : GameObject;

private var t : float = 0.0f;

function Start () {
	player = GameObject.Find("PlayerNinja");
}

function Update () {
	t += Time.deltaTime;
	if (t > 1) transform.LookAt(player.transform);
}