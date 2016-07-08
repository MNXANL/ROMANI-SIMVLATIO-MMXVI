#pragma strict

private var time : float = 0.0f;

public var SpawnTime : float = 5.0f;
public var remainingEnemies : float = 50.0f;
public var SpawnsPerSecond : float = 3.0f;
public var roman : GameObject;


function Start () {
	roman = GameObject.FindWithTag("Enemy");	
}

function Update () {
	time += Time.deltaTime;
	if (time > SpawnTime && remainingEnemies != 0) {
		for (var i: int = 1; i != SpawnsPerSecond; ++i) { //Spaw
			var x : float = Random.Range(-5, 5);
			var y : float = Random.Range(15, 45);
			var z : float = Random.Range(-5, 5);
			Instantiate(roman, Vector3(x, y, z), Quaternion.identity);
		}
		--remainingEnemies;
		time = 0;
	}
}