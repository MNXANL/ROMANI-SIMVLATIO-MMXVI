#pragma strict

import UnityEngine.Animation;

public var MaxTime : float = 0.75f;
public var LifeBar : float = 30.0f; //Number of Hits the player can withstand
public var anim : Animator;
private var t : float = 0.0f;
private var timesHit : float = 0.0f;
private var kill : boolean = true;

function Start () {

}

function Update () {
	if (timesHit < LifeBar) {
		if (Input.GetButtonDown("Fire1") && t < MaxTime) {
			if (Input.GetButtonDown("Fire2") && t < MaxTime) {
				t = 0;
				anim.SetTrigger("ComboAttack");
			}
			else {
				t = 0;
			}
		}
		t += Time.deltaTime;
	}
	else {
		if (kill) {
			anim.SetTrigger("DeathTrigger");
			kill = false;
		}
	}

	if (transform.position.y < -50) {
		SceneManager.LoadScene("GameOver");
	}
}

function OnCollisionEnter(col : Collision) {
	if (col.gameObject.tag == "Sword") {
		++timesHit;
		Debug.Log("YOU DIED - " +  timesHit);
	}
}