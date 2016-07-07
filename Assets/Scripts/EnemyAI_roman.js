#pragma strict

private var player : GameObject;
public var anim : Animator;
public var Life : float = 500.0f;
public var SwordHit : float = 20.0f;

private var t : float = 0.0f;
private var dist : float = 0.0f;
private var seeingPlayer : boolean = false;
private var isAlive : boolean = true;
private var kill : boolean = true;

function Start () {
	player = GameObject.Find("PlayerNinja");
}

function Update () {

	t += Time.deltaTime;
	if (isAlive) {
		transform.LookAt(player.transform);
		var hitInfo : RaycastHit;
		anim.SetTrigger("Movement");
		if (Physics.Raycast(transform.position + Vector3(0,1,0), transform.forward, hitInfo))	{
			if(hitInfo.collider.gameObject.CompareTag("Player")) {
				seeingPlayer = true;
				dist = hitInfo.distance;
				//Debug.Log("DIST = " + dist);

				var direc : Vector3 = Vector3(0.0f, 0.2f, 1.0f);
				//Debug.DrawRay(transform.position + Vector3(0,1,0), direc, Color.green, 30.0f);
				//Gizmos.DrawRay(transform.position + Vector3(0,1,0), transform.forward);
				if (dist < 1) {
					anim.SetTrigger("Attack1Trigger");
				}
			}
			else seeingPlayer = false;
		}
	}
	else {
		if (kill) {
			anim.SetTrigger("DeathTrigger");
			kill = false;
		}
	}
}

function OnCollisionEnter(col : Collision) {
	Debug.Log("Life == " +  Life);
	//if (col.gameObject.tag == "HITSword") {
		Life -= SwordHit;
		if (Life <= 0) isAlive = false;
		Debug.Log("Life == " +  Life);
	//}
}