#pragma strict

private var player : GameObject;
public var anim : Animator;

private var t : float = 0.0f;
private var dist : float = 0.0f;
private var seeingPlayer : boolean = false;

function Start () {
	player = GameObject.Find("PlayerNinja");
}

function Update () {
	t += Time.deltaTime;



	if (t > .5) {
		transform.LookAt(player.transform);

		var hitInfo : RaycastHit;
		if (Physics.Raycast(transform.position, transform.forward, hitInfo))	{
			if(hitInfo.collider.gameObject.CompareTag("Player")) {
				seeingPlayer = true;
				dist = hitInfo.distance;
				Debug.Log("DIST = " + dist);
				anim.SetTrigger("Movement");
			}
			else seeingPlayer = false;
		}

		t = 0;
	}

}

/*
	



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