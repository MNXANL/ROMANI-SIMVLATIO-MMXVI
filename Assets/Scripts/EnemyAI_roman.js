#pragma strict

private var player : GameObject;
//public var anim : Animator;

private var t : float = 0.0f;

function Start () {
	player = GameObject.Find("PlayerNinja");
}

function Update () {
	t += Time.deltaTime;
	if (t > .5) {
		transform.LookAt(player.transform);
		t = 0;
	}
}

/*
function Update () {
	transform.LookAt(player.transform);
	var hitInfo : RaycastHit;
	if (Physics.Raycast(transform.position, transform.forward, hitInfo))	{
		if(hitInfo.collider.gameObject.CompareTag("Player")) {
			seeingPlayer = true;
			dist = hitInfo.distance;
			Debug.Log("DIST = " + rateOfFire/dist);
		}
		else seeingPlayer = false;
	}

	//Si ve al jugador, el ca��n se pone en verde. En caso contrario, se pone en azul.

	var mrs:MeshRenderer[] = GetComponentsInChildren.<MeshRenderer>();
	for (var i:int = 0; i < mrs.length; ++i) {
		 if(seeingPlayer) mrs[i].material.color = Color.green;
		 else mrs[i].material.color = Color.blue;
	}


	//Dispara una mina, de la misma forma que en el FPS del dia 1.
	
	time += Time.deltaTime;
	if(time > (rateOfFire - rateOfFire/dist) && seeingPlayer)	{
		
		time = 0.0f;
		var instantiatedBullet : GameObject = GameObject.Instantiate(bulletPrefab, transform.position, transform.rotation);
		for (i = 0; i < mrs.length; ++i)  mrs[i].material.color = Color.green;
		var rb : Rigidbody = instantiatedBullet.GetComponent.<Rigidbody>();
		rb.velocity = transform.forward * bulletSpeed;
	}
}

*/